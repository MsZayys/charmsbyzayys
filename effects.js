/* =====================================================
   Charms by Zayys — visual effects (decorative only)
   - Floating sparkles & hearts in the background
   - Tiny rising hearts inside [data-hearts] sections
   - Fade/slide-up reveal on scroll
   - Newsletter form confirmation message
   Plain script (not a module). It never touches cart, auth,
   wishlist or any other site logic. If it fails to load,
   the site still works and looks good (CSS-only fallback).
   ===================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    /* ---------- Floating sparkles & hearts (whole page) ---------- */
    function buildMagicLayer() {
        if (reduceMotion || document.getElementById('magic-layer')) return;

        var layer = document.createElement('div');
        layer.id = 'magic-layer';
        layer.setAttribute('aria-hidden', 'true');

        var symbols = ['✨', '💖', '🌸', '💜', '✨', '🤍'];
        var count = window.innerWidth < 768 ? 8 : 14;

        for (var i = 0; i < count; i++) {
            var p = document.createElement('span');
            p.className = 'magic-particle';
            p.textContent = symbols[i % symbols.length];
            p.style.left = rand(2, 96) + '%';
            p.style.fontSize = rand(12, 24) + 'px';
            p.style.animationDuration = rand(16, 30) + 's';
            p.style.animationDelay = (-rand(0, 30)) + 's';
            p.style.setProperty('--dx', rand(-40, 40) + 'px');
            layer.appendChild(p);
        }

        document.body.insertBefore(layer, document.body.firstChild);
    }

    /* ---------- Tiny hearts inside chosen sections ---------- */
    function buildSectionHearts() {
        if (reduceMotion) return;

        var hosts = document.querySelectorAll('[data-hearts]');
        Array.prototype.forEach.call(hosts, function (host) {
            for (var i = 0; i < 7; i++) {
                var h = document.createElement('span');
                h.className = 'mini-heart';
                h.setAttribute('aria-hidden', 'true');
                h.textContent = i % 3 === 0 ? '💗' : (i % 3 === 1 ? '💜' : '🤍');
                h.style.left = rand(4, 94) + '%';
                h.style.fontSize = rand(11, 20) + 'px';
                h.style.animationDuration = rand(6, 11) + 's';
                h.style.animationDelay = (-rand(0, 10)) + 's';
                host.appendChild(h);
            }
        });
    }

    /* ---------- Scroll reveal (fade + soft slide up) ---------- */
    function setupReveal() {
        if (reduceMotion || !('IntersectionObserver' in window)) return;

        var selector = '[data-reveal], .section-title, .product-card, .collection-card, .promo-card';

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.classList.add('in');
                observer.unobserve(el);

                // Clear the stagger delay afterwards so hover stays snappy
                setTimeout(function () {
                    el.style.transitionDelay = '';
                }, 1400);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        function register(el) {
            if (el.__revealReady) return;
            el.__revealReady = true;

            var siblings = el.parentNode ? el.parentNode.children : [];
            var index = Array.prototype.indexOf.call(siblings, el);
            el.style.transitionDelay = (Math.max(index, 0) % 4) * 90 + 'ms';

            el.classList.add('reveal');
            observer.observe(el);
        }

        function scan(root) {
            if (root.nodeType !== 1) return;
            if (root.matches && root.matches(selector)) register(root);
            var found = root.querySelectorAll ? root.querySelectorAll(selector) : [];
            Array.prototype.forEach.call(found, register);
        }

        scan(document.body);

        // Product cards are rendered by script.js after load — catch them too
        new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                Array.prototype.forEach.call(m.addedNodes, scan);
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    /* ---------- Newsletter form (front-end confirmation only) ---------- */
    function setupNewsletter() {
        var form = document.getElementById('newsletter-form');
        if (!form) return;

        var input = document.getElementById('newsletter-email');
        var note = document.getElementById('newsletter-note');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var value = (input.value || '').trim();
            var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (!valid) {
                note.textContent = 'Please enter a valid email address.';
                input.focus();
                return;
            }

            note.textContent = 'Thank you! You are on the list 💜';
            form.reset();
        });
    }

    ready(function () {
        buildMagicLayer();
        buildSectionHearts();
        setupReveal();
        setupNewsletter();
    });
})();