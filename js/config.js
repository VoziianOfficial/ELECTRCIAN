'use strict';

window.SITE_CONFIG = {
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

        serviceArea:
            'Independent electrical provider matching across selected areas in the United States'
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
        {
            label: 'Home',
            href: 'index.html'
        },
        {
            label: 'Services',
            href: 'services.html'
        },
        {
            label: 'About',
            href: 'about.html'
        },
        {
            label: 'Contact',
            href: 'contact.html'
        }
    ],

    services: [
        {
            id: 'electrical-repair',
            title: 'Electrical Repair',
            shortTitle: 'Repair',
            href: 'electrical-repair.html',
            image: 'assets/images/electrical-repair.jpg',
            icon: 'fa-screwdriver-wrench',

            heroTitle: 'Electrical Repair Provider Options',
            heroText:
                'Compare local provider options for outlet issues, switch problems, flickering lights, tripped breakers, power concerns, and electrical troubleshooting.',

            summary:
                'Compare local providers for common electrical troubleshooting, outlet issues, breaker concerns, and power problems.',

            pageIntro:
                'Electrical repair needs can range from simple outlet replacement to more serious power issues. Electrcian helps homeowners organize the project category and compare independent local provider options before choosing who to contact directly.',

            comparePoints: [
                'Issue type and visible symptoms',
                'Breaker or panel-related concerns',
                'Possible diagnostic or service call fee',
                'Timeline and urgency',
                'Written quote details',
                'License and insurance verification'
            ],

            complexity: {
                simple: 'Outlet replacement, switch updates, light fixture problems',
                medium: 'Repeated breaker trips, flickering lights, partial power loss',
                advanced: 'Panel-related repair needs, multiple affected circuits',
                urgent: 'Burning smell, exposed wiring, hot outlets, major power loss'
            },

            faq: [
                {
                    question: 'Does Electrcian repair electrical issues directly?',
                    answer:
                        'No. Electrcian is an independent provider-matching platform. Homeowners compare independent electrical provider options and choose who to contact directly.'
                },
                {
                    question: 'What should I compare for an electrical repair quote?',
                    answer:
                        'Compare the diagnostic process, service call fee, labor scope, parts or materials, timeline, warranty terms, and whether the provider is properly licensed and insured.'
                },
                {
                    question: 'When is an electrical issue urgent?',
                    answer:
                        'Burning smells, hot outlets, exposed wiring, repeated breaker failures, sparks, or major power loss may require urgent attention from a qualified local provider.'
                },
                {
                    question: 'Should I verify license and insurance?',
                    answer:
                        'Yes. Homeowners should always verify license, insurance, permits if needed, quote details, and warranty terms before hiring any provider.'
                }
            ]
        },

        {
            id: 'panel-upgrades',
            title: 'Panel Upgrades',
            shortTitle: 'Panels',
            href: 'panel-upgrades.html',
            image: 'assets/images/panel-upgrades.jpg',
            icon: 'fa-table-columns',

            heroTitle: 'Panel Upgrade Provider Options',
            heroText:
                'Review provider options for electrical panel replacement, added capacity, breaker panel updates, EV readiness, and permit-related quote details.',

            summary:
                'Review provider options for electrical panel replacement, capacity upgrades, and modern power distribution needs.',

            pageIntro:
                'Panel upgrade projects may involve capacity planning, permit questions, breaker replacement, added circuits, and compatibility with future electrical loads. Electrcian helps homeowners compare provider options without performing the work directly.',

            comparePoints: [
                'Current panel capacity',
                'Added circuit needs',
                'Permit and inspection notes',
                'EV charger readiness',
                'Material and labor scope',
                'Timeline and warranty terms'
            ],

            complexity: {
                simple: 'Breaker replacement or basic panel review',
                medium: 'Added circuits or capacity planning',
                advanced: 'Full panel replacement or service upgrade',
                urgent: 'Panel heat, burning smell, repeated breaker failure'
            },

            faq: [
                {
                    question: 'Does Electrcian install or replace panels?',
                    answer:
                        'No. Electrcian helps homeowners compare independent local provider options. Any panel work is performed by providers chosen directly by the homeowner.'
                },
                {
                    question: 'What affects panel upgrade pricing?',
                    answer:
                        'Pricing may depend on panel size, existing wiring, permit needs, service capacity, added circuits, labor scope, materials, and local provider availability.'
                },
                {
                    question: 'Can panel upgrades require permits?',
                    answer:
                        'Yes, panel work may require permits and inspections depending on local rules. Homeowners should confirm permit handling with each provider.'
                },
                {
                    question: 'Should I compare more than one quote?',
                    answer:
                        'Comparing provider options can help homeowners understand scope, materials, timelines, service call fees, and warranty differences.'
                }
            ]
        },

        {
            id: 'wiring-rewiring',
            title: 'Wiring & Rewiring',
            shortTitle: 'Wiring',
            href: 'wiring-rewiring.html',
            image: 'assets/images/wiring-rewiring.jpg',
            icon: 'fa-plug-circle-bolt',

            heroTitle: 'Wiring & Rewiring Provider Options',
            heroText:
                'Compare companies for new wiring, rewiring, circuit planning, remodel electrical updates, outdoor wiring, and smart home wiring needs.',

            summary:
                'Compare companies for new wiring, rewiring, circuit planning, and electrical layout updates.',

            pageIntro:
                'Wiring and rewiring projects may involve safety considerations, local code requirements, access limitations, and detailed quote planning. Electrcian helps homeowners compare independent provider options and prepare better questions before choosing directly.',

            comparePoints: [
                'New wiring or rewiring scope',
                'Circuit planning',
                'Wall access and repair expectations',
                'Permit or inspection requirements',
                'Materials and timeline',
                'Warranty and workmanship terms'
            ],

            complexity: {
                simple: 'Small circuit updates or fixture wiring',
                medium: 'Room remodel wiring or outdoor wiring',
                advanced: 'Whole-home rewiring or major circuit planning',
                urgent: 'Exposed wiring, burning smell, unsafe old wiring'
            },

            faq: [
                {
                    question: 'Does Electrcian perform wiring work?',
                    answer:
                        'No. Electrcian does not perform electrical work directly. The platform helps homeowners compare independent local provider options.'
                },
                {
                    question: 'What should be included in a wiring quote?',
                    answer:
                        'A clear wiring quote may include labor scope, materials, circuit notes, access requirements, permit details, timeline, cleanup expectations, and warranty terms.'
                },
                {
                    question: 'Can old wiring require inspection?',
                    answer:
                        'Older wiring may require professional review, code consideration, or permit-related steps depending on the home and local requirements.'
                },
                {
                    question: 'Why compare providers for rewiring?',
                    answer:
                        'Rewiring can vary widely in scope and complexity. Comparing providers helps homeowners review approach, timeline, quote clarity, and verification details.'
                }
            ]
        },

        {
            id: 'ev-charger-installation',
            title: 'EV Charger Installation',
            shortTitle: 'EV Chargers',
            href: 'ev-charger-installation.html',
            image: 'assets/images/ev-charger.jpg',
            icon: 'fa-car-battery',

            heroTitle: 'EV Charger Installation Provider Options',
            heroText:
                'Explore provider options for Level 2 charger setup, dedicated circuits, charger location, panel capacity, permit notes, and quote comparison.',

            summary:
                'Explore local provider options for home EV charger setup, circuit review, panel readiness, and quote comparison.',

            pageIntro:
                'EV charger installation may involve panel capacity review, dedicated circuit planning, charger placement, permit questions, and compatibility with the home electrical system. Electrcian helps homeowners compare independent provider options.',

            comparePoints: [
                'Charger type and location',
                'Dedicated circuit needs',
                'Panel capacity',
                'Permit and inspection notes',
                'Labor and material scope',
                'Warranty and timeline'
            ],

            complexity: {
                simple: 'Charger replacement or short-distance installation',
                medium: 'Dedicated circuit planning and garage installation',
                advanced: 'Panel capacity upgrades or longer wiring runs',
                urgent: 'Unsafe wiring, overheated outlet, incorrect charger setup'
            },

            faq: [
                {
                    question: 'Does Electrcian install EV chargers?',
                    answer:
                        'No. Electrcian is an independent provider-matching platform. Homeowners compare local provider options and contact the provider they choose directly.'
                },
                {
                    question: 'What should I compare for EV charger installation?',
                    answer:
                        'Compare panel readiness, dedicated circuit requirements, charger location, permit handling, labor scope, materials, timeline, and warranty terms.'
                },
                {
                    question: 'Can an EV charger require a panel upgrade?',
                    answer:
                        'Sometimes. A provider may review current panel capacity and determine whether added capacity or other updates are needed.'
                },
                {
                    question: 'Do permits apply to EV charger installation?',
                    answer:
                        'Permit requirements vary by location. Homeowners should ask each provider about permits, inspections, and local requirements before hiring.'
                }
            ]
        }
    ],

    forms: {
        contactTitle: 'Request electrical provider options',
        contactIntro:
            'Share a few details and compare electrical provider options in your area.',
        successMessage:
            'Thank you. Your request has been prepared for provider comparison.',
        errorMessage:
            'Please check the highlighted fields before sending.',

        consentText:
            'By submitting, you agree that Electrcian may help organize your request for independent provider comparison. Provider availability, pricing, and response times may vary.'
    },

    cookieBanner: {
        storageKey: 'electrcian_cookie_choice',
        title: 'Cookie preferences',
        text:
            'This website may use basic storage to remember your cookie preference and improve browsing experience.',
        acceptText: 'Accept',
        declineText: 'Decline'
    },

    quoteClarity: [
        'Labor scope',
        'Materials',
        'Panel / circuit notes',
        'Permit notes',
        'Timeline',
        'Service call fee',
        'Warranty terms'
    ],

    complexityScale: [
        {
            title: 'Simple',
            text: 'Outlet replacement, switch updates, light fixture installation',
            icon: 'fa-toggle-on'
        },
        {
            title: 'Medium',
            text: 'New circuits, outdoor lighting, smart home wiring',
            icon: 'fa-plug-circle-bolt'
        },
        {
            title: 'Advanced',
            text: 'Panel upgrades, rewiring, EV charger installation',
            icon: 'fa-table-columns'
        },
        {
            title: 'Urgent',
            text: 'Power loss, burning smell, breaker failure, exposed wiring',
            icon: 'fa-triangle-exclamation'
        }
    ],

    objectTabs: [
        {
            id: 'charger',
            label: 'Charger',
            image: 'assets/images/ev-charger.jpg',
            title: 'EV charger project details',
            text:
                'EV charger projects may involve charger location, dedicated circuit planning, panel capacity review, permit notes, and quote comparison.',
            compare: [
                'Panel capacity',
                'Dedicated circuit needs',
                'Charger location',
                'Permit handling',
                'Warranty terms'
            ]
        },
        {
            id: 'cord',
            label: 'Cord',
            image: 'assets/images/electrical-tools.jpg',
            title: 'Cord, outlet, and load concerns',
            text:
                'Outlet and cord-related needs can involve load safety, outlet condition, replacement scope, and provider diagnostic details.',
            compare: [
                'Outlet condition',
                'Load requirements',
                'Repair scope',
                'Service call fee',
                'Timeline'
            ]
        },
        {
            id: 'wire',
            label: 'Wire',
            image: 'assets/images/wiring-rewiring.jpg',
            title: 'Wiring and rewiring context',
            text:
                'Wiring projects may involve access needs, circuit planning, code considerations, materials, and inspection questions.',
            compare: [
                'Circuit planning',
                'Material scope',
                'Wall access',
                'Permit notes',
                'Warranty terms'
            ]
        },
        {
            id: 'light-bulb',
            label: 'Light Bulb',
            image: 'assets/images/lighting-detail.jpg',
            title: 'Lighting project comparison',
            text:
                'Lighting projects may include fixture type, indoor or outdoor location, switch controls, dimmer compatibility, and timeline.',
            compare: [
                'Fixture type',
                'Indoor or outdoor location',
                'Switch controls',
                'Timeline',
                'Quote clarity'
            ]
        },
        {
            id: 'battery',
            label: 'Battery',
            image: 'assets/images/quote-clarity.jpg',
            title: 'Power readiness and backup questions',
            text:
                'Power-related projects may require provider review of load needs, circuit conditions, panel readiness, and safety details.',
            compare: [
                'Power load',
                'Panel readiness',
                'Circuit notes',
                'Safety concerns',
                'Provider availability'
            ]
        },
        {
            id: 'panel',
            label: 'Panel',
            image: 'assets/images/breaker-panel.jpg',
            title: 'Panel and breaker considerations',
            text:
                'Panel-related projects can involve capacity, breaker layout, permit notes, service upgrade questions, and warranty terms.',
            compare: [
                'Panel capacity',
                'Breaker layout',
                'Permit requirements',
                'Upgrade scope',
                'Warranty coverage'
            ]
        }
    ],

    faqs: {
        general: [
            {
                question: 'How do I compare local electrical providers?',
                answer:
                    'Start by identifying your project type, location, urgency, and the details you want included in a quote. Then compare independent provider options, scope, timeline, fees, and verification details.'
            },
            {
                question: 'Does Electrcian perform electrical work directly?',
                answer:
                    'No. Electrcian is an independent provider-matching platform and does not perform electrical work directly.'
            },
            {
                question: 'What should I ask before choosing a provider?',
                answer:
                    'Ask about license, insurance, permits, labor scope, materials, service call fees, timeline, warranty terms, and whether the quote is written.'
            },
            {
                question: 'Are provider responses guaranteed?',
                answer:
                    'No. Provider availability, pricing, service areas, and response times may vary by location and project category.'
            }
        ],

        contact: [
            {
                question: 'What happens after I submit a request?',
                answer:
                    'Your details can be organized for provider comparison. Electrcian does not guarantee response times, prices, or provider availability.'
            },
            {
                question: 'Is Electrcian an electrical contractor?',
                answer:
                    'No. Electrcian is not an electrical contractor and does not perform, supervise, or guarantee electrical work.'
            },
            {
                question: 'Should I still verify providers?',
                answer:
                    'Yes. Homeowners are responsible for verifying license, insurance, permits, quote details, and warranty terms before hiring.'
            },
            {
                question: 'Can I request help if I am not sure what project type I need?',
                answer:
                    'Yes. You can choose “Not sure yet” and describe the issue so provider options can be compared by category and fit.'
            }
        ]
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
            description:
                'Compare local electrical repair provider options for outlets, switches, breakers, flickering lights, and power concerns.'
        },

        'panel-upgrades.html': {
            title: 'Panel Upgrade Provider Options | Electrcian',
            description:
                'Compare provider options for panel upgrades, breaker panel replacement, capacity needs, and permit-related quote details.'
        },

        'wiring-rewiring.html': {
            title: 'Wiring & Rewiring Provider Options | Electrcian',
            description:
                'Compare wiring and rewiring provider options for new circuits, remodel wiring, outdoor wiring, and electrical layout updates.'
        },

        'ev-charger-installation.html': {
            title: 'EV Charger Installation Provider Options | Electrcian',
            description:
                'Compare provider options for EV charger installation, dedicated circuits, panel readiness, and permit notes.'
        },

        'privacy-policy.html': {
            title: 'Privacy Policy | Electrcian',
            description:
                'Read the Electrcian privacy policy for information about website data, contact requests, and provider comparison support.'
        },

        'cookie-policy.html': {
            title: 'Cookie Policy | Electrcian',
            description:
                'Read the Electrcian cookie policy and learn how basic storage may be used for cookie preferences.'
        },

        'terms-of-service.html': {
            title: 'Terms of Service | Electrcian',
            description:
                'Read the Electrcian terms of service for this independent electrical provider matching website.'
        }
    }
};