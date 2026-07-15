# VelorabyMegha - Premium Product Image Integration Guide

## 🎯 Overview

This guide explains how to generate, organize, and integrate premium product images for the Velora by Megha luxury ethnic fashion boutique website. The system is designed to automatically display product images across all pages (Shop, Cart, Checkout, Wishlist) once images are added to the designated folders.

---

## 📁 Folder Structure

All product images are organized in: **`images/products/`**

```
images/products/
├── main/                    # Main product card images (required)
│   ├── PROD-001-main.jpg
│   ├── PROD-002-main.jpg
│   ├── PROD-003-main.jpg
│   ├── PROD-004-main.jpg
│   ├── PROD-005-main.jpg
│   └── PROD-006-main.jpg
│
├── details/                 # Multiple view angles (recommended)
│   ├── PROD-001-front.jpg
│   ├── PROD-001-side.jpg
│   ├── PROD-001-back.jpg
│   ├── PROD-001-dupatta.jpg
│   ├── PROD-001-fabric.jpg
│   ├── PROD-002-front.jpg
│   ├── PROD-002-side.jpg
│   ├── PROD-002-back.jpg
│   ├── PROD-002-dupatta.jpg
│   ├── PROD-002-fabric.jpg
│   ├── ... (repeat for all 6 products)
│
├── embroidery/              # Close-up detail shots (optional but recommended)
│   ├── PROD-001-embroidery.jpg
│   ├── PROD-002-embroidery.jpg
│   ├── PROD-003-embroidery.jpg
│   ├── PROD-004-embroidery.jpg
│   ├── PROD-005-embroidery.jpg
│   └── PROD-006-embroidery.jpg
│
├── collections/             # Collection-level images (future use)
│   └── (for organizing images by collection type)
│
└── placeholder-kurti.svg    # Fallback image (already exists)
```

---

## 🔢 Product ID Reference

| Product ID | Product Name | Color | Fabric | Category |
|-----------|-------------|-------|--------|----------|
| PROD-001 | Royal Silk Kurti - Emerald | Emerald Green | Silk | Royal Collection |
| PROD-002 | Premium Silk Kurti - Maroon | Maroon/Wine | Silk | Premium Collection |
| PROD-003 | Festive Gold Kurti | Champagne Gold | Blend | Festive Collection |
| PROD-004 | Casual Cotton Kurti - Ivory | Ivory/Cream | Cotton | Casual Collection |
| PROD-005 | Royal Blue Silk Kurti | Sapphire Blue | Silk | Royal Collection |
| PROD-006 | Premium Georgette Kurti | Maroon/Wine | Georgette | Premium Collection |

---

## 📋 Image Naming Convention

**Format:** `PROD-###-{ViewType}.{extension}`

### Naming Rules:
- Always start with `PROD-` followed by zero-padded 3-digit ID (001-006)
- Use hyphen separator between ID and view type
- View types: `main`, `front`, `side`, `back`, `dupatta`, `fabric`, `embroidery`
- Use lowercase for all filenames
- Use `.jpg` extension (highly recommended for smaller file sizes)
- Dimensions: **800x1000px minimum** for main images, **600x800px** for detail images

### Valid Examples:
✅ `PROD-001-main.jpg`
✅ `PROD-001-front.jpg`
✅ `PROD-001-embroidery.jpg`
✅ `PROD-006-fabric.jpg`

### Invalid Examples:
❌ `PROD-1-main.jpg` (needs zero-padding)
❌ `prod-001-main.jpg` (must be uppercase)
❌ `PROD_001_main.jpg` (use hyphens, not underscores)
❌ `Royal_Silk_Emerald.jpg` (use product IDs)

---

## 🎨 Image Specifications

### Main Product Images (PROD-###-main.jpg)
- **Purpose:** Display on shop product cards and cart
- **Dimensions:** 800x1000px (4:5 aspect ratio)
- **DPI:** 72 DPI (web standard)
- **File Size:** 150-300KB per image
- **Format:** JPG (80-85% quality)
- **Content:** Full-body kurti view, front-facing, model centered, professional studio background
- **Location:** `images/products/main/`

### Detail Views (PROD-###-front.jpg, PROD-###-side.jpg, PROD-###-back.jpg)
- **Purpose:** Product detail/gallery pages (future enhancement)
- **Dimensions:** 600x800px (3:4 aspect ratio)
- **File Size:** 80-150KB per image
- **Format:** JPG (80% quality)
- **Content:** 
  - Front: Frontal view of kurti
  - Side: Side profile view
  - Back: Rear view of kurti
- **Location:** `images/products/details/`

