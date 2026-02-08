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
const popupVideo = popup?.querySelector('video');
const carouselItems = document.querySelectorAll('.carousel-item');

if (popup && carouselItems.length) {
    carouselItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            popup.style.display = 'block';
            popup.style.opacity = '1';
            document.body.classList.add('no-scroll');

            if (item.tagName === 'IMG') {
                popupVideo?.pause();
                popupVideo && (popupVideo.style.display = 'none');

                popupImg.src = item.dataset.full || item.src;
                popupImg.style.display = 'block';
            }

            if (item.tagName === 'VIDEO') {
    popupImg.style.display = 'none';

    const source = item.querySelector('source');
    popupVideo.src = source ? source.src : item.src;

    popupVideo.style.display = 'block';
    popupVideo.load();
    popupVideo.play();
}

        });
    });

    popup.addEventListener('click', () => {
        popup.style.opacity = '0';

        setTimeout(() => {
            popup.style.display = 'none';
            popupImg.src = '';
            popupVideo?.pause();
            document.body.classList.remove('no-scroll');
        }, 300);
    });
}



// ================= LOADER (MIN 2 SECONDS) =================
const MIN_LOADING_TIME = 100; // 2 seconds
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



