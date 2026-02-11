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

/* ================= POPUP (IMAGES ONLY) ================= */
const popup = document.querySelector(".popup-image");

if (popup) {
  const popupImg = popup.querySelector("img");
  const counter = popup.querySelector(".popup-counter");
  const nextButtons = popup.querySelectorAll(".popup-arrow.right");
  const prevButtons = popup.querySelectorAll(".popup-arrow.left");

  // 🔥 IMAGES SEULEMENT
  const images = Array.from(document.querySelectorAll(".image img"));
  let currentIndex = 0;

  if (images.length) {
    /* --- OPEN POPUP --- */
    images.forEach((img, index) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        currentIndex = index;
        showImage();
        popup.style.display = "block";
        document.body.classList.add("no-scroll");
      });
    });

    /* --- DISPLAY IMAGE --- */
    function showImage() {
      const img = images[currentIndex];
      popupImg.src = img.dataset.full || img.src;

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
      }
    }

    /* --- CLOSE POPUP --- */
    popup.addEventListener("click", (e) => {
      if (e.target !== popup) return;

      popup.style.display = "none";
      popupImg.src = "";
      document.body.classList.remove("no-scroll");
    });

    /* --- NAVIGATION --- */
    const next = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    };

    const prev = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
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

    /* --- MOBILE TAP (IMAGE) --- */
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
const MIN_LOADING_TIME = 100;
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
