document.addEventListener('DOMContentLoaded', function () {

    // Initial fade-in for the body
    document.body.style.opacity = '1';

    // Initialize Lucide icons
    lucide.createIcons();

    // --- Mobile Menu Functionality ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileProductsButton = document.getElementById('mobile-products-button');
    const mobileProductsMenu = document.getElementById('mobile-products-menu');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');

    const closeMobileMenu = () => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    };

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileProductsButton && mobileProductsMenu) {
        mobileProductsButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileProductsMenu.classList.toggle('hidden');
            const icon = mobileProductsButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    }

    if (mainContent && mobileMenu) {
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                closeMobileMenu();
            }
        });

        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }


    // --- Desktop Products Dropdown Functionality ---
    const productsDropdownContainer = document.getElementById('products-dropdown-container');
    const productsDropdownMenu = document.getElementById('products-dropdown-menu');
    const productsArrowIcon = document.getElementById('products-arrow-icon');

    if (productsDropdownContainer) {
        productsDropdownContainer.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 1024) {
                if (productsDropdownMenu) {
                    productsDropdownMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                }
                if (productsArrowIcon) productsArrowIcon.style.transform = 'rotate(180deg)';
            }
        });

        productsDropdownContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 1024) {
                if (productsDropdownMenu) {
                    productsDropdownMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                }
                if (productsArrowIcon) productsArrowIcon.style.transform = 'rotate(0deg)';
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-Triggered Fade-In Animations ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        })
    };
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);


    // --- FINAL REVISED: ACTIVE NAVIGATION LINK LOGIC ---

    const allNavLinks = document.querySelectorAll('#main-nav a.nav-link');
    const productsDropdownButton = document.querySelector('#products-dropdown-button');
    const homeLink = document.querySelector('#main-nav a[href="https://emveeparkeasy.com"]');

    // Function to deactivate all navigation links
    const deactivateAllLinks = () => {
        allNavLinks.forEach(navLink => {
            navLink.classList.remove('text-brand-orange', 'font-bold');
            navLink.classList.add('text-gray-600', 'font-medium');
        });
    };

    // Function to activate a specific link
    const activateLink = (link) => {
        if (link) {
            deactivateAllLinks();
            link.classList.add('text-brand-orange', 'font-bold');
            link.classList.remove('text-gray-600', 'font-medium');
        }
    };

    // 1. Set Active Link on Page Load based on URL
    const setActiveLinkOnLoad = () => {
    const currentPage = window.location.pathname.split('/').pop();

    const dropdownLinks = document.querySelectorAll('.dropdown-product-link');
    dropdownLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    const productPages = [
        'two-post-stacker.html', 'four-post-stacker.html',
        'puzzle-parking.html', 'tower-parking.html',
        'stack-parking-systems-india.html'
    ];

    if (productPages.includes(currentPage)) {
        activateLink(productsDropdownButton);
    } else if (currentPage === 'blogs.html') {
        activateLink(document.querySelector('#main-nav a[href="blogs.html"]'));
    } else if (currentPage === 'https://emveeparkeasy.com' || currentPage === '') {
        activateLink(homeLink);
    } else if (currentPage.includes('#videos')) {
        activateLink(document.querySelector('#main-nav a[href="https://emveeparkeasy.com#videos"]'));
    } else if (currentPage.includes('#contact')) {
        activateLink(document.querySelector('#main-nav a[href="https://emveeparkeasy.com#contact"]'));
    } else if (currentPage.includes('#about')) {
        activateLink(document.querySelector('#main-nav a[href="https://emveeparkeasy.com#about"]'));
    }
};


    // 2. Conditionally apply Scrollspy ONLY on the homepage
    const sections = document.querySelectorAll('main section[id]');
    const isHomePage = window.location.pathname.endsWith('https://emveeparkeasy.com') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    if (sections.length > 0 && isHomePage) {
        const onScroll = () => {
            const headerOffset = 150;
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerOffset;
                if (window.scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // **THE FIX IS HERE**
            if (currentSectionId === 'products') {
                activateLink(productsDropdownButton);
            } else {
                const activeLink = document.querySelector(`#main-nav a[href="#${currentSectionId}"]`);
                if (activeLink) {
                    activateLink(activeLink);
                } else {
                    // Fallback to home link if no other section is active
                    activateLink(homeLink);
                }
            }
        };

        window.addEventListener('scroll', onScroll);
    }

    // Run page load logic after setting up scroll listeners
    setActiveLinkOnLoad();

    // --- FAQ Dropdown Functionality ---
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // ... (rest of the FAQ code is unchanged)
        });
    });

    // --- Number Counting Animation ---
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        // ... (rest of the counter code is unchanged)
    }
});