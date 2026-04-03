document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Theme Toggle Logic (Light/Dark mode) ----
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlEl = document.documentElement;

    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        htmlEl.setAttribute('data-bs-theme', 'dark');
        updateIcon('dark');
    } else {
        htmlEl.setAttribute('data-bs-theme', 'light');
        updateIcon('light');
    }

    // Check saved RTL direction
    const savedDir = localStorage.getItem('siteDir');
    if (savedDir) {
        htmlEl.setAttribute('dir', savedDir);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('siteTheme', newTheme);
            updateIcon(newTheme);
        });
    }

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('#rtlToggle');
    if (rtlToggles.length > 0) {
        rtlToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentDir = htmlEl.getAttribute('dir');
                const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                htmlEl.setAttribute('dir', newDir);
                localStorage.setItem('siteDir', newDir);
            });
        });
    }

    function updateIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    }

    // ---- 2. Back to Top Button ----
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- 3. Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});
