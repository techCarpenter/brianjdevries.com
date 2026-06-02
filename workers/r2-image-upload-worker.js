const DEFAULT_ASSET_BASE_URL = "https://assets.vries.land";
const IMAGE_TYPES = new Map([
    ["image/webp", "webp"],
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/gif", "gif"]
]);
const MODE_LIMITS = {
    normal: 1024 * 1024,
    large: 5 * 1024 * 1024
};

export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return corsResponse(null, { status: 204 }, env, request);
        }

        if (request.method !== "POST") {
            return json({ error: "Method not allowed." }, 405, env, request);
        }

        if (!isAuthorized(request, env)) {
            return json({ error: "Unauthorized." }, 401, env, request);
        }

        const contentType = request.headers.get("content-type") || "";

        if (!contentType.includes("multipart/form-data")) {
            return json({ error: "Expected multipart/form-data." }, 415, env, request);
        }

        try {
            const formData = await request.formData();
            const action = String(formData.get("action") || "image");

            if (action === "note") {
                const note = await createNotePost(formData, env);
                return json(note, 201, env, request);
            }

            const imageUpload = await uploadImageFromForm(formData, env);
            return json(imageUpload, 201, env, request);
        } catch (error) {
            return json({ error: error.message || "Upload failed." }, 500, env, request);
        }
    }
};

function isAuthorized(request, env) {
    if (!env.UPLOAD_TOKEN) {
        return false;
    }

    const header = request.headers.get("authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";

    return token && timingSafeEqual(token, env.UPLOAD_TOKEN);
}

function timingSafeEqual(value, expected) {
    if (value.length !== expected.length) {
        return false;
    }

    let result = 0;

    for (let index = 0; index < value.length; index += 1) {
        result |= value.charCodeAt(index) ^ expected.charCodeAt(index);
    }

    return result === 0;
}

async function createNotePost(formData, env) {
    const noteText = String(formData.get("noteText") || "").trim();
    const image = formData.get("image");
    const hasImage = image instanceof File && image.size > 0;

    if (!noteText && !hasImage) {
        throw new Error("Note text or image is required.");
    }

    let imageUpload = null;

    if (hasImage) {
        imageUpload = await uploadImageFromForm(formData, env);
    }

    const date = new Date();
    const markdown = buildNoteMarkdown({
        date,
        noteText,
        imageMarkdown: imageUpload ? imageUpload.markdown : ""
    });
    const path = `src/notes/${getDateStamp(date)}.md`;

    let commit = null;

    try {
        commit = await commitFileToGitHub({
            env,
            path,
            content: markdown,
            message: `Post quick note ${getDateStamp(date)}`
        });
    } catch (error) {
        if (imageUpload) {
            await rollbackR2Upload(env, imageUpload.key);
        }

        throw error;
    }

    return {
        path,
        markdown,
        commitUrl: commit.html_url,
        imageKey: imageUpload ? imageUpload.key : "",
        imageUrl: imageUpload ? imageUpload.url : "",
        imageMarkdown: imageUpload ? imageUpload.markdown : ""
    };
}

async function uploadImageFromForm(formData, env) {
    if (!env.IMAGE_BUCKET) {
        throw new Error("IMAGE_BUCKET binding is not configured.");
    }

    const image = formData.get("image");

    if (!(image instanceof File)) {
        throw new Error("Missing image file.");
    }

    if (!IMAGE_TYPES.has(image.type)) {
        throw new Error("Unsupported image type.");
    }

    const mode = String(formData.get("mode") || "normal");
    const maxBytes = MODE_LIMITS[mode] || MODE_LIMITS.normal;

    if (image.size > maxBytes) {
        throw new Error(`Image is larger than the ${mode} upload limit.`);
    }

    const alt = String(formData.get("alt") || "").trim();

    if (!alt) {
        throw new Error("Alt text is required.");
    }

    const extension = IMAGE_TYPES.get(image.type);
    const key = buildObjectKey({
        folder: String(formData.get("folder") || "photos"),
        slug: String(formData.get("slug") || ""),
        extension
    });

    await env.IMAGE_BUCKET.put(key, image.stream(), {
        httpMetadata: {
            contentType: image.type,
            cacheControl: "public, max-age=31536000, immutable"
        },
        customMetadata: {
            alt
        }
    });

    const assetBaseUrl = (env.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL).replace(/\/+$/, "");
    const url = `${assetBaseUrl}/${key}`;

    return {
        key,
        url,
        markdown: `![${escapeMarkdownAlt(alt)}](${url})`
    };
}

async function rollbackR2Upload(env, key) {
    if (!env.IMAGE_BUCKET || !key) {
        return;
    }

    try {
        await env.IMAGE_BUCKET.delete(key);
    } catch (error) {
        console.error(`Failed to roll back R2 object ${key}: ${error.message}`);
    }
}

function buildNoteMarkdown({ date, noteText, imageMarkdown }) {
    const bodyParts = [];

    if (noteText) {
        bodyParts.push(noteText);
    }

    if (imageMarkdown) {
        bodyParts.push(imageMarkdown);
    }

    return `---\ndate: ${date.toISOString()}\n---\n\n${bodyParts.join("\n\n")}\n`;
}

async function commitFileToGitHub({ env, path, content, message }) {
    const owner = env.GITHUB_OWNER || "techcarpenter";
    const repo = env.GITHUB_REPO || "brianjdevries.com";
    const branch = env.GITHUB_BRANCH || "main";

    if (!env.GITHUB_TOKEN) {
        throw new Error("GITHUB_TOKEN is not configured.");
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
            "accept": "application/vnd.github+json",
            "authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "content-type": "application/json",
            "user-agent": "brianjdevries-capture-worker",
            "x-github-api-version": "2022-11-28"
        },
        body: JSON.stringify({
            message,
            content: base64FromUtf8(content),
            branch
        })
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "GitHub commit failed.");
    }

    return result.content;
}

function buildObjectKey({ folder, slug, extension }) {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const safeFolder = sanitizeFolder(folder) || "photos";
    const safeSlug = slugify(slug) || randomId();

    return `${safeFolder}/${year}/${month}/${safeSlug}.${extension}`;
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

function base64FromUtf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";

    for (let index = 0; index < bytes.length; index += 1) {
        binary += String.fromCharCode(bytes[index]);
    }

    return btoa(binary);
}

function escapeMarkdownAlt(value) {
    return value.replace(/\]/g, "\\]");
}

function json(payload, status, env, request) {
    return corsResponse(JSON.stringify(payload), {
        status,
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    }, env, request);
}

function corsResponse(body, init, env, request) {
    const headers = new Headers(init.headers || {});
    const origin = request.headers.get("origin") || "";
    const allowedOrigins = (env.ALLOWED_ORIGINS || "https://brianjdevries.com,http://localhost:8080")
        .split(",")
        .map(value => value.trim())
        .filter(Boolean);
    const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    headers.set("access-control-allow-origin", allowedOrigin);
    headers.set("access-control-allow-methods", "POST, OPTIONS");
    headers.set("access-control-allow-headers", "authorization, content-type");
    headers.set("vary", "Origin");

    return new Response(body, {
        ...init,
        headers
    });
}
