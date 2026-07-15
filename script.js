/* ========================================
   VELORABYMEGHA - LUXURY BOUTIQUE JAVASCRIPT
   Complete Interactive Experience
   ======================================== */

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initNavigationMenu();
    initProfileDropdown();
    initWishlistIcon();
    initSmoothScrolling();
    initContactForm();
    initProductFilters();
    initLoadingAnimation();
    initScrollAnimations();
    initProductInteractions();
    initTouchOptimizations();
    initResponsiveOptimizations();
});

/* ========================================
   NAVIGATION
   ======================================== */

function initNavigationMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle) return;

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Sticky navbar effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 30px rgba(15, 15, 15, 0.25)';
        } else {
            navbar.style.boxShadow = '0 8px 30px rgba(15, 15, 15, 0.15)';
        }
    });
}

/* ========================================
   PROFILE DROPDOWN
   ======================================== */

function initProfileDropdown() {
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const mobileProfileBtn = document.getElementById('mobileProfileBtn');

    if (!profileToggle || !profileDropdown) return;

    // Desktop profile button
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        if (profileToggle.getAttribute('aria-expanded') === 'false') {
            profileToggle.setAttribute('aria-expanded', 'true');
        } else {
            profileToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Mobile profile button
    if (mobileProfileBtn) {
        mobileProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
            if (profileToggle) {
                profileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close dropdown when a link is clicked
    const dropdownItems = profileDropdown.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            profileDropdown.classList.remove('active');
            if (profileToggle) {
                profileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Keyboard accessibility (Escape to close)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
            if (profileToggle) {
                profileToggle.setAttribute('aria-expanded', 'false');
                profileToggle.focus();
            }
        }
    });
}

/* ========================================
   WISHLIST ICON
   ======================================== */

function initWishlistIcon() {
    const wishlistToggle = document.getElementById('wishlistToggle');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const mobileWishlist = document.getElementById('mobileWishlist');

    if (!wishlistToggle) return;

    // Get wishlist count from localStorage
    function updateWishlistBadge() {
        const wishlist = JSON.parse(localStorage.getItem('veloraWishlist') || '[]');
        const count = wishlist.length;
        if (wishlistBadge) {
            wishlistBadge.textContent = count;
            if (count === 0) {
                wishlistBadge.style.display = 'none';
            } else {
                wishlistBadge.style.display = 'flex';
            }
        }
    }

    // Initialize badge
    updateWishlistBadge();

    // Add event listener for wishlist changes
    window.addEventListener('wishlistUpdated', updateWishlistBadge);

    // Desktop wishlist link
    wishlistToggle.addEventListener('click', function(e) {
        e.preventDefault();
        // Navigate to wishlist page (you can create this later)
        // For now, just show the count or navigate to a placeholder
        window.location.href = 'shop/wishlist.html';
    });

    // Mobile wishlist link
    if (mobileWishlist) {
        mobileWishlist.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                window.location.href = 'shop/wishlist.html';
            }
        });
    }
}

/* ========================================
   SMOOTH SCROLLING
   ======================================== */

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   CONTACT FORM
   ======================================== */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill all fields', 'error');
                return;
            }

            // Show success message
            showNotification('Message sent successfully! We will contact you soon.', 'success');
            this.reset();
        });
    }
}

/* ========================================
   PRODUCT FILTERING
   ======================================== */

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.luxury-product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter products
            productCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.animation = 'elegantEntrance 0.6s ease-out';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ========================================
   PRODUCT INTERACTIONS
   ======================================== */

function initProductInteractions() {
    const quickViewBtns = document.querySelectorAll('.btn-luxury-view');
    const wishlistBtns = document.querySelectorAll('.btn-luxury-heart');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productTitle = this.closest('.luxury-product-card').querySelector('.product-title').textContent;
            showNotification(`Quick viewing: ${productTitle}`, 'info');
        });
    });

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            const isWishlisted = this.textContent === '♥';
            showNotification(
                isWishlisted ? 'Added to Wishlist ♥' : 'Removed from Wishlist',
                'success'
            );
        });
    });
}

/* ========================================
   CART FUNCTIONALITY
   ======================================== */

function addToCart(product) {
    // Initialize cart if not already loaded
    if (typeof window.cart === 'undefined') {
        window.cart = [];
    }
    
    // Check if product already in cart
    const existingItem = window.cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        window.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(window.cart));
    
    // Show notification
    showNotification(
        `✓ "${product.name}" added to cart (₹${product.price})`,
        'success'
    );

    // Trigger cart animation
    const event = new CustomEvent('itemAdded', {
        detail: { name: product.name, price: product.price, id: product.id }
    });
    document.dispatchEvent(event);

    console.log('Added to cart:', product.name, '₹' + product.price);
    
    // Navigate to cart page after 1.5 seconds to allow notification to show
    setTimeout(function() {
        window.location.href = 'shop/cart.html';
    }, 1500);
}

/* ========================================
   NOTIFICATIONS
   ======================================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const isMobile = window.innerWidth <= 480;
    const positionStyles = isMobile 
        ? `bottom: 20px; left: 10px; right: 10px;`
        : `top: 20px; right: 20px;`;
    
    notification.style.cssText = `
        position: fixed;
        ${positionStyles}
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        z-index: 10000;
        animation: slideInNotification 0.3s ease;
        max-width: 90vw;
        word-wrap: break-word;
        font-family: 'Poppins', sans-serif;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to style
if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
        @keyframes slideInNotification {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutNotification {
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

/* ========================================
   LOADING ANIMATION
   ======================================== */

function initLoadingAnimation() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1500);
    }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */

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

    // Observe cards
    const cards = document.querySelectorAll(
        '.luxury-product-card, .featured-card, .about-card, .heritage-features li'
    );
    cards.forEach(card => observer.observe(card));
}

/* ========================================
   TOUCH OPTIMIZATIONS
   ======================================== */

function initTouchOptimizations() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            if (event.target.closest('button, a, [role="button"]')) {
                event.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, false);

    const interactiveElements = document.querySelectorAll(
        'button, a, .luxury-product-card, .featured-card'
    );
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

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.offsetHeight < 44) {
            input.style.minHeight = '44px';
        }
    });

    document.querySelectorAll('button, .btn').forEach(el => {
        el.style.WebkitUserSelect = 'none';
        el.style.userSelect = 'none';
    });
}

/* ========================================
   RESPONSIVE OPTIMIZATIONS
   ======================================== */

function initResponsiveOptimizations() {
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    const hero = document.querySelector('.hero');
    if (hero) {
        const adjustHeroHeight = () => {
            if (window.innerWidth <= 480) {
                hero.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
            } else {
                hero.style.minHeight = '100vh';
            }
        };

        adjustHeroHeight();
        window.addEventListener('resize', adjustHeroHeight);
        window.addEventListener('orientationchange', adjustHeroHeight);
    }

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const updateNavHeight = () => {
            const navHeight = navbar.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
        };

        updateNavHeight();
        window.addEventListener('resize', updateNavHeight);
    }

    document.addEventListener('touchmove', function(event) {
        if (event.touches.length > 1) {
            if (!window.getSelection().toString()) {
                event.preventDefault();
            }
        }
    }, { passive: false });
}

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

/* ========================================
   LAZY LOADING
   ======================================== */

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

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
window.addEventListener('scroll', debounce(function() {
    // Any scroll-based functionality
}, 100), { passive: true });
