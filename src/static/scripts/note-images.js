(function () {
  const noteImages = Array.from(document.querySelectorAll(".note__content img"));

  if (!noteImages.length) {
    return;
  }

  let activeTrigger = null;
  const viewer = document.createElement("div");
  viewer.className = "note-image-viewer";
  viewer.hidden = true;
  viewer.innerHTML = `
    <button class="note-image-viewer__close" type="button" aria-label="Close image view">&times;</button>
    <img class="note-image-viewer__image" alt="">
  `;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");

  document.body.appendChild(viewer);

  const viewerImage = viewer.querySelector(".note-image-viewer__image");
  const closeButton = viewer.querySelector(".note-image-viewer__close");

  function openViewer(image) {
    activeTrigger = image;
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt || "";
    viewer.hidden = false;
    document.body.classList.add("note-image-viewer-open");
    closeButton.focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    viewerImage.removeAttribute("src");
    document.body.classList.remove("note-image-viewer-open");

    if (activeTrigger) {
      activeTrigger.focus();
      activeTrigger = null;
    }
  }

  noteImages.forEach((image) => {
    const imageLink = image.closest(".note__image-link");
    const trigger = imageLink || image;

    image.classList.add("note__content-image");

    if (imageLink) {
      imageLink.setAttribute("aria-label", image.alt ? `View larger image: ${image.alt}` : "View larger image");
    } else {
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openViewer(image);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openViewer(image);
      }
    });
  });

  closeButton.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !viewer.hidden) {
      closeViewer();
    }
  });
})();
