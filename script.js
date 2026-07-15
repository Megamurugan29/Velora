/* ========================================
   JAVASCRIPT FOR VELORABYMEGHA WEBSITE
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigationMenu();
    initSmoothScrolling();
    initContactForm();
    initProductInteractions();
    initLoadingAnimation();
    initScrollAnimations();
    initTouchOptimizations();
    initResponsiveOptimizations();
});

/* ========================================
   NAVIGATION MENU TOGGLE
   ======================================== */

/**
 * Initialize mobile hamburger menu functionality
 */
function initNavigationMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't intercept if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(href);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   CONTACT FORM HANDLING
   ======================================== */

/**
 * Initialize contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation
            if (!name.trim() || !email.trim() || !message.trim()) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            // Show success message
            showNotification('Thank you! Your message has been sent. We will get back to you soon!', 'success');

            // Reset form
            contactForm.reset();

            // In a real application, you would send the data to a server
            console.log('Form Data:', { name, email, message });
        });
    }
}

/* ========================================
   PRODUCT INTERACTIONS
   ======================================== */

/**
 * Initialize product card interactions
 */
function initProductInteractions() {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const quickViewButtons = document.querySelectorAll('.btn-icon');

    // Add to Cart button functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            // Show notification
            showNotification(
                `Added "${productName}" to cart! ${productPrice}`,
                'success'
            );

            // Add animation
            this.textContent = '✓ Added';
            this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 2000);

            console.log('Added to cart:', productName, productPrice);
        });
    });

    // Quick View button functionality
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;

            showNotification(`Viewing: ${productName}`, 'info');
            console.log('Quick view:', productName);
        });
    });
}

/* ========================================
   LOADING ANIMATION
   ======================================== */

/**
 * Initialize and hide loading screen
 */
function initLoadingAnimation() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (loadingScreen) {
        // Remove loading screen after initial load
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

/**
 * Initialize scroll-based animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards and category cards
    const cards = document.querySelectorAll('.product-card, .category-card, .about-features li');
    cards.forEach(card => {
        observer.observe(card);
    });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Show notification toast
 * @param {string} message - The message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    
    // Detect if mobile for positioning
    const isMobile = window.innerWidth <= 480;
    const positionStyles = isMobile 
        ? `bottom: 20px; left: 10px; right: 10px;`
        : `top: 20px; right: 20px;`;
    
    notification.style.cssText = `
        position: fixed;
        ${positionStyles}
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        z-index: 10000;
        max-width: 400px;
        margin-bottom: 10px;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Get notification color based on type
 * @param {string} type - Type of notification
 * @returns {string} Color value
 */
function getNotificationColor(type) {
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3'
    };
    return colors[type] || colors.info;
}

/**
 * Add animations to stylesheet dynamically
 */
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add dynamic animations to the page
addDynamicAnimations();

/* ========================================
   TOUCH & MOBILE OPTIMIZATIONS
   ======================================== */

/**
 * Initialize touch-friendly optimizations for mobile devices
 */
function initTouchOptimizations() {
    // Prevent double-tap zoom on buttons and links
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            // Double tap detected
            if (event.target.closest('button, a, [role=\"button\"]')) {
                event.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, false);

    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .product-card, .category-card');
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    // Improve form input experience on mobile
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Prevent iOS zoom on input focus
        input.addEventListener('touchstart', function(e) {
            if (this.getAttribute('type') === 'text' || this.tagName === 'TEXTAREA') {
                // Save current zoom level
                const initialZoom = document.body.style.zoom;
                document.body.style.zoom = '1';
                setTimeout(() => {
                    document.body.style.zoom = initialZoom || 'auto';
                }, 500);
            }
        }, { passive: true });

        // Ensure minimum height for touch targets
        if (input.offsetHeight < 44) {
            input.style.minHeight = '44px';
        }
    });

    // Prevent text selection on interactive elements during touch
    document.querySelectorAll('button, .btn, .nav-toggle').forEach(el => {
        el.style.WebkitUserSelect = 'none';
        el.style.userSelect = 'none';
        el.style.WebkitTouchCallout = 'none';
    });
}

/**
 * Initialize responsive optimizations based on viewport
 */
function initResponsiveOptimizations() {
    // Handle notch/safe area for devices like iPhone X+
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Adjust hero height for mobile
    const hero = document.querySelector('.hero');
    if (hero) {
        const adjustHeroHeight = () => {
            if (window.innerWidth <= 480) {
                // Use viewport height for better mobile experience
                hero.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
            } else {
                hero.style.minHeight = '100vh';
            }
        };

        adjustHeroHeight();
        window.addEventListener('resize', adjustHeroHeight);
        window.addEventListener('orientationchange', adjustHeroHeight);
    }

    // Fix navbar height calculation for mobile
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const updateNavHeight = () => {
            const navHeight = navbar.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
        };

        updateNavHeight();
        window.addEventListener('resize', updateNavHeight);
        window.addEventListener('orientationchange', updateNavHeight);
    }

    // Disable pinch zoom on mobile (except text selection)
    document.addEventListener('touchmove', function(event) {
        if (event.touches.length > 1) {
            // Only prevent if not trying to select text
            if (!window.getSelection().toString()) {
                event.preventDefault();
            }
        }
    }, { passive: false });
}

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', function(event) {
    // Close menu on Escape key
    if (event.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

/**
 * Lazy load images for better performance
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

/* ========================================
   STICKY NAVBAR EFFECT
   ======================================== */

/**
 * Update navbar styling based on scroll position
 */
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove shadow based on scroll position
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

/* ========================================
   LOCAL STORAGE FOR CART
   ======================================== */

/**
 * Cart management using localStorage
 */
const Cart = {
    /**
     * Get current cart from localStorage
     */
    getCart() {
        const cart = localStorage.getItem('veloraCart');
        return cart ? JSON.parse(cart) : [];
    },

    /**
     * Add item to cart
     */
    addItem(productName, price) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem('veloraCart', JSON.stringify(cart));
        console.log('Cart updated:', cart);
    },

    /**
     * Remove item from cart
     */
    removeItem(productName) {
        let cart = this.getCart();
        cart = cart.filter(item => item.name !== productName);
        localStorage.setItem('veloraCart', JSON.stringify(cart));
    },

    /**
     * Clear cart
     */
    clearCart() {
        localStorage.removeItem('veloraCart');
    },

    /**
     * Get cart total
     */
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('₹', ''));
            return total + (price * item.quantity);
        }, 0);
    }
};

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

/**
 * Enhance accessibility
 */
function enhanceAccessibility() {
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Add ARIA labels where needed
    const buttons = document.querySelectorAll('.btn-icon');
    buttons.forEach((button, index) => {
        if (!button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', `Quick view product ${index + 1}`);
        }
    });
}

// Initialize accessibility enhancements
enhanceAccessibility();

/* ========================================
   CONSOLE LOGGING FOR DEBUGGING
   ======================================== */

console.log('%cWelcome to VelorabyMegha! 👗', 'font-size: 20px; color: #c2185b; font-weight: bold;');
console.log('%cPremium Women\'s Kurti Boutique', 'font-size: 14px; color: #4a148c; font-weight: bold;');
console.log('%cEmail: VelorabyMegha@gmail.com | Phone: +91 7401393834', 'font-size: 12px; color: #666;');
console.log('%cThank you for visiting! Explore our elegant collection.', 'font-size: 12px; color: #666;');
