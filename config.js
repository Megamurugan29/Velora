/**
 * Brand Configuration
 * ==================
 * Centralized configuration for the VelorabyMegha brand.
 * Update these values to change brand-wide settings.
 * 
 * To change the logo: Update BRAND.logo value
 * Logo should be 1:1 aspect ratio for best results
 */

const BRAND = {
    name: "VelorabyMegha",
    tagline: "Luxury Mughal-Inspired Couture",
    logo: "assets/images/logo/butterfly-logo.svg",
    // Alternative: logo: "assets/images/logo/logo.png" (for PNG format)
    favicon: "assets/images/logo/butterfly-logo.svg",
    email: "VelorabyMegha@gmail.com",
    phone: "+91 7401393834",
    location: "Chennai, India",
    social: {
        facebook: "#",
        instagram: "#",
        pinterest: "#"
    }
};

/**
 * Usage Examples:
 * ==============
 * 
 * In HTML:
 * <img src="${BRAND.logo}" alt="${BRAND.name} logo" class="brand-logo" />
 * 
 * In JavaScript (after page load):
 * document.querySelectorAll('.brand-logo').forEach(logo => {
 *     logo.src = BRAND.logo;
 * });
 * 
 * In CSS (for background images):
 * background-image: url('${BRAND.logo}');
 */
