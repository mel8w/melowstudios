/* ================= MENU ================= */
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        menuOverlay.classList.toggle('active');

        if (menuOverlay.classList.contains('active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    });

    menuOverlay.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

/* ================= POPUP ================= */
const popup = document.querySelector('.popup-image');
if (popup) {
    const popupImg = popup.querySelector('img');
    const images = Array.from(document.querySelectorAll('.image img'));
    const counter = popup.querySelector('.popup-counter'); // facultatif
    const nextButtons = popup.querySelectorAll('.popup-arrow.right'); // si ajoutées
    const prevButtons = popup.querySelectorAll('.popup-arrow.left'); // si ajoutées

    let currentIndex = 0;

    if (images.length) {
        /* --- OUVERTURE POPUP --- */
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                showImage();
                popup.style.display = 'block';
                document.body.classList.add('no-scroll');
            });
        });

        /* --- AFFICHAGE IMAGE + COMPTEUR --- */
        function showImage() {
            popupImg.src = images[currentIndex].dataset.full;
            if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        /* --- FERMETURE POPUP --- */
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                popupImg.src = '';
                document.body.classList.remove('no-scroll');
            }
        });

        /* --- NAVIGATION --- */
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage();
        }

        /* --- FLÈCHES (desktop + mobile si ajoutées) --- */
        nextButtons.forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); nextImage(); }));
        prevButtons.forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); prevImage(); }));

        /* --- TAP GAUCHE / DROITE (mobile) --- */
        popupImg.addEventListener('click', (e) => {
            const rect = popupImg.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            clickX < rect.width / 2 ? prevImage() : nextImage();
        });

        /* --- CLAVIER --- */
        document.addEventListener('keydown', (e) => {
            if (popup.style.display !== 'block') return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') popup.click();
        });
    }
}
