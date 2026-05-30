'use strict';

(function () {
    document.addEventListener('DOMContentLoaded', function () {
        if (!isHomePage()) return;

        initHomeHeroForm();
        initHeroElectricGlow();
        initHomeServiceHover();
        initHomeScrollCue();
    });

    function isHomePage() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);

        return (
            fileName === '' ||
            fileName === 'index.html' ||
            document.body.classList.contains('page-home') ||
            document.querySelector('.hero #quote-form')
        );
    }

    function initHomeHeroForm() {
        const form = document.querySelector('.hero .quote-form');

        if (!form) return;

        const zipInput = form.querySelector('#zipCode');
        const projectType = form.querySelector('#projectType');
        const timeline = form.querySelector('#timeline');

        if (zipInput) {
            zipInput.setAttribute('required', 'required');
            zipInput.setAttribute('inputmode', 'numeric');
            zipInput.setAttribute('autocomplete', 'postal-code');
            zipInput.setAttribute('maxlength', '10');
        }

        if (projectType) {
            projectType.setAttribute('required', 'required');
        }

        if (timeline) {
            timeline.setAttribute('required', 'required');
        }

        const summary = createOrGetSummary(form);

        [zipInput, projectType, timeline].forEach(function (field) {
            if (!field) return;

            field.addEventListener('input', function () {
                updateSummary(summary, zipInput, projectType, timeline);
            });

            field.addEventListener('change', function () {
                updateSummary(summary, zipInput, projectType, timeline);
            });
        });

        updateSummary(summary, zipInput, projectType, timeline);
    }

    function createOrGetSummary(form) {
        let summary = form.querySelector('.home-form-summary');

        if (summary) return summary;

        summary = document.createElement('div');
        summary.className = 'home-form-summary';
        summary.setAttribute('aria-live', 'polite');

        summary.innerHTML = `
            <span class="home-form-summary__icon" aria-hidden="true">
                <i class="fa-solid fa-bolt"></i>
            </span>
            <span class="home-form-summary__text">
                Add your ZIP code, project type, and timeline to prepare a provider comparison request.
            </span>
        `;

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            form.insertBefore(summary, submitButton);
        } else {
            form.appendChild(summary);
        }

        return summary;
    }

    function updateSummary(summary, zipInput, projectType, timeline) {
        if (!summary) return;

        const text = summary.querySelector('.home-form-summary__text');

        if (!text) return;

        const zip = zipInput && zipInput.value ? zipInput.value.trim() : '';
        const project =
            projectType && projectType.value && !projectType.options[projectType.selectedIndex].disabled
                ? projectType.value
                : '';
        const timing =
            timeline && timeline.value && !timeline.options[timeline.selectedIndex].disabled
                ? timeline.value
                : '';

        if (!zip && !project && !timing) {
            text.textContent =
                'Add your ZIP code, project type, and timeline to prepare a provider comparison request.';
            return;
        }

        const parts = [];

        if (zip) {
            parts.push('ZIP ' + zip);
        }

        if (project) {
            parts.push(project);
        }

        if (timing) {
            parts.push(timing);
        }

        text.textContent = 'Comparison preview: ' + parts.join(' • ');
    }

    function initHeroElectricGlow() {
        const hero = document.querySelector('.hero');

        if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let glow = hero.querySelector('.home-electric-glow');

        if (!glow) {
            glow = document.createElement('span');
            glow.className = 'home-electric-glow';
            glow.setAttribute('aria-hidden', 'true');
            hero.appendChild(glow);
        }

        hero.addEventListener('pointermove', function (event) {
            const rect = hero.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            glow.style.setProperty('--glow-x', x + 'px');
            glow.style.setProperty('--glow-y', y + 'px');
            glow.classList.add('is-active');
        });

        hero.addEventListener('pointerleave', function () {
            glow.classList.remove('is-active');
        });
    }

    function initHomeServiceHover() {
        const cards = document.querySelectorAll('.hero-service-card, .service-card');

        if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        cards.forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                const rect = card.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

                card.style.setProperty('--tilt-x', y.toFixed(2) + 'deg');
                card.style.setProperty('--tilt-y', x.toFixed(2) + 'deg');
                card.classList.add('is-tilting');
            });

            card.addEventListener('pointerleave', function () {
                card.classList.remove('is-tilting');
                card.style.removeProperty('--tilt-x');
                card.style.removeProperty('--tilt-y');
            });
        });
    }

    function initHomeScrollCue() {
        const hero = document.querySelector('.hero');
        const services = document.querySelector('#services');

        if (!hero || !services || hero.querySelector('.home-scroll-cue')) return;

        const cue = document.createElement('button');
        cue.className = 'home-scroll-cue';
        cue.type = 'button';
        cue.setAttribute('aria-label', 'Scroll to services');
        cue.innerHTML = `
            <span>Scroll</span>
            <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
        `;

        cue.addEventListener('click', function () {
            const header = document.querySelector('.site-header');
            const offset = header ? header.offsetHeight + 14 : 0;
            const top = services.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        });

        hero.appendChild(cue);
    }
})();