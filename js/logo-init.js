/**
 * Logo Initialization Utility
 * ===========================
 * Automatically initializes all brand logos throughout the site.
 * Call this after DOM is ready or in DOMContentLoaded event.
 */

function initializeBrandLogo() {
    // Find all elements with data-logo-src attribute
    const logoElements = document.querySelectorAll('[data-logo-src]');
    
    logoElements.forEach(element => {
        if (element.tagName === 'IMG') {
            // For img tags, set the src directly
            element.src = BRAND.logo;
            element.alt = `${BRAND.name} logo`;
            element.title = BRAND.name;
        } else if (element.tagName === 'A' || element.classList.contains('nav-logo')) {
            // For logo containers, find the img child and update
            const img = element.querySelector('img');
            if (img) {
                img.src = BRAND.logo;
                img.alt = `${BRAND.name} logo`;
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
