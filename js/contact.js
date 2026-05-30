'use strict';

(function () {
    const STORAGE_KEY = 'electrcian_contact_form_draft';

    document.addEventListener('DOMContentLoaded', function () {
        if (!isContactPage()) return;

        initContactFormEnhancements();
        initProjectTypeHints();
        initContactCards();
        initCoverageCard();
        initContactLegalReminder();
    });

    function isContactPage() {
        const fileName = window.location.pathname.split('/').pop();

        return (
            fileName === 'contact.html' ||
            document.body.classList.contains('page-contact')
        );
    }

    function initContactFormEnhancements() {
        const form = document.querySelector('.contact-form');

        if (!form || form.dataset.contactEnhanced === 'true') return;

        form.dataset.contactEnhanced = 'true';

        const fields = {
            name: form.querySelector('#contactName'),
            email: form.querySelector('#contactEmail'),
            phone: form.querySelector('#contactPhone'),
            zip: form.querySelector('#contactZip'),
            project: form.querySelector('#contactProject'),
            details: form.querySelector('#contactDetails'),
            consent: form.querySelector('input[name="consent"]')
        };

        restoreDraft(form, fields);
        applyProjectFromUrl(fields.project);
        addFormReadinessPanel(form, fields);
        addCharacterCounter(fields.details);
        addFieldListeners(form, fields);

        form.addEventListener('submit', function () {
            window.setTimeout(function () {
                const successStatus = form.querySelector('.form-status.is-success');

                if (successStatus) {
                    localStorage.removeItem(STORAGE_KEY);
                    resetReadinessPanel(form, fields);
                    resetCharacterCounter(fields.details);
                }
            }, 80);
        });
    }

    function addFieldListeners(form, fields) {
        Object.keys(fields).forEach(function (key) {
            const field = fields[key];

            if (!field) return;

            field.addEventListener('input', function () {
                if (key === 'phone') {
                    field.value = formatPhone(field.value);
                }

                if (key === 'zip') {
                    field.value = cleanZip(field.value);
                }

                saveDraft(fields);
                updateReadinessPanel(form, fields);
            });

            field.addEventListener('change', function () {
                saveDraft(fields);
                updateReadinessPanel(form, fields);
            });

            field.addEventListener('blur', function () {
                validateSingleField(field);
            });
        });
    }

    function addFormReadinessPanel(form, fields) {
        if (form.querySelector('.contact-readiness')) {
            updateReadinessPanel(form, fields);
            return;
        }

        const panel = document.createElement('div');
        panel.className = 'contact-readiness';
        panel.setAttribute('aria-live', 'polite');

        panel.innerHTML = `
            <div class="contact-readiness__head">
                <span class="contact-readiness__icon" aria-hidden="true">
                    <i class="fa-solid fa-bolt"></i>
                </span>
                <div>
                    <strong>Request readiness</strong>
                    <span class="contact-readiness__summary">
                        Complete the required fields to prepare a provider comparison request.
                    </span>
                </div>
            </div>

            <div class="contact-readiness__bar" aria-hidden="true">
                <span></span>
            </div>
        `;

        const submitButton = form.querySelector('button[type="submit"]');

        if (submitButton) {
            form.insertBefore(panel, submitButton);
        } else {
            form.appendChild(panel);
        }

        updateReadinessPanel(form, fields);
    }

    function updateReadinessPanel(form, fields) {
        const panel = form.querySelector('.contact-readiness');

        if (!panel) return;

        const requiredItems = [
            fields.name,
            fields.email,
            fields.phone,
            fields.zip,
            fields.project,
            fields.details,
            fields.consent
        ].filter(Boolean);

        const completed = requiredItems.filter(function (field) {
            if (field.type === 'checkbox') return field.checked;
            return String(field.value || '').trim().length > 0;
        }).length;

        const percent = requiredItems.length
            ? Math.round((completed / requiredItems.length) * 100)
            : 0;

        const bar = panel.querySelector('.contact-readiness__bar span');
        const summary = panel.querySelector('.contact-readiness__summary');

        if (bar) {
            bar.style.width = percent + '%';
        }

        if (summary) {
            if (percent === 100) {
                summary.textContent = 'Ready to submit. Please review your details before sending.';
            } else {
                summary.textContent = completed + ' of ' + requiredItems.length + ' required details completed.';
            }
        }

        panel.classList.toggle('is-complete', percent === 100);
    }

    function resetReadinessPanel(form, fields) {
        updateReadinessPanel(form, fields);
    }

    function addCharacterCounter(textarea) {
        if (!textarea || textarea.dataset.counterReady === 'true') return;

        textarea.dataset.counterReady = 'true';

        const counter = document.createElement('p');
        counter.className = 'contact-character-counter';
        counter.setAttribute('aria-live', 'polite');

        textarea.insertAdjacentElement('afterend', counter);

        const update = function () {
            const length = textarea.value.trim().length;
            counter.textContent = length + ' characters written. Add enough detail for better provider comparison.';
        };

        textarea.addEventListener('input', update);
        update();
    }

    function resetCharacterCounter(textarea) {
        if (!textarea) return;

        const counter = textarea.parentElement
            ? textarea.parentElement.querySelector('.contact-character-counter')
            : null;

        if (counter) {
            counter.textContent = '0 characters written. Add enough detail for better provider comparison.';
        }
    }

    function saveDraft(fields) {
        const draft = {};

        Object.keys(fields).forEach(function (key) {
            const field = fields[key];

            if (!field) return;

            if (field.type === 'checkbox') {
                draft[key] = field.checked;
            } else {
                draft[key] = field.value;
            }
        });

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        } catch (error) {
            console.warn('Contact draft could not be saved.', error);
        }
    }

    function restoreDraft(form, fields) {
        let draft = null;

        try {
            draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        } catch (error) {
            draft = null;
        }

        if (!draft) return;

        Object.keys(fields).forEach(function (key) {
            const field = fields[key];

            if (!field || typeof draft[key] === 'undefined') return;

            if (field.type === 'checkbox') {
                field.checked = Boolean(draft[key]);
            } else {
                field.value = draft[key];
            }
        });

        const restoredNote = document.createElement('p');
        restoredNote.className = 'contact-draft-note';
        restoredNote.textContent = 'Your previously entered details were restored from this browser.';

        form.prepend(restoredNote);
    }

    function applyProjectFromUrl(projectSelect) {
        if (!projectSelect) return;

        const params = new URLSearchParams(window.location.search);
        const project = params.get('project');

        if (!project) return;

        const normalizedProject = project.toLowerCase().replace(/-/g, ' ');

        Array.from(projectSelect.options).forEach(function (option) {
            const optionText = option.textContent.toLowerCase();

            if (optionText.includes(normalizedProject)) {
                projectSelect.value = option.value || option.textContent;
            }
        });
    }

    function validateSingleField(field) {
        if (!field.hasAttribute('required')) return true;

        let isValid = true;

        if (field.type === 'checkbox') {
            isValid = field.checked;
        } else {
            isValid = String(field.value || '').trim().length > 0;
        }

        if (field.type === 'email' && field.value.trim()) {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }

        field.classList.toggle('is-invalid', !isValid);
        field.setAttribute('aria-invalid', isValid ? 'false' : 'true');

        return isValid;
    }

    function formatPhone(value) {
        const digits = String(value || '').replace(/\D/g, '').slice(0, 10);

        if (digits.length <= 3) {
            return digits;
        }

        if (digits.length <= 6) {
            return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
        }

        return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    }

    function cleanZip(value) {
        return String(value || '')
            .replace(/[^\d-]/g, '')
            .slice(0, 10);
    }

    function initProjectTypeHints() {
        const select = document.querySelector('#contactProject');

        if (!select || select.dataset.hintsReady === 'true') return;

        select.dataset.hintsReady = 'true';

        const hint = document.createElement('p');
        hint.className = 'contact-project-hint';
        hint.setAttribute('aria-live', 'polite');

        select.insertAdjacentElement('afterend', hint);

        const hintMap = {
            'Electrical Repair':
                'Good for outlets, switches, flickering lights, breaker issues, and troubleshooting.',
            'Panel Upgrade':
                'Good for panel capacity, breaker panel replacement, EV readiness, and permit questions.',
            'Wiring / Rewiring':
                'Good for new circuits, remodel wiring, outdoor wiring, and old wiring concerns.',
            'EV Charger Installation':
                'Good for Level 2 charger setup, dedicated circuits, panel readiness, and charger location.',
            'Not sure yet':
                'Describe the issue in the details box so the request can be organized by category.'
        };

        const update = function () {
            const value = select.value;
            hint.textContent = hintMap[value] || 'Select the closest category for better provider comparison.';
        };

        select.addEventListener('change', update);
        update();
    }

    function initContactCards() {
        const cards = document.querySelectorAll('.contact-info-card');

        cards.forEach(function (card) {
            if (card.dataset.contactCardReady === 'true') return;

            card.dataset.contactCardReady = 'true';
            card.setAttribute('tabindex', '0');

            card.addEventListener('focus', function () {
                card.classList.add('is-active');
            });

            card.addEventListener('blur', function () {
                card.classList.remove('is-active');
            });

            card.addEventListener('mouseenter', function () {
                card.classList.add('is-active');
            });

            card.addEventListener('mouseleave', function () {
                card.classList.remove('is-active');
            });
        });
    }

    function initCoverageCard() {
        const card = document.querySelector('.coverage-card');

        if (!card || card.dataset.coverageReady === 'true') return;

        card.dataset.coverageReady = 'true';

        const dots = card.querySelectorAll('.coverage-card__dot');

        dots.forEach(function (dot, index) {
            dot.style.animationDelay = index * 160 + 'ms';
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', 'Provider availability point ' + (index + 1));

            dot.addEventListener('focus', function () {
                card.classList.add('is-focused');
            });

            dot.addEventListener('blur', function () {
                card.classList.remove('is-focused');
            });
        });
    }

    function initContactLegalReminder() {
        const cta = document.querySelector('.contact-legal-cta');

        if (!cta || cta.dataset.legalReady === 'true') return;

        cta.dataset.legalReady = 'true';

        const notice = document.createElement('div');
        notice.className = 'contact-legal-inline-note';

        notice.innerHTML = `
            <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
            <span>
                Electrcian does not perform electrical work directly. Always verify provider details before hiring.
            </span>
        `;

        const content = cta.querySelector('.cta-banner__content');

        if (content) {
            content.appendChild(notice);
        }
    }
})();