'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!isLegalPage()) return;

        initLegalReadingProgress();
        initLegalSidebarActiveState();
        initLegalCopyCodeNotes();
        initLegalBlockEnhancements();
        initLegalBackToTop();
        initLegalContactCards();
    });

    function isLegalPage() {
        return (
            document.body.classList.contains('page-legal') ||
            Boolean(document.querySelector('.legal-hero')) ||
            Boolean(document.querySelector('.legal-content'))
        );
    }

    function initLegalReadingProgress() {
        if (document.querySelector('.legal-reading-progress')) return;

        const progress = document.createElement('div');
        progress.className = 'legal-reading-progress';
        progress.setAttribute('aria-hidden', 'true');
        progress.innerHTML = '<span></span>';

        document.body.appendChild(progress);

        const bar = progress.querySelector('span');

        const update = function () {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY || window.pageYOffset;
            const percent = scrollableHeight > 0 ? Math.min((currentScroll / scrollableHeight) * 100, 100) : 0;

            bar.style.width = percent + '%';
        };

        update();

        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    }

    function initLegalSidebarActiveState() {
        const sidebar = document.querySelector('.legal-sidebar__nav');
        const links = sidebar ? Array.from(sidebar.querySelectorAll('a[href^="#"]')) : [];

        if (!sidebar || !links.length) return;

        const sections = links
            .map(function (link) {
                const id = link.getAttribute('href');
                return id ? document.querySelector(id) : null;
            })
            .filter(Boolean);

        if (!sections.length) return;

        if (!('IntersectionObserver' in window)) {
            links[0].classList.add('is-active');
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const id = '#' + entry.target.id;

                    links.forEach(function (link) {
                        const isActive = link.getAttribute('href') === id;
                        link.classList.toggle('is-active', isActive);

                        if (isActive) {
                            scrollSidebarLinkIntoView(sidebar, link);
                        }
                    });
                });
            },
            {
                rootMargin: '-36% 0px -54% 0px',
                threshold: 0.01
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    function scrollSidebarLinkIntoView(sidebar, link) {
        if (window.innerWidth > 1080) return;

        const sidebarRect = sidebar.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        if (linkRect.left < sidebarRect.left || linkRect.right > sidebarRect.right) {
            link.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }

    function initLegalCopyCodeNotes() {
        const codeNotes = document.querySelectorAll('.legal-code-note');

        codeNotes.forEach(function (note) {
            if (note.dataset.copyReady === 'true') return;

            const code = note.querySelector('code');

            if (!code) return;

            note.dataset.copyReady = 'true';

            const button = document.createElement('button');
            button.className = 'legal-copy-button';
            button.type = 'button';
            button.innerHTML = `
                <i class="fa-regular fa-copy" aria-hidden="true"></i>
                <span>Copy</span>
            `;

            note.appendChild(button);

            button.addEventListener('click', function () {
                copyText(code.textContent.trim(), button);
            });
        });
    }

    function copyText(text, button) {
        if (!text) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                function () {
                    showCopied(button);
                },
                function () {
                    fallbackCopy(text, button);
                }
            );

            return;
        }

        fallbackCopy(text, button);
    }

    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', 'readonly');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';

        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showCopied(button);
        } catch (error) {
            button.querySelector('span').textContent = 'Copy failed';
        }

        textarea.remove();
    }

    function showCopied(button) {
        const label = button.querySelector('span');

        if (!label) return;

        const originalText = label.textContent;

        button.classList.add('is-copied');
        label.textContent = 'Copied';

        window.setTimeout(function () {
            button.classList.remove('is-copied');
            label.textContent = originalText;
        }, 1600);
    }

    function initLegalBlockEnhancements() {
        const blocks = document.querySelectorAll('.legal-block');

        blocks.forEach(function (block, index) {
            if (block.dataset.legalBlockReady === 'true') return;

            block.dataset.legalBlockReady = 'true';
            block.style.setProperty('--legal-block-index', index);

            const heading = block.querySelector('h2');

            if (heading && !block.classList.contains('legal-block--notice')) {
                const marker = document.createElement('span');
                marker.className = 'legal-block__marker';
                marker.setAttribute('aria-hidden', 'true');
                marker.textContent = String(index + 1).padStart(2, '0');

                block.prepend(marker);
            }
        });
    }

    function initLegalBackToTop() {
        if (document.querySelector('.legal-back-top')) return;

        const button = document.createElement('button');
        button.className = 'legal-back-top';
        button.type = 'button';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = `
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
            <span>Top</span>
        `;

        document.body.appendChild(button);

        const updateVisibility = function () {
            button.classList.toggle('is-visible', window.scrollY > 700);
        };

        updateVisibility();

        window.addEventListener('scroll', updateVisibility, { passive: true });

        button.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function initLegalContactCards() {
        const cards = document.querySelectorAll('.legal-contact-card');

        cards.forEach(function (card) {
            if (card.dataset.contactReady === 'true') return;

            card.dataset.contactReady = 'true';

            const rows = card.querySelectorAll('p');

            rows.forEach(function (row) {
                row.setAttribute('tabindex', '0');

                row.addEventListener('focus', function () {
                    row.classList.add('is-active');
                });

                row.addEventListener('blur', function () {
                    row.classList.remove('is-active');
                });

                row.addEventListener('mouseenter', function () {
                    row.classList.add('is-active');
                });

                row.addEventListener('mouseleave', function () {
                    row.classList.remove('is-active');
                });
            });
        });
    }
})();