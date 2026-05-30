'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!isAboutPage()) return;

        initAboutTicker();
        initModelPanels();
        initProviderFitCards();
        initSafetyWarningCard();
        initAboutStoryGlow();
    });

    function isAboutPage() {
        const fileName = window.location.pathname.split('/').pop();

        return (
            fileName === 'about.html' ||
            document.body.classList.contains('page-about')
        );
    }

    function initAboutTicker() {
        const ticker = document.querySelector('.about-ticker');
        const track = ticker ? ticker.querySelector('.about-ticker__track') : null;

        if (!ticker || !track || ticker.dataset.enhanced === 'true') return;

        ticker.dataset.enhanced = 'true';

        ticker.setAttribute('tabindex', '0');
        ticker.setAttribute('aria-label', 'Electrical service topics carousel');

        ticker.addEventListener('focusin', function () {
            ticker.classList.add('is-paused');
        });

        ticker.addEventListener('focusout', function () {
            ticker.classList.remove('is-paused');
        });

        ticker.addEventListener('mouseenter', function () {
            ticker.classList.add('is-paused');
        });

        ticker.addEventListener('mouseleave', function () {
            ticker.classList.remove('is-paused');
        });
    }

    function initModelPanels() {
        const panels = document.querySelectorAll('.about-model__panel');

        panels.forEach(function (panel) {
            if (panel.dataset.enhanced === 'true') return;

            panel.dataset.enhanced = 'true';

            const listItems = panel.querySelectorAll('li');

            listItems.forEach(function (item, index) {
                item.style.setProperty('--item-index', index);
            });

            panel.addEventListener('mouseenter', function () {
                panel.classList.add('is-active');
            });

            panel.addEventListener('mouseleave', function () {
                panel.classList.remove('is-active');
            });
        });
    }

    function initProviderFitCards() {
        const section = document.querySelector('#provider-fit');
        const cards = section ? section.querySelectorAll('.feature-card') : [];

        if (!cards.length) return;

        cards.forEach(function (card, index) {
            card.setAttribute('tabindex', '0');
            card.style.setProperty('--fit-index', index);

            card.addEventListener('focus', function () {
                setActiveCard(cards, card);
            });

            card.addEventListener('mouseenter', function () {
                setActiveCard(cards, card);
            });

            card.addEventListener('mouseleave', function () {
                clearActiveCards(cards);
            });

            card.addEventListener('blur', function () {
                clearActiveCards(cards);
            });
        });
    }

    function setActiveCard(cards, activeCard) {
        cards.forEach(function (card) {
            card.classList.toggle('is-active', card === activeCard);
            card.classList.toggle('is-muted', card !== activeCard);
        });
    }

    function clearActiveCards(cards) {
        cards.forEach(function (card) {
            card.classList.remove('is-active', 'is-muted');
        });
    }

    function initSafetyWarningCard() {
        const card = document.querySelector('.about-safety__card');

        if (!card || card.dataset.enhanced === 'true') return;

        card.dataset.enhanced = 'true';

        const list = card.querySelector('ul');

        if (!list) return;

        const status = document.createElement('p');
        status.className = 'about-safety__status';
        status.setAttribute('aria-live', 'polite');
        status.textContent = 'Safety-sensitive signs should be reviewed by a qualified local provider.';

        card.appendChild(status);

        list.querySelectorAll('li').forEach(function (item) {
            item.setAttribute('tabindex', '0');

            item.addEventListener('focus', function () {
                updateStatus(item.textContent.trim());
            });

            item.addEventListener('mouseenter', function () {
                updateStatus(item.textContent.trim());
            });
        });

        function updateStatus(label) {
            status.textContent = label + ' can require urgent professional attention.';
        }
    }

    function initAboutStoryGlow() {
        const visual = document.querySelector('.about-story__visual');

        if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let glow = visual.querySelector('.about-story__glow');

        if (!glow) {
            glow = document.createElement('span');
            glow.className = 'about-story__glow';
            glow.setAttribute('aria-hidden', 'true');
            visual.appendChild(glow);
        }

        visual.addEventListener('pointermove', function (event) {
            const rect = visual.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            glow.style.setProperty('--story-glow-x', x + 'px');
            glow.style.setProperty('--story-glow-y', y + 'px');
            glow.classList.add('is-active');
        });

        visual.addEventListener('pointerleave', function () {
            glow.classList.remove('is-active');
        });
    }
})();