### Fabric Texture (PROD-###-fabric.jpg)
- **Purpose:** Show premium fabric quality and texture
- **Dimensions:** 400x400px (1:1 square)
- **File Size:** 50-100KB
- **Content:** Close-up of fabric texture, proper lighting to show weave
- **Location:** `images/products/details/`

### Dupatta Detail (PROD-###-dupatta.jpg)
- **Purpose:** Showcase matching dupatta/scarf
- **Dimensions:** 500x600px
- **File Size:** 60-120KB
- **Content:** Dupatta draped or laid out, showing drape, pattern, embroidery
- **Location:** `images/products/details/`

### Embroidery Close-up (PROD-###-embroidery.jpg)
- **Purpose:** Highlight premium embroidery and craftsmanship
- **Dimensions:** 600x600px (1:1 square)
- **File Size:** 80-150KB
- **Content:** Detailed close-up of zari work, beadwork, thread embroidery, or hand-block print
- **Location:** `images/products/embroidery/`

---

## 🖼️ Premium Photography Requirements

### Model & Styling
- ✅ Professional female model with Indian appearance
- ✅ Elegant, natural pose (standing, slight angle)
- ✅ Natural, confident expression
- ✅ Proper makeup (subtle, complementing kurti color)
- ✅ Traditional jewelry (bangles, necklace if appropriate)

### Lighting & Background
- ✅ Soft, diffused lighting (no harsh shadows)
- ✅ Golden/warm lighting for luxury feel
- ✅ Neutral luxury background (white, cream, soft blur)
- ✅ Professional studio quality
- ✅ Consistent across all product images

### Colors & Details
- ✅ True color representation of kurti
- ✅ Clear visibility of embroidery/embellishments
- ✅ Dupatta visible (if applicable)
- ✅ Natural fabric drape
- ✅ Premium, high-end appearance

---

## 🎯 AI Image Generation Prompts

Use these detailed prompts with DALL-E 3, Midjourney, Stable Diffusion, or Adobe Firefly:

### PROD-001: Royal Silk Kurti - Emerald

```
Generate a luxury fashion photograph of a professional Indian female model wearing an 
emerald green premium silk kurti with intricate Mughal-inspired embroidery. 
The kurti features detailed golden zari work and traditional patterns inspired by palace 
architecture. Include a matching gold-embroidered dupatta. 
Soft golden studio lighting, neutral cream background, elegant pose, 
professional boutique photography, high-end catalog style, 
800x1000px, sharp focus, 8k quality.
Key details: Deep emerald silk, gold thread embroidery, Mughal motifs, 
flowing fabric with proper drape.
```

### PROD-002: Premium Silk Kurti - Maroon

```
Generate a luxury fashion photograph of a professional Indian female model wearing a 
deep maroon/wine silk kurti with elegant draping and subtle embroidery. 
Premium fabric with rich color and natural silk sheen. Include a coordinating dupatta. 
Soft warm lighting, neutral background, elegant standing pose, 
professional boutique catalog style, 800x1000px, sharp focus, 8k quality.
Key details: Deep maroon silk, elegant drape, subtle embroidery, luxurious feel, 
premium fabrics visible, traditional kurti set.
```

### PROD-003: Festive Gold Kurti

```
Generate a luxury fashion photograph of a professional Indian female model wearing a 
champagne gold kurti set perfect for festivals with traditional Mughal patterns 
and gold accents throughout. The kurti features heavy embroidery with zari, 
mirror work, and traditional borders. Includes matching gold-embroidered dupatta. 
Festive styling with subtle jewelry. Soft golden studio lighting, 
neutral cream background, 800x1000px, professional boutique quality, 8k.
Key details: Champagne/champagne gold color, Mughal motifs, mirror work, 
traditional borders, festive appearance, premium embroidery.
```

### PROD-004: Casual Cotton Kurti - Ivory

```
Generate a luxury fashion photograph of a professional Indian female model wearing 
an ivory/cream cotton kurti set designed for everyday casual wear. 
The kurti features comfortable fit, subtle embroidery or print detailing, 
and breathable fabric appearance. Include a simple coordinating dupatta. 
Warm, soft studio lighting, neutral background, relaxed elegant pose, 
professional boutique catalog, 800x1000px, 8k quality.
Key details: Ivory/cream color, breathable cotton fabric, comfortable fit, 
subtle embroidery, everyday wear, premium cotton quality.
```

### PROD-005: Royal Blue Silk Kurti

