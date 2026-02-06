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

    let dragged = false; // flag to prevent popup on drag

    // If your carousel uses drag, you can toggle this flag in your carousel JS
    // Example: when starting drag: dragged = true; when ending drag: dragged = false;

    carouselImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (dragged) return; // prevent opening popup when dragging

            popupImg.src = img.dataset.full || img.src;
            popup.style.display = 'block';
            popup.style.opacity = '1';
            document.body.classList.add('no-scroll');
        });
    });

    // Close popup when clicking on the background (not on the image)
    popup.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent click from bubbling
        if (e.target !== popup) return;

        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
            popupImg.src = '';
            document.body.classList.remove('no-scroll');
        }, 300); // matches CSS transition
    });

    // Prevent clicks inside popup image from closing
    popupImg.addEventListener('click', (e) => e.stopPropagation());

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            popup.style.opacity = '0';
            setTimeout(() => {
                popup.style.display = 'none';
                popupImg.src = '';
                document.body.classList.remove('no-scroll');
            }, 300);
        }
    });
}


  window.addEventListener("load", () => {
    document.body.classList.remove("is-loading");

    const loader = document.querySelector(".loader-wrapper");
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  });


