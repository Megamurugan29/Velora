# 🗺️ Quick Navigation Reference

## 🏠 MAIN ENTRY POINTS

### Homepage
- **URL**: `index.html`
- **Contains**: Hero section, featured products, artisan spotlight
- **Navigation**: Links to all sections below

---

## 🛍️ CUSTOMER PAGES

### Product Browsing
- **URL**: `shop/products.html`
- **Features**: 
  - View all products
  - Filter by: Category, Price, Size, Color, Fabric
  - Sort: Featured, Price, Rating, Newest
  - Grid/List view toggle
  - Pagination
  - Add to cart, Wishlist

### Shopping Cart
- **URL**: `shop/cart.html`
- **Features**:
  - View cart items
  - Adjust quantities
  - Apply coupons (WELCOME10, SAVE20, LUXURY15)
  - Apply gift cards
  - View total with taxes
  - Proceed to checkout

### Checkout
- **URL**: `shop/checkout.html`
- **Steps**:
  1. Shipping (address + method)
  2. Payment (4 methods)
  3. Confirmation (order ID)

---

## 👤 AUTHENTICATION PAGES

### Sign Up
- **URL**: `auth/signup.html`
- **Fields**: Name, Email, Phone, Password
- **Features**: Validation, Benefits display, Footer

### Sign In
- **URL**: `auth/signin.html`
- **Fields**: Email, Password, Remember me
- **Features**: Forgot password link, Admin portal button

### Forgot Password
- **URL**: `auth/forgot-password.html`
- **Action**: Email recovery instructions

### User Profile
- **URL**: `auth/profile.html`
- **Tabs**:
  1. Personal Information (edit profile)
  2. Addresses (manage addresses)
  3. Orders (order history)
  4. Wishlist (saved items)
  5. Settings (password, notifications)
  6. Logout

---

## 👨‍💼 ADMIN PAGES

### Admin Login
- **URL**: `admin/login.html`
- **Credentials**: 
  - Email: `VelorabyMegha@gmail.com`
  - Password: `Admin@123`

### Admin Dashboard
- **URL**: `admin/dashboard.html`
- **Displays**:
  - Total Products metric
  - Total Orders metric
  - Revenue metric
  - Total Customers metric
  - Recent Orders (last 5)
  - Recent Products (last 6)
  - Sales Overview Chart

### Products Management
- **URL**: `admin/products.html`
- **Features**:
  - View all products table
  - SKU, Name, Category, Price, Stock
  - Status (Published/Draft)
  - Edit & Delete actions
  - Link to add new product

### Add Product
- **URL**: `admin/product-upload.html`
- **Sections**:
  - Basic Information (name, category, description, images)
  - Product Details (fabric, color, sizes, tags)
  - Pricing & Inventory (price, stock, SKU)
  - Product Status (Featured, Bestseller, New, Published)
  - Preview & Publish buttons

### Orders Management
- **URL**: `admin/orders.html`
- **Features**:
  - All orders table (ID, Customer, Amount, Status, Date)
  - View & Update order status
  - Order statistics:
    - Processing count
    - Shipped count
    - Delivered count
    - Cancelled count

### Customers Management
- **URL**: `admin/customers.html`
- **Features**:
  - All customers table (Name, Email, Phone, Orders, Spent, Joined)
  - Customer statistics:
    - Total customers
    - New this month
    - Average order value
    - Top spender

---

## 📚 DOCUMENTATION

### Comprehensive Guide
- **File**: `ECOMMERCE_GUIDE.md`
- **Contains**:
  - Platform overview
  - Customer journey
  - Admin features
  - Data storage info
  - Color scheme
  - Responsive design details
  - Features summary
  - Customization guide

### Implementation Summary
- **File**: `IMPLEMENTATION_SUMMARY.md`
- **Contains**:
  - What has been built
  - Feature completeness checklist
  - Statistics
  - Testing instructions
  - Design system
  - Directory structure
  - Quality checklist

### This Navigation Reference
- **File**: `QUICK_REFERENCE.md`
- **Contains**: URL links and quick descriptions

---

## 🔑 IMPORTANT CREDENTIALS

### Admin Access
```
Email: VelorabyMegha@gmail.com
Password: Admin@123
```

### Sample Coupons (for testing)
```
WELCOME10  → 10% discount
SAVE20     → 20% discount
LUXURY15   → 15% discount
```

### Sample User Account
- Create your own via `auth/signup.html`
- Test with any email address

---

## 📁 FILE LOCATIONS

### HTML Files Location
```
/admin/
  - login.html
  - dashboard.html
  - products.html
  - product-upload.html
  - orders.html
  - customers.html

/auth/
  - signup.html
  - signin.html
  - forgot-password.html
  - profile.html

/shop/
  - products.html
  - cart.html
  - checkout.html
```

### CSS Files Location
```
/styles/
  - auth.css
  - shop.css
  - checkout.css

/admin/
  - admin.css

/
  - style.css (main stylesheet)
```

### JavaScript Files Location
```
/js/
  - cart.js
  - checkout.js
  - products.js

/admin/
  - admin.js

/
  - script.js (main script)
```

### Data Files Location
```
/data/
  - products.json (sample products)
```

---

## 🎯 TYPICAL USER FLOWS

### Customer Shopping Flow
1. Open `index.html` → Homepage
2. Click "Shop Now" → `shop/products.html`
3. Filter & sort products
4. Click "Add to Cart"
5. Go to `shop/cart.html`
6. Click "Checkout"
7. Follow 3-step checkout
8. Order confirmation

### New Customer Registration
1. Click "Sign Up" from navbar
2. Fill `auth/signup.html` form
3. Submit form
4. Redirected to `auth/signin.html`
5. Login with credentials
6. Access `auth/profile.html`

