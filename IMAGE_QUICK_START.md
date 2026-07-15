# Image Integration - Quick Start Guide

## 🚀 Quick Start (5 Steps)

### Step 1: Generate Images
1. Open [DALL-E 3](https://openai.com/dall-e-3), [Midjourney](https://www.midjourney.com), [Stable Diffusion](https://huggingface.co/spaces/stabilityai/stable-diffusion), or [Adobe Firefly](https://www.adobe.com/products/firefly.html)
2. Use prompts from **`AI_IMAGE_PROMPTS.md`** file
3. Generate images for all 6 products (minimum)
4. Download images to your computer

### Step 2: Name Files Correctly
Rename each image using this format: **`PROD-###-{type}.jpg`**

**Examples:**
- `PROD-001-main.jpg` (main product image for product 1)
- `PROD-002-main.jpg` (main product image for product 2)
- `PROD-001-front.jpg` (front view detail shot)
- `PROD-001-embroidery.jpg` (close-up of embroidery)
- `PROD-001-fabric.jpg` (fabric texture close-up)

**Required Files (Minimum):**
```
PROD-001-main.jpg
PROD-002-main.jpg
PROD-003-main.jpg
PROD-004-main.jpg
PROD-005-main.jpg
PROD-006-main.jpg
```

### Step 3: Place Images in Folders

**Using Windows File Explorer:**

1. Navigate to: `c:\site\images\products\main`
2. Copy your 6 main images (PROD-001-main.jpg through PROD-006-main.jpg)
3. Paste them into the `main` folder

**Optional - Add Detail Views:**

1. Navigate to: `c:\site\images\products\details`
2. Paste detail images here (front, side, back, dupatta, fabric)

**Optional - Add Embroidery Close-ups:**

1. Navigate to: `c:\site\images\products\embroidery`
2. Paste embroidery detail images here

### Step 4: Verify Installation

**Using Browser:**
1. Open `c:\site\shop\products.html` in your browser
2. Verify all 6 products show images (not placeholder)
3. Add one product to cart
4. Verify image appears in cart
5. Try on mobile size (press F12, then toggle device toolbar)

**Using Terminal (Optional):**
```powershell
cd c:\site\images\products
Get-ChildItem -Recurse *.jpg | Measure-Object | Select-Object Count
# Should show at least 6 images
```

### Step 5: Deploy

```powershell
cd c:\site
git add images/products/
git commit -m "Add premium product images for all 6 products"
git push origin main
```

---

## 📁 Folder Structure Reference

```
images/products/
├── main/                           # REQUIRED - Main product images
│   ├── PROD-001-main.jpg
│   ├── PROD-002-main.jpg
│   ├── PROD-003-main.jpg
│   ├── PROD-004-main.jpg
│   ├── PROD-005-main.jpg
│   └── PROD-006-main.jpg
│
├── details/                        # OPTIONAL - Multiple view angles
│   ├── PROD-001-front.jpg
│   ├── PROD-001-side.jpg
│   ├── PROD-001-back.jpg
│   ├── PROD-001-dupatta.jpg
│   ├── PROD-001-fabric.jpg
│   ├── ... (repeat for PROD-002 to PROD-006)
│
├── embroidery/                     # OPTIONAL - Embroidery close-ups
│   ├── PROD-001-embroidery.jpg
│   ├── PROD-002-embroidery.jpg
│   ├── PROD-003-embroidery.jpg
│   ├── PROD-004-embroidery.jpg
│   ├── PROD-005-embroidery.jpg
│   └── PROD-006-embroidery.jpg
│
└── placeholder-kurti.svg           # Fallback image (already exists)
```

---

## 🎯 Product Details Reference

| ID | Name | Color | Fabric | Category |
|----|------|-------|--------|----------|
| 001 | Royal Silk Kurti - Emerald | Emerald Green | Silk | Royal |
| 002 | Premium Silk Kurti - Maroon | Deep Maroon | Silk | Premium |
| 003 | Festive Gold Kurti | Champagne Gold | Blend | Festive |
| 004 | Casual Cotton Kurti - Ivory | Ivory/Cream | Cotton | Casual |
| 005 | Royal Blue Silk Kurti | Sapphire Blue | Silk | Royal |
| 006 | Premium Georgette Kurti | Maroon | Georgette | Premium |

---

## 📋 Image Specifications

### Main Images (PROD-###-main.jpg)
- **Size:** 800x1000px (4:5 ratio)
- **Format:** JPG
- **Quality:** 80-85%
- **File Size:** 150-300KB
- **Purpose:** Product cards, cart display

### Detail Views (front, side, back, dupatta, fabric)
- **Size:** 600x800px or 400x400px (depends on type)
- **Format:** JPG
- **Quality:** 80%
- **File Size:** 60-150KB
- **Purpose:** Product gallery pages (future feature)

### Embroidery Close-ups
- **Size:** 600x600px
- **Format:** JPG
- **Quality:** 80%
- **File Size:** 80-150KB
- **Purpose:** Detail showcase

---

## ✅ Essential Requirements

❌ **DO NOT USE:**
- Generic fashion images
- Western outfits
- Jeans or T-shirts
- Casual Western wear
- Non-Indian models
- Low-quality photography

✅ **MUST INCLUDE:**
- Premium traditional Indian ethnic wear
- Kurtis with matching duppatas
- Professional Indian female models
- Luxury studio photography
- Clear embroidery/detail visibility
- Professional lighting and background
- Consistent premium aesthetic

---

## 🎨 Color Guide

Use these colors in generated images:

| Product | Primary Color | Hex Code |
|---------|--------------|----------|
| PROD-001 | Emerald Green | #50C878 |
| PROD-002 | Deep Maroon | #800000 |
| PROD-003 | Champagne Gold | #FFD700 |
| PROD-004 | Ivory/Cream | #FFFDD0 |
| PROD-005 | Sapphire Blue | #0047AB |
| PROD-006 | Maroon | #722F37 |

---

## 🔗 How Images Connect to Pages

**Once images are in place:**

1. **Shop Page** - Displays in product cards automatically
2. **Cart Page** - Shows when product added to cart
3. **Checkout Page** - Displays in order summary
4. **Wishlist** - Shows for saved items (future)
5. **Product Details** - Multiple views available (future)

**No code changes needed** - Images auto-connect through product data!

---

## ⚡ Instant Testing

After adding images:

```
1. Open: file:///c:/site/shop/products.html
2. Look for: Images on product cards (not placeholder)
3. Click: "Add to Cart" button
4. Go to: file:///c:/site/shop/cart.html
5. Verify: Product image shows in cart
6. Success: All images working! ✅
```

---

## 🆘 If Images Aren't Showing

**Quick Troubleshoot:**

1. **Check filename:** Must be exactly `PROD-###-main.jpg`
2. **Check location:** Must be in `images/products/main/` folder
3. **Check format:** Must be `.jpg` (not `.png`, not `.JPG`)
4. **Check path:** From root of `c:\site\`
5. **Clear cache:** Press `Ctrl+Shift+Delete` in browser

**If still not working:**
- Verify folder structure matches exactly
- Check file extensions are lowercase
- Ensure 6 main images exist
- Try opening `c:\site\images\products\main\PROD-001-main.jpg` directly in browser

---

## 📞 Need Help?

**Reference Files:**
- `IMAGE_INTEGRATION_GUIDE.md` - Complete documentation
- `AI_IMAGE_PROMPTS.md` - All image generation prompts
- `data/products.json` - Product data with image paths
- `js/products.js` - JavaScript using image paths

**Key Folders:**
- `images/products/main/` - Place 6 main images here
- `images/products/details/` - Optional detail views
- `images/products/embroidery/` - Optional close-ups

---

## 🎓 Learning Path

1. **Read:** `IMAGE_INTEGRATION_GUIDE.md` (full documentation)
2. **Generate:** Use prompts from `AI_IMAGE_PROMPTS.md`
3. **Organize:** Place images in correct folders
4. **Test:** Open `shop/products.html` and verify
5. **Deploy:** Commit and push to GitHub

---

## ⏱️ Timeline

- **5 min:** Generate images (or use existing)
- **5 min:** Rename files to convention
- **5 min:** Place in correct folders
- **5 min:** Test in browser
- **5 min:** Commit and deploy
- **Total: 25 minutes!**

---

**Status:** ✅ Ready for Image Integration
**System:** Fully set up and waiting for premium product images
**Last Updated:** July 15, 2026

---

## 🎁 Bonus: Premium Photography Tips

When generating or sourcing images:

1. **Lighting:** Soft, diffused golden light (not harsh)
2. **Background:** Clean, neutral (white, cream, or soft blur)
3. **Model:** Professional, elegant pose, natural expression
4. **Details:** Focus on embroidery, fabric quality, dupatta drape
5. **Consistency:** Similar lighting/background across all products
6. **Quality:** Studio-level, high resolution (8K if possible)

---

**Next Step:** Open `AI_IMAGE_PROMPTS.md` and start generating images! 🚀
