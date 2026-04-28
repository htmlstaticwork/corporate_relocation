document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Theme Toggle Logic (Light/Dark mode) ----
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const htmlEl = document.documentElement;

    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        htmlEl.setAttribute('data-bs-theme', 'dark');
        updateAllIcons('dark');
    } else {
        htmlEl.setAttribute('data-bs-theme', 'light');
        updateAllIcons('light');
    }

    // Check saved RTL direction
    const savedDir = localStorage.getItem('siteDir');
    if (savedDir) {
        htmlEl.setAttribute('dir', savedDir);
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('siteTheme', newTheme);
            updateAllIcons(newTheme);
        });
    });

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = htmlEl.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlEl.setAttribute('dir', newDir);
            localStorage.setItem('siteDir', newDir);
        });
    });

    function updateAllIcons(theme) {
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        });
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

    // ---- 4. Dashboard Sidebar Toggle (Mobile) ----
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashboardSidebar = document.querySelector('.dash-sidebar');
    if (sidebarToggle && dashboardSidebar) {
        sidebarToggle.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('show');
        });
    }

    // ---- 5. Navbar Offcanvas Manual Trigger (Hamburger Fix) ----
    const navTogglers = document.querySelectorAll('.navbar-toggler');
    navTogglers.forEach(toggler => {
        toggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetId = this.getAttribute('data-bs-target');
            const targetEl = document.querySelector(targetId);
            if (targetEl && typeof bootstrap !== 'undefined') {
                const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(targetEl);
                const isTransitioning = targetEl.classList.contains('showing') || targetEl.classList.contains('hiding');
                if (isTransitioning) return;
                const isOpen = targetEl.classList.contains('show');
                if (isOpen) {
                    bsOffcanvas.hide();
                } else {
                    bsOffcanvas.show();
                }
            }
        });
    });

    const offcanvasEls = document.querySelectorAll('.offcanvas');
    const outsideClickHandlers = new WeakMap();

    function isOffcanvasTogglerClick(target, offcanvasEl) {
        if (!target || !offcanvasEl || !offcanvasEl.id) return false;
        const selector = `[data-bs-toggle="offcanvas"][data-bs-target="#${offcanvasEl.id}"]`;
        return Boolean(target.closest(selector) || (target.closest('.navbar-toggler') && target.closest('.navbar-toggler').getAttribute('data-bs-target') === `#${offcanvasEl.id}`));
    }

    function attachOutsideClose(offcanvasEl) {
        if (outsideClickHandlers.has(offcanvasEl)) return;
        const handler = (e) => {
            if (typeof bootstrap === 'undefined') return;
            if (!offcanvasEl.classList.contains('show')) return;
            const target = e.target;
            if (!target) return;
            if (offcanvasEl.contains(target)) return;
            if (isOffcanvasTogglerClick(target, offcanvasEl)) return;
            const instance = bootstrap.Offcanvas.getInstance(offcanvasEl) || bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            instance.hide();
        };
        document.addEventListener('pointerdown', handler, true);
        outsideClickHandlers.set(offcanvasEl, handler);
    }

    function detachOutsideClose(offcanvasEl) {
        const handler = outsideClickHandlers.get(offcanvasEl);
        if (!handler) return;
        document.removeEventListener('pointerdown', handler, true);
        outsideClickHandlers.delete(offcanvasEl);
    }

    offcanvasEls.forEach((el) => {
        el.addEventListener('shown.bs.offcanvas', () => attachOutsideClose(el));
        el.addEventListener('hidden.bs.offcanvas', () => detachOutsideClose(el));
    });

    // ---- 6. Password Visibility Toggle ----
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });
});