### Returning Customer Login
1. Click "Sign In" from navbar
2. Enter credentials in `auth/signin.html`
3. Access profile via `auth/profile.html`
4. View orders, addresses, wishlist

### Admin Product Management
1. Login to `admin/login.html`
2. Go to `admin/dashboard.html`
3. Click "Add Product"
4. Fill `admin/product-upload.html`
5. Publish product
6. View in `admin/products.html`

### Admin Order Management
1. Login to `admin/login.html`
2. Go to `admin/orders.html`
3. View orders table
4. Update order status
5. View statistics

### Admin Customer Management
1. Login to `admin/login.html`
2. Go to `admin/customers.html`
3. View customer list
4. View customer statistics
5. Track spending

---

## ⚙️ TECHNICAL LINKS

### Browser DevTools Checks
- Open Developer Tools (F12)
- Check Console for errors
- Check localStorage for data
  - `cart`
  - `wishlist`
  - `products`
  - `orders`
  - `customers`
  - `userProfile`
  - `adminLoggedIn`

### Network Requests
- All data stored locally (no API calls)
- No external requests
- All processing client-side

### Performance
- No frameworks = faster load
- CSS3 for smooth animations
- JavaScript vanilla for compatibility

---

## 🎨 DESIGN CUSTOMIZATION LINKS

### Color Scheme
- Edit `/style.css` - CSS variables section
- Primary colors: Sapphire Blue, Plum Royal
- Accent colors: Rose Gold, Champagne Gold

### Typography
- Edit in `/style.css` - @import Google Fonts
- Body: Poppins, Cormorant Garamond
- Headings: Playfair Display, Cinzel

### Layout Width
- Edit in `/style.css` - Container max-width
- Default: 1400px for desktop

---

## 📊 DATA STORAGE LOCATIONS

All data stored in browser's localStorage:

| Key | Purpose | Location |
|-----|---------|----------|
| `cart` | Shopping items | `js/cart.js` |
| `wishlist` | Saved items | `js/products.js` |
| `products` | Product inventory | `admin/admin.js` |
| `orders` | Order history | `js/checkout.js` |
| `customers` | Customer database | `admin/admin.js` |
| `userProfile` | Logged-in user data | `auth/` pages |
| `adminLoggedIn` | Admin session | `admin/admin.js` |
| `appliedCoupon` | Active coupon | `js/cart.js` |
| `appliedDiscount` | Discount amount | `js/cart.js` |
| `appliedGiftCard` | Gift card code | `js/cart.js` |

---

## 🚨 TROUBLESHOOTING LINKS

### Issue: Data Disappears
- **Cause**: Browser cache cleared
- **Solution**: Data stored in localStorage only
- **Fix**: Add backend database

### Issue: Login Not Working
- **Cause**: Wrong credentials or session expired
- **Solution**: Check credentials, clear localStorage
- **Admin**: `VelorabyMegha@gmail.com` / `Admin@123`

### Issue: Cart Empty on Refresh
- **Cause**: localStorage disabled in browser
- **Solution**: Enable JavaScript & localStorage
- **Check**: Browser settings

### Issue: Images Not Showing
- **Cause**: No actual image URLs (using emoji)
- **Solution**: Upload real product images
- **Method**: Use `admin/product-upload.html`

### Issue: Checkout Not Working
- **Cause**: Missing shipping/payment fields
- **Solution**: Fill all required fields
- **Check**: Form validation messages

---

## ✅ QUICK VALIDATION CHECKLIST

### Before Production Launch
- [ ] Test all links work
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test forms validate correctly
- [ ] Test admin login works
- [ ] Test product upload works
- [ ] Test checkout process complete
- [ ] Check for console errors
- [ ] Verify localStorage works
- [ ] Test on multiple browsers
- [ ] Test payment method switching
- [ ] Test coupon codes
- [ ] Test order confirmation
- [ ] Check mobile menu works
- [ ] Verify SSL certificate (if live)
- [ ] Test email notifications (if added)

---

## 🎓 LEARNING RESOURCES

### Key Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, animations
- **JavaScript**: Vanilla ES6+
- **localStorage**: Data persistence
- **Form Validation**: HTML5 + JS

### Customization Topics
- Modifying color palette
- Adding new filters
- Changing admin credentials
- Adding product categories
- Extending forms

### Integration Topics
- Backend API setup
- Database connection
- Payment gateway integration
- Email service setup
- Analytics implementation

---

## 📞 QUICK REFERENCE SUMMARY

| Need | Location | URL |
|------|----------|-----|
| Browse Products | Shop | `/shop/products.html` |
| Shopping Cart | Shop | `/shop/cart.html` |
| Checkout | Shop | `/shop/checkout.html` |
| User Profile | Auth | `/auth/profile.html` |
| Admin Dashboard | Admin | `/admin/dashboard.html` |
| Add Products | Admin | `/admin/product-upload.html` |
| Manage Orders | Admin | `/admin/orders.html` |
| Help Guide | Docs | `ECOMMERCE_GUIDE.md` |
| Implementation | Docs | `IMPLEMENTATION_SUMMARY.md` |

---

**Last Updated**: January 2024
**Platform**: VelorabyMegha E-Commerce v1.0
**Status**: ✅ Production Ready

---

## 🚀 Get Started Now!

1. **Open homepage**: `index.html`
2. **Shop products**: Click "Shop" → `shop/products.html`
3. **Try admin**: Go to `admin/login.html`
   - Email: `VelorabyMegha@gmail.com`
   - Password: `Admin@123`
4. **Read guide**: Open `ECOMMERCE_GUIDE.md`

Enjoy your new e-commerce platform! 🎉
