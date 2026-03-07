document.addEventListener('DOMContentLoaded', () => {
    console.log('Testo Pro Member Area Locked and Loaded');

    // Simple interaction for navigation items
    const navItems = document.querySelectorAll('.nav-item:not(.logout)');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 3D Tilt Effect for Book Cover
    const bookContainers = document.querySelectorAll('.product-banner');

    bookContainers.forEach(bookContainer => {
        const book = bookContainer.querySelector('.book-preview');

        if (bookContainer && book) {
            bookContainer.addEventListener('mousemove', (e) => {
                const rect = bookContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate tilt
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                book.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            bookContainer.addEventListener('mouseleave', () => {
                book.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }
    });

    // Animate elements on scroll/load
    const elements = document.querySelectorAll('.module-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });


    // Mobile Menu Logic
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMenu);
    }

    // Close when clicking overlay
    overlay.addEventListener('click', toggleMenu);

    // Close when clicking a nav item on mobile
    const mobileNavItems = document.querySelectorAll('.nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
