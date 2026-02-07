/* ================= MENU ================= */
const menuToggle = document.getElementById("menu-toggle");
const menuOverlay = document.getElementById("menu-overlay");

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    menuOverlay.classList.toggle("active");
    document.body.classList.toggle(
      "no-scroll",
      menuOverlay.classList.contains("active")
    );
  });

  menuOverlay.addEventListener("click", () => {
    menuOverlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
}

/* ================= POPUP (IMAGES + VIDEOS) ================= */
const popup = document.querySelector(".popup-image");

if (popup) {
  const popupImg = popup.querySelector("img");
  const counter = popup.querySelector(".popup-counter");
  const nextButtons = popup.querySelectorAll(".popup-arrow.right");
  const prevButtons = popup.querySelectorAll(".popup-arrow.left");

  const media = Array.from(
    document.querySelectorAll(".image img, .image video")
  );

  let currentIndex = 0;

  if (media.length) {
    /* --- OPEN POPUP --- */
    media.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentIndex = index;
        showMedia();
        popup.style.display = "block";
        document.body.classList.add("no-scroll");
      });
    });

    /* --- DISPLAY MEDIA --- */
    function showMedia() {
      popupImg.style.display = "none";

      const existingVideo = popup.querySelector("video");
      if (existingVideo) existingVideo.remove();

      const item = media[currentIndex];

      if (item.tagName === "IMG") {
        popupImg.src = item.dataset.full || item.src;
        popupImg.style.display = "block";
      } else {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        video.style.maxWidth = "90vw";
        video.style.maxHeight = "90vh";

        popup.appendChild(video);
      }

      if (counter)
        counter.textContent = `${currentIndex + 1} / ${media.length}`;
    }

    /* --- CLOSE POPUP --- */
    popup.addEventListener("click", (e) => {
      if (e.target !== popup) return;

      popup.style.display = "none";
      popupImg.src = "";
      const video = popup.querySelector("video");
      if (video) video.remove();

      document.body.classList.remove("no-scroll");
    });

    /* --- NAVIGATION --- */
    const next = () => {
      currentIndex = (currentIndex + 1) % media.length;
      showMedia();
    };

    const prev = () => {
      currentIndex = (currentIndex - 1 + media.length) % media.length;
      showMedia();
    };

    nextButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        next();
      })
    );

    prevButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        prev();
      })
    );

    /* --- MOBILE TAP (IMAGES ONLY) --- */
    popupImg.addEventListener("click", (e) => {
      const rect = popupImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      x < rect.width / 2 ? prev() : next();
    });

    /* --- KEYBOARD --- */
    document.addEventListener("keydown", (e) => {
      if (popup.style.display !== "block") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") popup.click();
    });
  }
}

/* ================= LOADER ================= */
const MIN_LOADING_TIME = 1500;
const startTime = performance.now();

window.addEventListener("load", () => {
  const elapsed = performance.now() - startTime;
  const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

  setTimeout(() => {
    document.body.classList.remove("is-loading");

    const loader = document.querySelector(".loader-wrapper");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 500);
    }
  }, remaining);
});