```
Generate a luxury fashion photograph of a professional Indian female model wearing a 
regal sapphire blue silk kurti with intricate beadwork and embroidery. 
The kurti features premium silk with beautiful sheen, traditional patterns, 
and detailed beading work. Include a matching blue dupatta with beaded borders. 
Soft golden lighting highlighting the beadwork, neutral backdrop, 800x1000px, 
professional luxury boutique style, 8k quality.
Key details: Sapphire/royal blue silk, intricate beadwork, premium sheen, 
traditional embroidery, regal appearance, luxury fabrics.
```

### PROD-006: Premium Georgette Kurti

```
Generate a luxury fashion photograph of a professional Indian female model wearing a 
deep maroon georgette kurti with flowing, elegant design and traditional prints. 
The georgette fabric shows beautiful flow and drape. Features traditional 
embroidery and block print patterns. Include a coordinating printed dupatta. 
Soft studio lighting showing fabric movement, neutral background, 
professional pose, boutique catalog style, 800x1000px, 8k quality.
Key details: Maroon georgette fabric, flowing design, traditional block print, 
elegant drape, premium georgette quality, traditional patterns.
```

### Detail Views - General Instructions

**For Front/Side/Back Views:**
```
Generate professional fashion photography of an Indian woman modeling 
[COLOR] [FABRIC] kurti from [ANGLE] view. Studio photography, 
500x800px, consistent with main product image style.
```

**For Embroidery Close-ups:**
```
Generate professional close-up photograph of premium Indian embroidery detail 
on [COLOR] silk/cotton showing [EMBROIDERY TYPE: zari work/beadwork/thread embroidery]. 
Detailed craftsmanship, macro photography, 600x600px, studio quality, 8k.
```

**For Fabric Texture:**
```
Generate macro photography of premium [FABRIC TYPE] fabric texture 
in [COLOR], showing weave and quality. Close-up textile photography, 
professional quality, 400x400px, studio lighting.
```

---

## 🚀 How Images Auto-Connect to Pages

The website automatically displays product images across all pages through the product data system:

### 1. **Shop Page** (`shop/products.html`)
- Displays `PROD-###-main.jpg` on each product card
- Falls back to `placeholder-kurti.svg` if image missing

### 2. **Shopping Cart** (`shop/cart.html`)
- Displays `PROD-###-main.jpg` next to product details
- Shows product name, price, and quantity
- Images auto-update when cart contents change

### 3. **Checkout** (`shop/checkout.html`)
- Shows `PROD-###-main.jpg` in order summary panel
- Displays product details alongside image

### 4. **Wishlist** (Future enhancement)
- Will display `PROD-###-main.jpg` for wishlist items

### 5. **Product Details** (Future enhancement)
- Main image: `PROD-###-main.jpg`
- Gallery: Front, side, back views
- Close-ups: Embroidery and fabric details
- All connected automatically

---

## 📥 Steps to Add Images

### Step 1: Prepare Your Images
1. Generate or obtain premium product images
2. Ensure they meet the specifications listed above
3. Name them according to convention: `PROD-###-{ViewType}.jpg`
4. Export as JPG with 80-85% quality

### Step 2: Organize Images
1. Place main images in `images/products/main/`
2. Place detail views in `images/products/details/`
3. Place embroidery close-ups in `images/products/embroidery/`
4. Create subdirectories if needed for collections

### Step 3: Verify File Structure
```powershell
# Run this command to verify your image organization:
cd c:\site\images\products
ls -Recurse *.jpg | Select-Object FullName
```

### Step 4: Test Images
1. Navigate to `shop/products.html` in your browser
2. Verify images display correctly on product cards
3. Add product to cart and verify image shows in cart
4. Check on mobile breakpoints (320px, 480px, 768px, 1440px)

### Step 5: Verify Fallback Behavior
1. Temporarily rename a main image
2. Verify placeholder image displays
3. Restore the image name
4. Verify correct image re-appears

---

## 🔧 System Architecture

### How It Works:

**1. Data Layer** (`data/products.json`)
- Contains image path mappings for each product
- Includes main, detail, embroidery, and fabric texture paths
- Includes fallback placeholder path

**2. JavaScript Layer** (`js/products.js` & `js/cart.js`)
- Loads product data from localStorage or JSON
- Renders product cards with correct image paths
- Implements error handling with fallback images
- Uses `onerror` attribute for automatic fallback

**3. HTML Templates**
- Product cards use `<img>` tags with proper `src` and `alt` attributes
- Images have lazy loading enabled for performance
- Responsive image sizing via CSS

**4. CSS Styling** (`styles/shop.css`)
- Product images display in responsive grids
- Images scale properly on all breakpoints
- Consistent aspect ratios maintained
- Hover effects and shadows applied

---

## 📊 Image Coverage Matrix

