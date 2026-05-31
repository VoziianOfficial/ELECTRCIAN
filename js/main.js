'use strict';

(function () {
    const DEFAULT_CONFIG = {
        company: {
            name: 'Electrcian',
            companyId: 'ELC-USA-2048',
            address: {
                line1: '214 Market Street',
                city: 'Denver',
                state: 'CO',
                zip: '80202',
                country: 'USA',
                full: '214 Market Street, Denver, CO 80202, USA'
            },
            serviceArea: 'Independent electrical provider matching across selected areas in the United States'
        },

        contact: {
            phoneRaw: '+18885550192',
            phoneDisplay: '(888) 555-0192',
            phoneButtonText: 'Call Now',
            email: 'hello@electrcian.com',
            supportHours: 'Mon–Fri, 8:00 AM–7:00 PM'
        },

        legal: {
            disclaimer:
                'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',
            shortNotice:
                'Electrcian is an independent provider-matching platform and does not perform electrical work directly.'
        },

        footer: {
            description:
                'Electrcian helps homeowners compare local electrical provider options for repair, panel, wiring, and EV charger projects. Providers are independent and availability may vary by location.'
        },

        navigation: [
            { label: 'Home', href: 'index.html' },
            { label: 'Services', href: 'services.html' },
            { label: 'About', href: 'about.html' },
            { label: 'Contact', href: 'contact.html' }
        ],

        services: [
            {
                id: 'electrical-repair',
                title: 'Electrical Repair',
                shortTitle: 'Repair',
                href: 'electrical-repair.html',
                image: 'assets/images/electrical-repair.jpg',
                icon: 'fa-screwdriver-wrench',
                summary:
                    'Compare local providers for troubleshooting, outlet issues, breaker concerns, and power problems.'
            },
            {
                id: 'panel-upgrades',
                title: 'Panel Upgrades',
                shortTitle: 'Panels',
                href: 'panel-upgrades.html',
                image: 'assets/images/panel-upgrades.jpg',
                icon: 'fa-table-columns',
                summary:
                    'Review provider options for panel replacement, capacity upgrades, and modern power distribution needs.'
            },
            {
                id: 'wiring-rewiring',
                title: 'Wiring & Rewiring',
                shortTitle: 'Wiring',
                href: 'wiring-rewiring.html',
                image: 'assets/images/wiring-rewiring.jpg',
                icon: 'fa-plug-circle-bolt',
                summary:
                    'Compare companies for new wiring, rewiring, circuit planning, and electrical layout updates.'
            },
            {
                id: 'ev-charger-installation',
                title: 'EV Charger Installation',
                shortTitle: 'EV Chargers',
                href: 'ev-charger-installation.html',
                image: 'assets/images/ev-charger.jpg',
                icon: 'fa-car-battery',
                summary:
                    'Explore local provider options for home EV charger setup, circuit review, and quote comparison.'
            }
        ],

        forms: {
            contactTitle: 'Request electrical provider options',
            contactIntro:
                'Share a few details and compare electrical provider options in your area.',
            successMessage:
                'Thank you. Your request has been prepared for provider comparison.',
            errorMessage:
                'Please check the highlighted fields before sending.'
        },

        cookieBanner: {
            storageKey: 'electrcian_cookie_choice',
            title: 'Cookie preferences',
            text:
                'This website may use basic storage to remember your cookie preference and improve browsing experience.',
            acceptText: 'Accept',
            declineText: 'Decline'
        },

        pageMeta: {
            'index.html': {
                title: 'Electrcian | Compare Local Electrical Providers',
                description:
                    'Compare local electrical provider options for repairs, panels, wiring, and EV charger projects.'
            },
            'services.html': {
                title: 'Electrical Services | Electrcian',
                description:
                    'Review electrical service categories and compare independent local provider options.'
            },
            'about.html': {
                title: 'About Electrcian | Electrical Provider Matching Platform',
                description:
                    'Learn how Electrcian helps homeowners compare local electrical providers without performing work directly.'
            },
            'contact.html': {
                title: 'Contact Electrcian | Request Electrical Provider Options',
                description:
                    'Submit your electrical project details and compare local provider options.'
            },
            'electrical-repair.html': {
                title: 'Electrical Repair Provider Options | Electrcian',
                description: 'Compare local electrical repair provider options for outlets, switches, breakers, flickering lights, and power concerns.'
            },
            'panel-upgrades.html': {
                title: 'Panel Upgrade Provider Options | Electrcian',
                description: 'Compare provider options for panel upgrades, breaker panel replacement, capacity needs, and permit-related quote details.'
            },
            'wiring-rewiring.html': {
                title: 'Wiring & Rewiring Provider Options | Electrcian',
                description: 'Compare wiring and rewiring provider options for new circuits, remodel wiring, outdoor wiring, and electrical layout updates.'
            },
            'ev-charger-installation.html': {
                title: 'EV Charger Installation Provider Options | Electrcian',
                description: 'Compare provider options for EV charger installation, dedicated circuits, panel readiness, and permit notes.'
            },
            'privacy-policy.html': {
                title: 'Privacy Policy | Electrcian',
                description: 'Read the Electrcian privacy policy for website data, contact requests, and provider comparison support.'
            },
            'cookie-policy.html': {
                title: 'Cookie Policy | Electrcian',
                description: 'Read the Electrcian cookie policy and learn how browser storage may be used for cookie preferences.'
            },
            'terms-of-service.html': {
                title: 'Terms of Service | Electrcian',
                description: 'Read the Electrcian terms of service for this independent electrical provider matching website.'
            }
        }
    };

    const CONFIG = mergeDeep(DEFAULT_CONFIG, window.SITE_CONFIG || {});

    document.addEventListener('DOMContentLoaded', function () {
        ensureSkipLink();
        applyPageMeta();
        applyConfigData();
        replaceTextTokens();
        initHeaderOffset();
        initServicesDropdown();
        initMobileMenu();
        initSmoothScrolling();
        initActiveNavigation();
        initSectionWireNav();
        initCookieBanner();
        initForms();
        initFaqAccordions();
        initTabs();
        initProjectTabs();
        initRevealAnimations();
        initFaqSchema();

        window.addEventListener('resize', debounce(initHeaderOffset, 120));
    });

    function mergeDeep(target, source) {
        const output = { ...target };

        if (!source || typeof source !== 'object') {
            return output;
        }

        Object.keys(source).forEach(function (key) {
            const targetValue = output[key];
            const sourceValue = source[key];

            if (
                sourceValue &&
                typeof sourceValue === 'object' &&
                !Array.isArray(sourceValue)
            ) {
                output[key] = mergeDeep(targetValue || {}, sourceValue);
            } else {
                output[key] = sourceValue;
            }
        });

        return output;
    }

    function getCurrentFileName() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1);

        return fileName || 'index.html';
    }

    function ensureSkipLink() {
        if (document.querySelector('.skip-link')) return;

        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';

        const main = document.querySelector('main');

        if (main && !main.id) {
            main.id = 'main';
        }

        document.body.prepend(skipLink);
    }

    function applyPageMeta() {
        const fileName = getCurrentFileName();
        const meta = CONFIG.pageMeta && CONFIG.pageMeta[fileName];

        if (!meta) return;

        if (meta.title) {
            document.title = meta.title;
        }

        if (meta.description) {
            let descriptionTag = document.querySelector('meta[name="description"]');

            if (!descriptionTag) {
                descriptionTag = document.createElement('meta');
                descriptionTag.setAttribute('name', 'description');
                document.head.appendChild(descriptionTag);
            }

            descriptionTag.setAttribute('content', meta.description);
        }
    }

    function getTokenMap() {
        return {
            companyName: CONFIG.company.name,
            companyId: CONFIG.company.companyId,
            phoneDisplay: CONFIG.contact.phoneDisplay,
            phoneRaw: CONFIG.contact.phoneRaw,
            phoneButtonText: CONFIG.contact.phoneButtonText,
            email: CONFIG.contact.email,
            addressFull: CONFIG.company.address.full,
            serviceArea: CONFIG.company.serviceArea,
            disclaimer: CONFIG.legal.disclaimer,
            legalNotice: CONFIG.legal.shortNotice,
            supportHours: CONFIG.contact.supportHours
        };
    }

    function replaceTokens(value) {
        if (!value || typeof value !== 'string') return value;

        const tokens = getTokenMap();

        return value.replace(/\{\{(\w+)\}\}/g, function (match, tokenName) {
            return Object.prototype.hasOwnProperty.call(tokens, tokenName)
                ? tokens[tokenName]
                : match;
        });
    }

    function replaceTextTokens() {
        const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'];

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function (node) {
                    if (!node.nodeValue || !node.nodeValue.includes('{{')) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    const parent = node.parentElement;

                    if (!parent || skipTags.includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            node.nodeValue = replaceTokens(node.nodeValue);
        });

        const safeAttributes = [
            'title',
            'alt',
            'aria-label',
            'placeholder',
            'value',
            'content',
            'href',
            'data-label'
        ];

        document.querySelectorAll('*').forEach(function (element) {
            safeAttributes.forEach(function (attr) {
                if (element.hasAttribute(attr)) {
                    element.setAttribute(attr, replaceTokens(element.getAttribute(attr)));
                }
            });
        });
    }

    function applyConfigData() {
        setText('[data-company-name]', CONFIG.company.name);
        setText('[data-company-id]', CONFIG.company.companyId);
        setText('[data-phone-text]', CONFIG.contact.phoneDisplay);
        setText('[data-email-text]', CONFIG.contact.email);
        setText('[data-address-text]', CONFIG.company.address.full);
        setText('[data-service-area]', CONFIG.company.serviceArea);
        setText('[data-footer-text]', CONFIG.footer.description);
        setText('[data-disclaimer]', CONFIG.legal.disclaimer);
        setText('[data-legal-notice]', CONFIG.legal.shortNotice);
        setText('[data-support-hours]', CONFIG.contact.supportHours);

        document.querySelectorAll('[data-phone-link]').forEach(function (link) {
            link.setAttribute('href', 'tel:' + sanitizePhone(CONFIG.contact.phoneRaw));
        });

        document.querySelectorAll('[data-email-link]').forEach(function (link) {
            link.setAttribute('href', 'mailto:' + CONFIG.contact.email);
        });

        renderServicesList();
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.textContent = value;
        });
    }

    function sanitizePhone(phone) {
        return String(phone || '').replace(/[^\d+]/g, '');
    }

    function renderServicesList() {
        document.querySelectorAll('[data-services-list]').forEach(function (container) {
            const variant = container.getAttribute('data-services-list') || 'simple';

            container.innerHTML = '';

            CONFIG.services.forEach(function (service) {
                const item = document.createElement('a');
                item.href = service.href;
                item.className = 'service-link-item';

                if (variant === 'cards') {
                    item.innerHTML = `
                        <span class="service-link-item__icon" aria-hidden="true">
                            <i class="fa-solid ${service.icon}"></i>
                        </span>
                        <span class="service-link-item__content">
                            <strong>${escapeHtml(service.title)}</strong>
                            <small>${escapeHtml(service.summary)}</small>
                        </span>
                    `;
                } else {
                    item.textContent = service.title;
                }

                container.appendChild(item);
            });
        });
    }

    function initHeaderOffset() {
        const header = document.querySelector('.site-header');

        if (!header) return;

        document.documentElement.style.setProperty(
            '--header-height',
            header.offsetHeight + 'px'
        );
    }

    function initServicesDropdown() {
        const navList = document.querySelector('.main-nav__list');

        if (!navList) return;

        const servicesLink = Array.from(navList.querySelectorAll('a')).find(function (link) {
            return link.textContent.trim().toLowerCase() === 'services';
        });

        if (!servicesLink) return;

        const parentItem = servicesLink.closest('li');

        if (!parentItem) return;

        parentItem.classList.add('nav-services-item');
        servicesLink.classList.add('nav-services-trigger');

        servicesLink.setAttribute('aria-haspopup', 'true');
        servicesLink.setAttribute('aria-expanded', 'false');

        const oldDropdowns = parentItem.querySelectorAll(
            '.services-dropdown, .nav-services-dropdown'
        );

        oldDropdowns.forEach(function (dropdown) {
            dropdown.remove();
        });

        const dropdown = document.createElement('div');
        dropdown.className = 'nav-services-dropdown';
        dropdown.setAttribute('role', 'menu');
        dropdown.hidden = true;

        CONFIG.services.forEach(function (service) {
            const item = document.createElement('a');

            item.href = service.href;
            item.className = 'nav-services-dropdown__link';
            item.setAttribute('role', 'menuitem');
            item.textContent = service.title;

            dropdown.appendChild(item);
        });

        parentItem.appendChild(dropdown);

        let closeTimer = null;

        function openDropdown() {
            clearTimeout(closeTimer);
            dropdown.hidden = false;
            parentItem.classList.add('is-open');
            servicesLink.setAttribute('aria-expanded', 'true');
        }

        function closeDropdown() {
            closeTimer = setTimeout(function () {
                dropdown.hidden = true;
                parentItem.classList.remove('is-open');
                servicesLink.setAttribute('aria-expanded', 'false');
            }, 180);
        }

        parentItem.addEventListener('mouseenter', openDropdown);
        parentItem.addEventListener('mouseleave', closeDropdown);

        servicesLink.addEventListener('focus', openDropdown);

        parentItem.addEventListener('focusout', function (event) {
            if (!parentItem.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                dropdown.hidden = true;
                parentItem.classList.remove('is-open');
                servicesLink.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('click', function (event) {
            if (!parentItem.contains(event.target)) {
                dropdown.hidden = true;
                parentItem.classList.remove('is-open');
                servicesLink.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initMobileMenu() {
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('#mobileMenu, [data-mobile-menu]');
        const closeButton = menu ? menu.querySelector('.mobile-menu__close') : null;
        const overlay = menu ? menu.querySelector('.mobile-menu__overlay') : null;
        const focusableSelector =
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        if (!burger || !menu) return;

        let lastFocusedElement = null;

        closeMenu(true);

        burger.addEventListener('click', function () {
            if (menu.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeMenu);
        }

        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        menu.querySelectorAll('a[href]').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }

            if (event.key === 'Tab' && menu.classList.contains('is-open')) {
                trapFocus(event);
            }
        });

        function openMenu() {
            lastFocusedElement = document.activeElement;

            menu.classList.add('is-open');
            burger.classList.add('is-active');
            burger.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            document.body.classList.add('menu-open');

            if ('inert' in menu) {
                menu.inert = false;
            }

            const firstFocusable = menu.querySelector(focusableSelector);

            if (firstFocusable) {
                setTimeout(function () {
                    firstFocusable.focus();
                }, 80);
            }
        }

        function closeMenu(initial) {
            menu.classList.remove('is-open');
            burger.classList.remove('is-active');
            burger.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('menu-open');

            if ('inert' in menu) {
                menu.inert = true;
            }

            if (!initial && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }

        function trapFocus(event) {
            const focusableElements = Array.from(menu.querySelectorAll(focusableSelector));

            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (event) {
                const targetId = link.getAttribute('href');

                if (!targetId || targetId === '#') return;

                const target = document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const header = document.querySelector('.site-header');
                const offset = header ? header.offsetHeight + 14 : 0;
                const targetTop =
                    target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initActiveNavigation() {
        const currentFile = getCurrentFileName();

        const normalizeHref = function (href) {
            if (!href) return '';

            const clean = href.split('#')[0].split('?')[0];

            return clean
                .replace('./', '')
                .replace(/^\//, '') || 'index.html';
        };

        const navLinks = document.querySelectorAll(
            '.main-nav a[href], .mobile-nav a[href], .footer__links a[href]'
        );

        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            const cleanHref = normalizeHref(href);

            if (cleanHref === currentFile) {
                link.classList.add('is-active');
            }

            if (
                currentFile === 'index.html' &&
                (cleanHref === 'index.html' || cleanHref === '')
            ) {
                link.classList.add('is-active');
            }

            if (
                document.body.classList.contains('page-service') &&
                cleanHref === 'services.html'
            ) {
                link.classList.add('is-active');
            }
        });

        const sectionLinks = document.querySelectorAll(
            '.main-nav a[href^="#"], .mobile-nav a[href^="#"]'
        );

        const sections = Array.from(sectionLinks)
            .map(function (link) {
                const id = link.getAttribute('href');
                return document.querySelector(id);
            })
            .filter(Boolean);

        if (!sections.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const id = '#' + entry.target.id;

                    sectionLinks.forEach(function (link) {
                        link.classList.toggle('is-active', link.getAttribute('href') === id);
                    });
                });
            },
            {
                rootMargin: '-35% 0px -55% 0px',
                threshold: 0.01
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    function initSectionWireNav() {
        if (document.querySelector('.section-wire-nav')) return;

        const main = document.querySelector('main');

        if (!main) return;

        const sectionCandidates = Array.from(
            main.querySelectorAll('section[id]')
        ).filter(function (section) {
            return section.id !== 'quote-form';
        });

        if (sectionCandidates.length < 3) return;

        const nav = document.createElement('nav');
        nav.className = 'section-wire-nav';
        nav.setAttribute('aria-label', 'Page section navigation');

        sectionCandidates.slice(0, 8).forEach(function (section) {
            const label =
                section.getAttribute('data-section') ||
                section.getAttribute('aria-label') ||
                getReadableSectionName(section.id);

            const link = document.createElement('a');
            link.href = '#' + section.id;
            link.textContent = label;

            nav.appendChild(link);
        });

        document.body.appendChild(nav);

        if (!('IntersectionObserver' in window)) return;

        const navLinks = nav.querySelectorAll('a');

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const id = '#' + entry.target.id;

                    navLinks.forEach(function (link) {
                        link.classList.toggle('is-active', link.getAttribute('href') === id);
                    });
                });
            },
            {
                rootMargin: '-42% 0px -48% 0px',
                threshold: 0.01
            }
        );

        sectionCandidates.forEach(function (section) {
            observer.observe(section);
        });
    }

    function getReadableSectionName(id) {
        return id
            .replace(/-/g, ' ')
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });
    }

    function initCookieBanner() {
        const storageKey =
            CONFIG.cookieBanner && CONFIG.cookieBanner.storageKey
                ? CONFIG.cookieBanner.storageKey
                : 'electrcian_cookie_choice';

        let savedChoice = null;

        try {
            savedChoice = localStorage.getItem(storageKey);
        } catch (error) {
            savedChoice = null;
        }

        if (savedChoice) return;

        let banner = document.querySelector('[data-cookie-banner], .cookie-banner');

        if (!banner) {
            banner = document.createElement('aside');
            banner.className = 'cookie-banner';
            banner.setAttribute('data-cookie-banner', '');
            banner.setAttribute('aria-label', 'Cookie preferences');

            banner.innerHTML = `
            <div class="cookie-banner__inner">
                <div class="cookie-banner__content">
                    <h3>${escapeHtml(CONFIG.cookieBanner.title || 'Cookie preferences')}</h3>
                    <p>${escapeHtml(CONFIG.cookieBanner.text || 'This website may use basic storage to remember your cookie preference.')}</p>

                    <div class="cookie-banner__links">
                        <a href="./privacy-policy.html">Privacy Policy</a>
                        <a href="./cookie-policy.html">Cookie Policy</a>
                        <a href="./terms-of-service.html">Terms of Service</a>
                    </div>
                </div>

                <div class="cookie-banner__actions">
                    <button class="btn btn--ghost-light" type="button" data-cookie-decline>
                        ${escapeHtml(CONFIG.cookieBanner.declineText || 'Decline')}
                    </button>

                    <button class="btn btn--accent" type="button" data-cookie-accept>
                        ${escapeHtml(CONFIG.cookieBanner.acceptText || 'Accept')}
                    </button>
                </div>
            </div>
        `;

            document.body.appendChild(banner);
        }

        const acceptButton = banner.querySelector('[data-cookie-accept]');
        const declineButton = banner.querySelector('[data-cookie-decline]');

        requestAnimationFrame(function () {
            banner.classList.add('is-visible');
        });

        if (acceptButton) {
            acceptButton.addEventListener('click', function () {
                saveCookieChoice('accepted');
            });
        }

        if (declineButton) {
            declineButton.addEventListener('click', function () {
                saveCookieChoice('declined');
            });
        }

        function saveCookieChoice(choice) {
            try {
                localStorage.setItem(storageKey, choice);
            } catch (error) {
                console.warn('Cookie preference could not be saved.', error);
            }

            banner.classList.remove('is-visible');
        }
    }

    function initForms() {
        document.querySelectorAll('form').forEach(function (form) {
            if (form.dataset.initialized === 'true') return;

            form.dataset.initialized = 'true';

            form.setAttribute('novalidate', 'novalidate');

            form.addEventListener('submit', function (event) {
                event.preventDefault();

                const result = validateForm(form);
                const status = getOrCreateFormStatus(form);

                if (!result.isValid) {
                    status.textContent = CONFIG.forms.errorMessage;
                    status.className = 'form-status is-error';

                    const firstInvalid = form.querySelector('.is-invalid');

                    if (firstInvalid) {
                        firstInvalid.focus();
                    }

                    return;
                }

                status.textContent = CONFIG.forms.successMessage;
                status.className = 'form-status is-success';

                form.reset();
            });
        });
    }

    function validateForm(form) {
        const requiredFields = Array.from(
            form.querySelectorAll('[required], [data-required="true"]')
        );

        let isValid = true;

        clearFormErrors(form);

        requiredFields.forEach(function (field) {
            const value = String(field.value || '').trim();
            const type = field.getAttribute('type');

            if (type === 'checkbox' && !field.checked) {
                markFieldInvalid(field);
                isValid = false;
                return;
            }

            if (!value) {
                markFieldInvalid(field);
                isValid = false;
                return;
            }

            if (type === 'email' && !isValidEmail(value)) {
                markFieldInvalid(field);
                isValid = false;
            }
        });

        return { isValid: isValid };
    }

    function clearFormErrors(form) {
        form.querySelectorAll('.is-invalid').forEach(function (field) {
            field.classList.remove('is-invalid');
            field.removeAttribute('aria-invalid');
        });
    }

    function markFieldInvalid(field) {
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
    }

    function getOrCreateFormStatus(form) {
        let status = form.querySelector('.form-status');

        if (!status) {
            status = document.createElement('p');
            status.className = 'form-status';
            status.setAttribute('role', 'status');
            form.appendChild(status);
        }

        return status;
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function initFaqAccordions() {
        document.querySelectorAll('.faq-item').forEach(function (item) {
            const button = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!button || !answer || button.dataset.initialized === 'true') return;

            button.dataset.initialized = 'true';

            const answerId =
                answer.id || 'faq-answer-' + Math.random().toString(36).slice(2, 9);

            answer.id = answerId;

            button.setAttribute('aria-controls', answerId);
            button.setAttribute(
                'aria-expanded',
                item.classList.contains('is-open') ? 'true' : 'false'
            );

            button.addEventListener('click', function () {
                const isOpen = item.classList.toggle('is-open');

                button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        });
    }

    function initTabs() {
        document.querySelectorAll('[role="tablist"]').forEach(function (tabList) {
            const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

            if (!tabs.length) return;

            tabs.forEach(function (tab, index) {
                if (tab.dataset.initialized === 'true') return;

                tab.dataset.initialized = 'true';
                tab.setAttribute('tabindex', tab.getAttribute('aria-selected') === 'true' ? '0' : '-1');

                tab.addEventListener('click', function () {
                    activateTab(tabList, tab);
                });

                tab.addEventListener('keydown', function (event) {
                    let newIndex = index;

                    if (event.key === 'ArrowRight') {
                        newIndex = (index + 1) % tabs.length;
                    }

                    if (event.key === 'ArrowLeft') {
                        newIndex = (index - 1 + tabs.length) % tabs.length;
                    }

                    if (event.key === 'Home') {
                        newIndex = 0;
                    }

                    if (event.key === 'End') {
                        newIndex = tabs.length - 1;
                    }

                    if (newIndex !== index) {
                        event.preventDefault();
                        tabs[newIndex].focus();
                        activateTab(tabList, tabs[newIndex]);
                    }
                });
            });
        });
    }

    function activateTab(tabList, activeTab) {
        const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

        tabs.forEach(function (tab) {
            const isActive = tab === activeTab;
            const panelId = tab.getAttribute('aria-controls');
            const panel = panelId ? document.getElementById(panelId) : null;

            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.setAttribute('tabindex', isActive ? '0' : '-1');

            if (panel) {
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            }
        });
    }

    function initProjectTabs() {
        const tabs = document.querySelectorAll('.project-tab');
        const visual = document.querySelector('.project-home-card');
        const list = document.querySelector('.project-types__list');

        if (!tabs.length || !visual || !list) return;

        const projectData = {
            Residential: {
                image: './assets/images/home-wiring.jpg',
                label: 'Residential electrical',
                items: [
                    'Home wiring & rewiring',
                    'Lighting installation',
                    'Outlet & switch installation',
                    'Panel upgrades',
                    'EV charger installation',
                    'Ceiling fan installation'
                ]
            },

            Commercial: {
                image: './assets/images/breaker-panel.jpg',
                label: 'Commercial electrical',
                items: [
                    'Office lighting updates',
                    'Breaker panel review',
                    'Dedicated circuit planning',
                    'Tenant improvement wiring',
                    'Code and permit questions',
                    'Quote comparison support'
                ]
            },

            Emergency: {
                image: './assets/images/electrical-tools.jpg',
                label: 'Emergency electrical',
                items: [
                    'Power loss concerns',
                    'Burning smell or hot outlets',
                    'Breaker failure',
                    'Exposed wiring',
                    'Urgent provider availability',
                    'Safety-first quote review'
                ]
            },

            Industrial: {
                image: './assets/images/quote-clarity.jpg',
                label: 'Industrial electrical',
                items: [
                    'High-load electrical planning',
                    'Equipment circuit needs',
                    'Panel and capacity review',
                    'Safety documentation',
                    'Timeline coordination',
                    'Provider verification details'
                ]
            }
        };

        function updateProject(tab) {
            const key = tab.textContent.trim();
            const data = projectData[key];

            if (!data) return;

            tabs.forEach(function (item) {
                item.classList.toggle('is-active', item === tab);
            });

            visual.classList.add('is-changing');

            window.setTimeout(function () {
                visual.style.setProperty('--project-image', 'url("' + data.image + '")');
                visual.setAttribute('data-project-label', data.label);

                list.innerHTML = '';

                data.items.forEach(function (text) {
                    const li = document.createElement('li');
                    li.textContent = text;
                    list.appendChild(li);
                });

                visual.classList.remove('is-changing');
            }, 160);
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                updateProject(tab);
            });
        });

        const activeTab = Array.from(tabs).find(function (tab) {
            return tab.classList.contains('is-active');
        }) || tabs[0];

        updateProject(activeTab);
    }

    function initRevealAnimations() {
        const elements = document.querySelectorAll(
            '.section-heading, .service-card, .hero-service-card, .comparison-panel, .comparison-reminder, .feature-card, .review-card, .cta-banner__inner'
        );

        if (!elements.length || !('IntersectionObserver' in window)) return;

        elements.forEach(function (element) {
            element.classList.add('reveal-item');
        });

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px'
            }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }

    function initFaqSchema() {
        const faqItems = Array.from(document.querySelectorAll('.faq-item'));

        if (!faqItems.length) return;

        const questions = faqItems
            .map(function (item) {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');

                if (!question || !answer) return null;

                return {
                    '@type': 'Question',
                    name: question.textContent.trim(),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: answer.textContent.trim()
                    }
                };
            })
            .filter(Boolean);

        if (!questions.length) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: questions
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function debounce(callback, delay) {
        let timer = null;

        return function () {
            clearTimeout(timer);

            timer = setTimeout(function () {
                callback();
            }, delay);
        };
    }
})();