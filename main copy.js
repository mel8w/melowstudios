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

// Sélectionne toutes les vidéos du carousel
const carouselVideos = document.querySelectorAll('.carousel-video');

// Boucle sur chaque vidéo
carouselVideos.forEach((video, index) => {
    video.style.cursor = 'pointer'; // change le curseur pour montrer que c'est cliquable

    video.addEventListener('click', () => {
        // Redirection selon la vidéo (tu peux changer les URLs)
        switch(index) {
            case 0:
                window.location.href = 'khali.html';
                break;
            case 1:
                window.location.href = 'index.html';
                break;
            case 2:
                window.location.href = 'fallen.html';
                break;
            case 3:
                window.location.href = 'index.html';
                break;
            case 4:
                window.location.href = 'feve.html';
                break;
            case 5:
                window.location.href = 'sundance.html';
                break;
            case 6:
                window.location.href = 'index.html';
                break;
            case 7:
                window.location.href = 'index.html';
                break;
            // ajouter d'autres cas si tu as plus de vidéos
            default:
                window.location.href = 'index.html';
        }
    });
});



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



