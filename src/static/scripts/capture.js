(function () {
    const modes = {
        normal: {
            maxWidth: 1200,
            minWidth: 800,
            quality: 0.78,
            minQuality: 0.58,
            maxBytes: 900 * 1024
        },
        large: {
            maxWidth: 2000,
            minWidth: 1400,
            quality: 0.85,
            minQuality: 0.7,
            maxBytes: 5 * 1024 * 1024
        }
    };
    const storageKeys = {
        endpoint: "captureEndpoint",
        token: "captureToken",
        assetBase: "captureAssetBase"
    };

    const state = {
        blob: null,
        extension: "",
        key: "",
        markdown: "",
        objectUrl: "",
        editingUploadSettings: false
    };

    const form = document.getElementById("capture-form");
    const noteTextInput = document.getElementById("note-text-input");
    const imageInput = document.getElementById("image-input");
    const altInput = document.getElementById("alt-input");
    const slugInput = document.getElementById("slug-input");
    const folderInput = document.getElementById("folder-input");
    const endpointInput = document.getElementById("endpoint-input");
    const tokenInput = document.getElementById("token-input");
    const assetBaseInput = document.getElementById("asset-base-input");
    const uploadSettingsFields = document.getElementById("upload-settings-fields");
    const uploadSettingsSummary = document.getElementById("upload-settings-summary");
    const editUploadSettingsButton = document.getElementById("edit-upload-settings-button");
    const forgetUploadSettingsButton = document.getElementById("forget-upload-settings-button");
    const compressButton = document.getElementById("compress-button");
    const uploadButton = document.getElementById("upload-button");
    const postNoteButton = document.getElementById("post-note-button");
    const copyButton = document.getElementById("copy-button");
    const previewPanel = document.getElementById("preview-panel");
    const previewImage = document.getElementById("preview-image");
    const originalSize = document.getElementById("original-size");
    const optimizedSize = document.getElementById("optimized-size");
    const imageDimensions = document.getElementById("image-dimensions");
    const objectKey = document.getElementById("object-key");
    const markdownOutput = document.getElementById("markdown-output");
    const noteOutput = document.getElementById("note-output");
    const statusMessage = document.getElementById("status-message");

    loadSavedUploadSettings();
    renderUploadSettings();

    compressButton.addEventListener("click", prepareImage);
    uploadButton.addEventListener("click", uploadImage);
    postNoteButton.addEventListener("click", postNote);
    copyButton.addEventListener("click", copyMarkdown);
    form.addEventListener("input", updateCaptureOutput);
    editUploadSettingsButton.addEventListener("click", () => {
        state.editingUploadSettings = true;
        renderUploadSettings();
        endpointInput.focus();
    });
    forgetUploadSettingsButton.addEventListener("click", forgetUploadSettings);
    endpointInput.addEventListener("input", saveUploadSettings);
    tokenInput.addEventListener("input", saveUploadSettings);
    assetBaseInput.addEventListener("input", saveUploadSettings);
    imageInput.addEventListener("change", () => {
        if (!slugInput.value && imageInput.files[0]) {
            slugInput.value = slugify(imageInput.files[0].name.replace(/\.[^.]+$/, ""));
        }
        clearPreparedImage();
    });

    function loadSavedUploadSettings() {
        endpointInput.value = localStorage.getItem(storageKeys.endpoint) || sessionStorage.getItem(storageKeys.endpoint) || "";
        tokenInput.value = localStorage.getItem(storageKeys.token) || sessionStorage.getItem(storageKeys.token) || "";
        assetBaseInput.value = localStorage.getItem(storageKeys.assetBase) || assetBaseInput.value;

        if (endpointInput.value) {
            localStorage.setItem(storageKeys.endpoint, endpointInput.value);
            sessionStorage.removeItem(storageKeys.endpoint);
        }

        if (tokenInput.value) {
            localStorage.setItem(storageKeys.token, tokenInput.value);
            sessionStorage.removeItem(storageKeys.token);
        }
    }

    function saveUploadSettings() {
        saveOrRemove(storageKeys.endpoint, endpointInput.value.trim());
        saveOrRemove(storageKeys.token, tokenInput.value);
        saveOrRemove(storageKeys.assetBase, assetBaseInput.value.trim());
        renderUploadSettings();
    }

    function saveOrRemove(key, value) {
        if (value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    }

    function forgetUploadSettings() {
        Object.values(storageKeys).forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
        endpointInput.value = "";
        tokenInput.value = "";
        assetBaseInput.value = "https://assets.vries.land";
        state.editingUploadSettings = true;
        renderUploadSettings();
        updateGeneratedText();
        setStatus("Upload settings cleared for this browser.");
        endpointInput.focus();
    }

    function hasSavedUploadSettings() {
        return Boolean(endpointInput.value.trim() && tokenInput.value);
    }

    function renderUploadSettings() {
        const hasSavedSettings = hasSavedUploadSettings();
        const shouldHideFields = hasSavedSettings && !state.editingUploadSettings;

        uploadSettingsFields.hidden = shouldHideFields;
        uploadSettingsSummary.hidden = !shouldHideFields;
        editUploadSettingsButton.hidden = !hasSavedSettings || state.editingUploadSettings;
        forgetUploadSettingsButton.hidden = !hasSavedSettings;

        if (shouldHideFields) {
            uploadSettingsSummary.textContent = `Upload settings saved for this browser${getEndpointHost()}.`;
        }
    }

    function getEndpointHost() {
        try {
            return ` (${new URL(endpointInput.value).host})`;
        } catch (error) {
            return "";
        }
    }

    function updateCaptureOutput() {
        if (state.blob) {
            updateGeneratedText();
            return;
        }

        updateNoteDraft();
        copyButton.disabled = !noteTextInput.value.trim();
    }

    async function prepareImage() {
        const file = imageInput.files[0];

        if (!file) {
            setStatus("Choose an image first.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setStatus("That file does not look like an image.");
            return;
        }

        setStatus("Preparing image...");
        compressButton.disabled = true;

        try {
            const mode = getMode();
            const bitmap = await createImageBitmap(file);
            const output = await compressBitmap(bitmap, mode);

            const isWithinLimit = output.blob.size <= mode.maxBytes;

            if (!isWithinLimit) {
                setStatus(`Optimized image is ${formatBytes(output.blob.size)}, above the ${formatBytes(mode.maxBytes)} ${getModeName()} limit.`);
            } else {
                setStatus(`Image ready. ${formatBytes(file.size)} became ${formatBytes(output.blob.size)}.`);
            }

            state.blob = output.blob;
            state.extension = output.extension;
            updateGeneratedText();

            originalSize.textContent = formatBytes(file.size);
            optimizedSize.textContent = formatBytes(output.blob.size);
            imageDimensions.textContent = `${output.width} x ${output.height}`;

            if (state.objectUrl) {
                URL.revokeObjectURL(state.objectUrl);
            }
            state.objectUrl = URL.createObjectURL(output.blob);
            previewImage.src = state.objectUrl;
            previewImage.alt = altInput.value.trim();
            previewPanel.hidden = false;
            uploadButton.disabled = !isWithinLimit;
            copyButton.disabled = false;
        } catch (error) {
            setStatus(`Could not prepare image: ${error.message}`);
        } finally {
            compressButton.disabled = false;
        }
    }

    async function uploadImage() {
        if (!state.blob) {
            setStatus("Prepare an image before uploading.");
            return;
        }

        if (!endpointInput.value.trim()) {
            setStatus("Add the Worker endpoint before uploading.");
            return;
        }

        if (!tokenInput.value) {
            setStatus("Add the bearer token before uploading.");
            return;
        }

        uploadButton.disabled = true;
        setStatus("Uploading...");

        const body = new FormData();
        body.append("action", "image");
        body.append("image", state.blob, `${getBaseName()}.${state.extension}`);
        body.append("alt", altInput.value.trim());
        body.append("slug", slugInput.value.trim());
        body.append("folder", folderInput.value.trim());
        body.append("mode", getModeName());

        try {
            const response = await fetch(endpointInput.value.trim(), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenInput.value}`
                },
                body
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Upload failed.");
            }

            state.key = result.key;
            state.markdown = result.markdown;
            objectKey.textContent = result.key;
            markdownOutput.value = result.markdown;
            updateNoteDraft();
            setStatus("Uploaded. Markdown is ready to copy.");
        } catch (error) {
            setStatus(`Upload failed: ${error.message}`);
        } finally {
            uploadButton.disabled = false;
        }
    }

    async function postNote() {
        const noteText = noteTextInput.value.trim();
        const hasSelectedImage = Boolean(imageInput.files[0]);

        if (!noteText && !hasSelectedImage) {
            setStatus("Add note text or choose an image before posting.");
            noteTextInput.focus();
            return;
        }

        if (hasSelectedImage && !state.blob) {
            setStatus("Preparing image before posting...");
            await prepareImage();
        }

        if (hasSelectedImage && !state.blob) {
            return;
        }

        if (state.blob && state.blob.size > getMode().maxBytes) {
            setStatus(`Prepared image is still above the ${getModeName()} upload limit.`);
            return;
        }

        if (hasSelectedImage && !altInput.value.trim()) {
            setStatus("Add alt text before posting an image note.");
            altInput.focus();
            return;
        }

        if (!endpointInput.value.trim()) {
            setStatus("Add the Worker endpoint before posting.");
            return;
        }

        if (!tokenInput.value) {
            setStatus("Add the bearer token before posting.");
            return;
        }

        postNoteButton.disabled = true;
        uploadButton.disabled = true;
        setStatus("Posting note...");

        const body = new FormData();
        body.append("action", "note");
        body.append("noteText", noteText);
        body.append("alt", altInput.value.trim());
        body.append("slug", slugInput.value.trim());
        body.append("folder", folderInput.value.trim());
        body.append("mode", getModeName());

        if (state.blob) {
            body.append("image", state.blob, `${getBaseName()}.${state.extension}`);
        }

        try {
            const response = await fetch(endpointInput.value.trim(), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenInput.value}`
                },
                body
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Post failed.");
            }

            if (result.markdown) {
                noteOutput.value = result.markdown;
            }

            if (result.imageMarkdown) {
                markdownOutput.value = result.imageMarkdown;
            }

            if (result.imageKey) {
                objectKey.textContent = result.imageKey;
            }

            setStatus(`Posted ${result.path}. Netlify should rebuild from the GitHub commit.`);
        } catch (error) {
            setStatus(`Post failed: ${error.message}`);
        } finally {
            postNoteButton.disabled = false;
            uploadButton.disabled = !state.blob;
        }
    }

    async function copyMarkdown() {
        const text = noteOutput.value || markdownOutput.value;

        if (!text) {
            setStatus("Nothing to copy yet.");
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            setStatus("Copied Markdown.");
        } catch (error) {
            markdownOutput.select();
            setStatus("Clipboard access was blocked. The Markdown field is selected.");
        }
    }

    function updateGeneratedText() {
        if (!state.blob) {
            return;
        }

        const key = buildObjectKey();
        const url = `${assetBaseInput.value.replace(/\/+$/, "")}/${key}`;
        const alt = altInput.value.trim() || "Image";

        state.key = key;
        state.markdown = `![${escapeMarkdownAlt(alt)}](${url})`;
        objectKey.textContent = key;
        markdownOutput.value = state.markdown;
        previewImage.alt = alt;
        updateNoteDraft();
    }

    function updateNoteDraft() {
        const now = new Date();
        const fileStamp = getDateStamp(now);
        const noteText = noteTextInput.value.trim();
        const bodyParts = [];

        if (noteText) {
            bodyParts.push(noteText);
        }

        if (state.markdown) {
            bodyParts.push(state.markdown);
        }

        noteOutput.value = `---\ndate: ${now.toISOString()}\n---\n\n${bodyParts.join("\n\n")}\n`;
        noteOutput.dataset.filename = `src/notes/${fileStamp}.md`;
    }

    function clearPreparedImage() {
        state.blob = null;
        state.extension = "";
        state.key = "";
        state.markdown = "";
        uploadButton.disabled = true;
        copyButton.disabled = true;
        originalSize.textContent = imageInput.files[0] ? formatBytes(imageInput.files[0].size) : "-";
        optimizedSize.textContent = "-";
        imageDimensions.textContent = "-";
        objectKey.textContent = "-";
        markdownOutput.value = "";
        previewPanel.hidden = true;
        if (state.objectUrl) {
            URL.revokeObjectURL(state.objectUrl);
            state.objectUrl = "";
        }
        updateCaptureOutput();
    }

    function getMode() {
        return modes[getModeName()];
    }

    function getModeName() {
        const selectedMode = form.querySelector('input[name="image-mode"]:checked');
        return selectedMode ? selectedMode.value : "normal";
    }

    function getScaledDimensions(width, height, maxWidth) {
        if (width <= maxWidth) {
            return { width, height };
        }

        const ratio = maxWidth / width;
        return {
            width: maxWidth,
            height: Math.round(height * ratio)
        };
    }

    async function compressBitmap(bitmap, mode) {
        const originalDimensions = getScaledDimensions(bitmap.width, bitmap.height, mode.maxWidth);
        const minimumWidth = Math.min(mode.minWidth, originalDimensions.width);
        let width = originalDimensions.width;
        let height = originalDimensions.height;
        let fallback = null;

        while (width >= minimumWidth) {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            context.drawImage(bitmap, 0, 0, width, height);

            for (let quality = mode.quality; quality >= mode.minQuality; quality -= 0.06) {
                const output = await canvasToImageBlob(canvas, quality);
                const candidate = {
                    ...output,
                    width,
                    height
                };

                if (!fallback || candidate.blob.size < fallback.blob.size) {
                    fallback = candidate;
                }

                if (candidate.blob.size <= mode.maxBytes) {
                    return candidate;
                }
            }

            if (width === minimumWidth) {
                break;
            }

            width = Math.floor(width * 0.85);
            width = Math.max(width, minimumWidth);
            height = Math.round(width * bitmap.height / bitmap.width);
        }

        if (!fallback) {
            throw new Error("The browser could not encode this image.");
        }

        return fallback;
    }

    async function canvasToImageBlob(canvas, quality) {
        const webpBlob = await toBlob(canvas, "image/webp", quality);

        if (webpBlob && webpBlob.type === "image/webp") {
            return {
                blob: webpBlob,
                extension: "webp"
            };
        }

        return {
            blob: await toBlob(canvas, "image/jpeg", quality),
            extension: "jpg"
        };
    }

    function toBlob(canvas, type, quality) {
        return new Promise(resolve => canvas.toBlob(resolve, type, quality));
    }

    function buildObjectKey() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const folder = sanitizeFolder(folderInput.value) || "photos";

        return `${folder}/${year}/${month}/${getBaseName()}.${state.extension}`;
    }

    function getBaseName() {
        const slug = slugify(slugInput.value) || randomId();
        return slug;
    }

    function sanitizeFolder(value) {
        return value
            .split("/")
            .map(part => slugify(part))
            .filter(Boolean)
            .join("/");
    }

    function slugify(value) {
        return value
            .toLowerCase()
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 80);
    }

    function randomId() {
        const bytes = new Uint8Array(4);
        crypto.getRandomValues(bytes);
        return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
    }

    function getDateStamp(date) {
        return [
            date.getUTCFullYear(),
            String(date.getUTCMonth() + 1).padStart(2, "0"),
            String(date.getUTCDate()).padStart(2, "0"),
            String(date.getUTCHours()).padStart(2, "0"),
            String(date.getUTCMinutes()).padStart(2, "0"),
            String(date.getUTCSeconds()).padStart(2, "0")
        ].join("");
    }

    function formatBytes(bytes) {
        if (!Number.isFinite(bytes)) {
            return "-";
        }

        const units = ["B", "KB", "MB", "GB"];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex += 1;
        }

        return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    }

    function escapeMarkdownAlt(value) {
        return value.replace(/\]/g, "\\]");
    }

    function setStatus(message) {
        statusMessage.textContent = message;
    }
}());
