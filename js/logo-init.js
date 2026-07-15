/**
 * Logo Initialization Utility
 * ===========================
 * Automatically initializes brand logos throughout the site.
 * Only updates logos that don't already have a valid src attribute.
 */

function initializeBrandLogo() {
    // Find all elements with data-logo-src attribute
    const logoElements = document.querySelectorAll('[data-logo-src]');
    
    logoElements.forEach(element => {
        if (element.tagName === 'IMG') {
            // For img tags, only set src if it's not already set or is empty
            if (!element.src || element.src === '') {
                element.src = BRAND.logo;
                element.alt = `${BRAND.name} logo`;
                element.title = BRAND.name;
            }
        }
    });
    
    // Set favicon if available
    if (BRAND.favicon) {
        let faviconLink = document.querySelector("link[rel='icon']");
        if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
        }
        faviconLink.href = BRAND.favicon;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBrandLogo);
} else {
    // DOM is already loaded
    initializeBrandLogo();
}