| Product | Main | Front | Side | Back | Embroidery | Dupatta | Fabric |
|---------|------|-------|------|------|------------|---------|--------|
| PROD-001 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PROD-002 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PROD-003 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PROD-004 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PROD-005 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PROD-006 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Minimum Requirement:** Main images for all 6 products (6 images)
**Recommended:** Main + Detail views (36 images total)
**Complete:** All view types including embroidery and fabric (42 images)

---

## 🎨 Color & Fabric Reference Guide

### Primary Colors to Use:
- **Emerald Green** (#50C878, #008000) - PROD-001
- **Maroon/Wine** (#800000, #722F37) - PROD-002, PROD-006
- **Champagne Gold** (#F4D03F, #FFD700) - PROD-003
- **Ivory/Cream** (#FFFFF0, #FFFDD0) - PROD-004
- **Sapphire Blue** (#0F52BA, #0047AB) - PROD-005

### Premium Embroidery Types to Showcase:
- **Zari Work** - Gold/silver threadwork (Mughal inspired)
- **Mirror Work** - Reflecting mirrors with threadwork
- **Beadwork** - Detailed bead embroidery
- **Thread Embroidery** - Fine thread work in contrasting colors
- **Hand Block Print** - Traditional Indian block printing
- **Floral Embroidery** - Delicate flower motifs
- **Mughal Motifs** - Ornate palace-inspired patterns

---

## ✅ Quality Checklist

Before uploading images, verify:

- ✅ Image name follows convention: `PROD-###-{Type}.jpg`
- ✅ Image is in correct folder (main/details/embroidery)
- ✅ Dimensions meet specifications (800x1000px for main, etc.)
- ✅ File size under 300KB for main images
- ✅ JPG format with 80-85% quality
- ✅ All 6 main images present
- ✅ No Western/casual wear visible
- ✅ Pure traditional Indian ethnic wear
- ✅ Premium boutique photography quality
- ✅ Consistent lighting and background across all images
- ✅ Model appears professional and elegant
- ✅ Colors are true and vibrant
- ✅ Details (embroidery, prints) clearly visible
- ✅ Fallback placeholder tested (placeholder-kurti.svg exists)

---

## 🆘 Troubleshooting

### Images Not Displaying

**Problem:** Product cards show placeholder instead of images
- Check image filenames match convention exactly
- Verify images are in correct folder (`images/products/main/`)
- Check file extensions are `.jpg` (lowercase)
- Verify product ID matches (PROD-001 to PROD-006)
- Clear browser cache and refresh

**Problem:** Images display on shop page but not in cart
- Verify `imageFallback` property exists in product data
- Check image path is accessible from both shop and cart pages
- Verify relative paths are correct: `../images/products/main/`

**Problem:** Images load slowly
- Optimize file size (target 150-250KB for main images)
- Use JPG format instead of PNG
- Reduce dimensions if exceeding specifications
- Enable browser caching headers

### Images Appear Stretched or Distorted
- Verify image dimensions match aspect ratio (4:5 for main, 3:4 for details)
- Check CSS isn't forcing incorrect aspect ratios
- Re-export image at correct dimensions

---

## 📱 Responsive Image Display

Images automatically scale for all devices:

| Screen Size | Display Type | Image Dimensions |
|------------|--------------|------------------|
| 320px | Mobile | Full width, 4:5 ratio |
| 480px | Mobile | Full width, 4:5 ratio |
| 768px | Tablet | 2-column grid |
| 1024px | Desktop | 3-column grid |
| 1440px | Large Desktop | 4-column grid |

No manual resizing needed - CSS handles responsive scaling automatically!

---

## 🚀 Next Steps

1. **Generate Images:** Use the AI prompts provided to generate high-quality product images
2. **Download Images:** Save images to your computer
3. **Name Files:** Rename according to convention (PROD-###-{Type}.jpg)
4. **Organize:** Place in correct folders under `images/products/`
5. **Test:** Navigate to shop page and verify images display
6. **Deploy:** Commit and push to GitHub
7. **Monitor:** Check product pages on live site

---

## 📞 Support

For issues with image integration:

1. Verify file structure matches documentation
2. Check browser console for 404 errors
3. Confirm image paths in product data
4. Test fallback functionality
5. Review responsive behavior across devices

---

## 📄 Files Modified/Created

- ✅ `data/products.json` - Updated with comprehensive image paths
- ✅ `js/products.js` - Updated getSampleProducts() with new image references
- ✅ `images/products/` - Folder structure created
- ✅ `IMAGE_INTEGRATION_GUIDE.md` - This file

---

**Last Updated:** July 15, 2026
**Version:** 1.0
**Status:** Ready for Image Integration
