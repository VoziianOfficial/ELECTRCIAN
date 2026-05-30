'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!isServicesPage()) return;

        initServicesCards();
        initObjectTabsStatus();
        initServicesHeroCard();
        initQuoteClarityJump();
        initServiceCategoryKeyboard();
    });

    function isServicesPage() {
        const fileName = window.location.pathname.split('/').pop();

        return (
            fileName === 'services.html' ||
            document.body.classList.contains('page-services')
        );
    }

    function initServicesCards() {
        const cards = document.querySelectorAll('.services-grid--four .service-card');

        cards.forEach(function (card) {
            const link = card.querySelector('a[href]');

            if (!link) return;

            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'link');
            card.setAttribute('aria-label', link.textContent.trim());

            card.addEventListener('click', function (event) {
                if (event.target.closest('a, button')) return;
                link.click();
            });

            card.addEventListener('keydown', function (event) {
                if (event.key !== 'Enter' && event.key !== ' ') return;

                event.preventDefault();
                link.click();
            });
        });
    }

    function initObjectTabsStatus() {
        const tabBlocks = document.querySelectorAll('.object-tabs');

        tabBlocks.forEach(function (block) {
            const tabList = block.querySelector('[role="tablist"]');
            const tabs = Array.from(block.querySelectorAll('[role="tab"]'));

            if (!tabList || !tabs.length || block.dataset.servicesEnhanced === 'true') {
                return;
            }

            block.dataset.servicesEnhanced = 'true';

            const status = document.createElement('div');
            status.className = 'services-tab-status';
            status.setAttribute('aria-live', 'polite');

            status.innerHTML = `
                <div class="services-tab-status__text">
                    <span class="services-tab-status__label">Currently viewing</span>
                    <strong></strong>
                </div>

                <div class="services-tab-status__progress" aria-hidden="true"></div>
            `;

            const progress = status.querySelector('.services-tab-status__progress');

            tabs.forEach(function (_, index) {
                const dot = document.createElement('span');
                dot.className = 'services-tab-status__dot';
                dot.dataset.index = String(index);
                progress.appendChild(dot);
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

                status.querySelectorAll('.services-tab-status__dot').forEach(function (dot, index) {
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

    function initServicesHeroCard() {
        const heroCard = document.querySelector('.services-hero-card');

        if (!heroCard || heroCard.dataset.enhanced === 'true') return;

        heroCard.dataset.enhanced = 'true';

        const checklist = heroCard.querySelector('.check-list');

        if (!checklist) return;

        const summary = document.createElement('div');
        summary.className = 'services-hero-summary';

        summary.innerHTML = `
            <span class="services-hero-summary__icon" aria-hidden="true">
                <i class="fa-solid fa-bolt"></i>
            </span>

            <span>
                Better comparison starts with a clear project category, location, and written quote details.
            </span>
        `;

        checklist.insertAdjacentElement('afterend', summary);
    }

    function initQuoteClarityJump() {
        const serviceLinks = document.querySelectorAll('.service-card__link');

        serviceLinks.forEach(function (link) {
            link.addEventListener('mouseenter', function () {
                const card = link.closest('.service-card');

                if (!card) return;

                card.classList.add('is-link-focused');
            });

            link.addEventListener('mouseleave', function () {
                const card = link.closest('.service-card');

                if (!card) return;

                card.classList.remove('is-link-focused');
            });

            link.addEventListener('focus', function () {
                const card = link.closest('.service-card');

                if (!card) return;

                card.classList.add('is-link-focused');
            });

            link.addEventListener('blur', function () {
                const card = link.closest('.service-card');

                if (!card) return;

                card.classList.remove('is-link-focused');
            });
        });
    }

    function initServiceCategoryKeyboard() {
        const section = document.querySelector('#service-grid');

        if (!section) return;

        const cards = Array.from(section.querySelectorAll('.service-card'));

        cards.forEach(function (card, index) {
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
})();