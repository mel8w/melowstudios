/* ================= MENU ================= */
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll', menuOverlay.classList.contains('active'));
    });

    menuOverlay.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

/* ================= POPUP FOR CAROUSEL IMAGES ================= */
const popup = document.querySelector('.popup-image');
const popupImg = popup?.querySelector('img');
const carouselImages = document.querySelectorAll('.carousel-img');

if (popup && popupImg && carouselImages.length) {

    carouselImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            popupImg.src = img.dataset.full || img.src;
            popup.style.display = 'block';
            popup.style.opacity = '1';
            document.body.classList.add('no-scroll');
        });
    });

    // ✅ Close popup on ANY click inside popup (image OR background)
    popup.addEventListener('click', () => {
        popup.style.opacity = '0';

        setTimeout(() => {
            popup.style.display = 'none';
            popupImg.src = '';
            document.body.classList.remove('no-scroll');
        }, 300);
    });

    // Close with ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            popup.click();
        }
    });
}


// ================= LOADER (MIN 2 SECONDS) =================
const MIN_LOADING_TIME = 1500; // 2 seconds
const startTime = performance.now();

window.addEventListener("load", () => {
    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsed);

    setTimeout(() => {
        document.body.classList.remove("is-loading");

        const loader = document.querySelector(".loader-wrapper");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 500);
        }
    }, remainingTime);
});



