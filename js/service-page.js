'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!isServicePage()) return;

        initServiceScrollProgress();
        initServiceContactLinks();
        initServiceCompareCards();
        initServiceTabsStatus();
        initServiceFitScale();
        initServiceHeroChips();
        initServiceOverviewGlow();
        initServiceFaqCount();
    });

    function isServicePage() {
        return (
            document.body.classList.contains('page-service') ||
            Boolean(document.querySelector('.service-hero'))
        );
    }

    function getServiceData() {
        const body = document.body;

        if (body.classList.contains('page-electrical-repair')) {
            return {
                slug: 'electrical-repair',
                label: 'Electrical Repair',
                shortLabel: 'Repair',
                accent: 'repair'
            };
        }

        if (body.classList.contains('page-panel-upgrades')) {
            return {
                slug: 'panel-upgrades',
                label: 'Panel Upgrade',
                shortLabel: 'Panel',
                accent: 'panel'
            };
        }

        if (body.classList.contains('page-wiring-rewiring')) {
            return {
                slug: 'wiring-rewiring',
                label: 'Wiring / Rewiring',
                shortLabel: 'Wiring',
                accent: 'wiring'
            };
        }

        if (body.classList.contains('page-ev-charger-installation')) {
            return {
                slug: 'ev-charger-installation',
                label: 'EV Charger Installation',
                shortLabel: 'EV Charger',
                accent: 'ev'
            };
        }

        return {
            slug: 'electrical-repair',
            label: 'Electrical Repair',
            shortLabel: 'Repair',
            accent: 'repair'
        };
    }

    function initServiceScrollProgress() {
        if (document.querySelector('.service-scroll-progress')) return;

        const progress = document.createElement('div');
        progress.className = 'service-scroll-progress';
        progress.setAttribute('aria-hidden', 'true');
        progress.innerHTML = '<span></span>';

        document.body.appendChild(progress);

        const bar = progress.querySelector('span');

        const updateProgress = function () {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY || window.pageYOffset;
            const percent = documentHeight > 0 ? Math.min((current / documentHeight) * 100, 100) : 0;

            bar.style.width = percent + '%';
        };

        updateProgress();

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    function initServiceContactLinks() {
        const service = getServiceData();
        const contactHref = './contact.html?project=' + encodeURIComponent(service.slug) + '#contact-form';

        const selectors = [
            '.service-hero__actions .btn--accent',
            '.service-final-cta .btn--accent'
        ];

        selectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (link) {
                if (!link || !link.matches('a')) return;

                link.setAttribute('href', contactHref);
                link.setAttribute(
                    'aria-label',
                    'Request provider options for ' + service.label
                );
            });
        });

        const heroCard = document.querySelector('.service-hero__card');

        if (heroCard && !heroCard.querySelector('.service-page-mini-note')) {
            const note = document.createElement('p');
            note.className = 'service-page-mini-note';
            note.innerHTML =
                '<i class="fa-solid fa-circle-info" aria-hidden="true"></i>' +
                '<span>Selected category: <strong>' +
                escapeHtml(service.label) +
                '</strong></span>';

            heroCard.appendChild(note);
        }
    }

    function initServiceCompareCards() {
        const grid = document.querySelector('.service-compare-grid__items');

        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('.service-compare-card'));

        cards.forEach(function (card, index) {
            if (card.dataset.compareReady === 'true') return;

            card.dataset.compareReady = 'true';
            card.setAttribute('tabindex', '0');
            card.style.setProperty('--compare-index', index);

            const title = card.querySelector('h3');
            const text = card.querySelector('p');

            if (title) {
                card.setAttribute(
                    'aria-label',
                    title.textContent.trim() + (text ? ': ' + text.textContent.trim() : '')
                );
            }

            card.addEventListener('mouseenter', function () {
                setActiveCompareCard(cards, card);
            });

            card.addEventListener('focus', function () {
                setActiveCompareCard(cards, card);
            });

            card.addEventListener('mouseleave', function () {
                clearCompareCards(cards);
            });

            card.addEventListener('blur', function () {
                clearCompareCards(cards);
            });

            card.addEventListener('keydown', function (event) {
                let targetIndex = index;

                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    targetIndex = Math.min(index + 1, cards.length - 1);
                }

                if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    targetIndex = Math.max(index - 1, 0);
                }

                if (event.key === 'Home') {
                    targetIndex = 0;
                }

                if (event.key === 'End') {
                    targetIndex = cards.length - 1;
                }

                if (targetIndex !== index) {
                    event.preventDefault();
                    cards[targetIndex].focus();
                }
            });
        });
    }

    function setActiveCompareCard(cards, activeCard) {
        cards.forEach(function (card) {
            card.classList.toggle('is-active', card === activeCard);
            card.classList.toggle('is-muted', card !== activeCard);
        });
    }

    function clearCompareCards(cards) {
        cards.forEach(function (card) {
            card.classList.remove('is-active', 'is-muted');
        });
    }

    function initServiceTabsStatus() {
        const tabBlocks = document.querySelectorAll('.service-tabs .object-tabs');

        tabBlocks.forEach(function (block) {
            if (block.dataset.serviceTabsEnhanced === 'true') return;

            const tabList = block.querySelector('[role="tablist"]');
            const tabs = Array.from(block.querySelectorAll('[role="tab"]'));

            if (!tabList || !tabs.length) return;

            block.dataset.serviceTabsEnhanced = 'true';

            const status = document.createElement('div');
            status.className = 'service-tabs-status';
            status.setAttribute('aria-live', 'polite');

            status.innerHTML = `
                <div class="service-tabs-status__copy">
                    <span>Comparison focus</span>
                    <strong></strong>
                </div>

                <div class="service-tabs-status__dots" aria-hidden="true"></div>
            `;

            const dots = status.querySelector('.service-tabs-status__dots');

            tabs.forEach(function (_, index) {
                const dot = document.createElement('span');
                dot.className = 'service-tabs-status__dot';
                dot.dataset.index = String(index);
                dots.appendChild(dot);
            });

            tabList.insertAdjacentElement('afterend', status);

            const update = function () {
                const activeTab =
                    tabs.find(function (tab) {
                        return tab.getAttribute('aria-selected') === 'true';
                    }) || tabs[0];

                const activeIndex = tabs.indexOf(activeTab);
                const activeText = activeTab.textContent.trim();

                const title = status.querySelector('strong');

                if (title) {
                    title.textContent = activeText;
                }

                status.querySelectorAll('.service-tabs-status__dot').forEach(function (dot, index) {
                    dot.classList.toggle('is-active', index === activeIndex);
                });
            };

            tabs.forEach(function (tab) {
                tab.addEventListener('click', function () {
                    window.requestAnimationFrame(update);
                });

                tab.addEventListener('keydown', function () {
                    window.requestAnimationFrame(update);
                });
            });

            update();
        });
    }

    function initServiceFitScale() {
        const scale = document.querySelector('.service-fit-scale');

        if (!scale || scale.dataset.fitReady === 'true') return;

        scale.dataset.fitReady = 'true';

        const cards = Array.from(scale.querySelectorAll('.service-fit-card'));

        cards.forEach(function (card, index) {
            card.setAttribute('tabindex', '0');
            card.style.setProperty('--fit-index', index);

            const title = card.querySelector('h3');
            const text = card.querySelector('p');

            if (title) {
                card.setAttribute(
                    'aria-label',
                    title.textContent.trim() + (text ? ': ' + text.textContent.trim() : '')
                );
            }

            card.addEventListener('mouseenter', function () {
                setActiveFitCard(cards, card);
            });

            card.addEventListener('focus', function () {
                setActiveFitCard(cards, card);
            });

            card.addEventListener('mouseleave', function () {
                clearFitCards(cards);
            });

            card.addEventListener('blur', function () {
                clearFitCards(cards);
            });
        });

        const summary = document.createElement('div');
        summary.className = 'service-fit-summary';
        summary.setAttribute('aria-live', 'polite');

        summary.innerHTML = `
            <i class="fa-solid fa-shield-bolt" aria-hidden="true"></i>
            <span>
                Complexity is only a comparison guide. A qualified local provider should review safety-sensitive electrical concerns.
            </span>
        `;

        scale.insertAdjacentElement('afterend', summary);
    }

    function setActiveFitCard(cards, activeCard) {
        cards.forEach(function (card) {
            card.classList.toggle('is-active', card === activeCard);
            card.classList.toggle('is-muted', card !== activeCard);
        });
    }

    function clearFitCards(cards) {
        cards.forEach(function (card) {
            card.classList.remove('is-active', 'is-muted');
        });
    }

    function initServiceHeroChips() {
        const chips = document.querySelectorAll('.service-hero__chips a');

        chips.forEach(function (chip) {
            chip.addEventListener('mouseenter', function () {
                chip.classList.add('is-hovered');
            });

            chip.addEventListener('mouseleave', function () {
                chip.classList.remove('is-hovered');
            });

            chip.addEventListener('focus', function () {
                chip.classList.add('is-hovered');
            });

            chip.addEventListener('blur', function () {
                chip.classList.remove('is-hovered');
            });
        });
    }

    function initServiceOverviewGlow() {
        const visual = document.querySelector('.service-overview__visual');

        if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let glow = visual.querySelector('.service-overview__glow');

        if (!glow) {
            glow = document.createElement('span');
            glow.className = 'service-overview__glow';
            glow.setAttribute('aria-hidden', 'true');
            visual.appendChild(glow);
        }

        visual.addEventListener('pointermove', function (event) {
            const rect = visual.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            glow.style.setProperty('--overview-glow-x', x + 'px');
            glow.style.setProperty('--overview-glow-y', y + 'px');
            glow.classList.add('is-active');
        });

        visual.addEventListener('pointerleave', function () {
            glow.classList.remove('is-active');
        });
    }

    function initServiceFaqCount() {
        const faq = document.querySelector('.service-faq');
        const list = faq ? faq.querySelector('.faq-list') : null;

        if (!faq || !list || faq.dataset.faqCountReady === 'true') return;

        faq.dataset.faqCountReady = 'true';

        const count = list.querySelectorAll('.faq-item').length;

        const badge = document.createElement('div');
        badge.className = 'service-faq-badge';
        badge.innerHTML = `
            <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
            <span>${count} comparison questions included</span>
        `;

        const heading = faq.querySelector('.section-heading');

        if (heading) {
            heading.appendChild(badge);
        }
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();