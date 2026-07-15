// ========================================
// SHOPPING CART JAVASCRIPT
// ========================================

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    loadCart();
    
    // Update cart display
    updateCartDisplay();
    
    // Handle quantity updates
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const itemId = this.getAttribute('data-item-id');
            updateQuantity(itemId, action);
        });
    });
    
    // Handle item removal
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            removeFromCart(itemId);
        });
    });
    
    // Handle coupon application
    const applyCouponBtn = document.querySelector('.coupon-input button');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            applyCoupon();
        });
    }
    
    // Handle gift card application
    const applyGiftCardBtn = document.querySelector('.gift-card-input button');
    if (applyGiftCardBtn) {
        applyGiftCardBtn.addEventListener('click', function() {
            applyGiftCard();
        });
    }
    
    // Handle checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            proceedToCheckout();
        });
    }
    
    // Handle clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            showClearCartConfirmation();
        });
    }
});

// ========================================
// CART MANAGEMENT
// ========================================

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            imageFallback: product.imageFallback || '../images/products/placeholder-kurti.svg',
            category: product.category,
            fabric: product.fabric,
            color: product.color,
            sizes: product.sizes
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    // Show notification
    showNotification('Product added to cart!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

function updateQuantity(itemId, action) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        } else if (action === 'decrease' && item.quantity === 1) {
            removeFromCart(itemId);
            return;
        }
        saveCart();
        updateCartDisplay();
    }
}

// ========================================
// CART DISPLAY
// ========================================

function updateCartDisplay() {
    const emptyCartMessage = document.querySelector('.empty-cart');
    const cartProductsDisplay = document.getElementById('cartProductsDisplay');
    const cartProductsGrid = document.getElementById('cartProductsGrid');
    const cartSummaryPanel = document.getElementById('cartSummaryPanel');
    const checkoutOrderItems = document.getElementById('checkoutOrderItems');
    
    if (cart.length === 0) {
        if (cartProductsDisplay) {
            cartProductsDisplay.style.display = 'none';
        }
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'flex';
        }
        if (cartSummaryPanel) {
            cartSummaryPanel.style.display = 'none';
        }
    } else {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }
        
        if (cartProductsDisplay && cartProductsGrid) {
            cartProductsDisplay.style.display = 'block';
            cartProductsGrid.innerHTML = cart.map(item => {
                // Get category display name
                const categoryNames = {
                    'royal': 'Royal Collection',
                    'premium': 'Premium Silk',
                    'festive': 'Festive',
                    'casual': 'Casual Wear'
                };
                
                // Get color display name
                const colorNames = {
                    'emerald': 'Emerald',
                    'maroon': 'Maroon',
                    'champagne': 'Champagne',
                    'ivory': 'Ivory',
                    'sapphire': 'Sapphire Blue'
                };
                
                const fallbackImage = item.imageFallback || '../images/products/placeholder-kurti.svg';
                
                return `
                    <div class="cart-product-card">
                        <div class="cart-product-image-container">
                            <div class="cart-product-image">
                                <img src="${item.image}" 
                                     alt="${item.name}" 
                                     onerror="this.src='${fallbackImage}'; this.onerror=null;"
                                     loading="eager">
                            </div>
                            <div class="cart-product-qty-badge">${item.quantity}</div>
                        </div>
                        <div class="cart-product-details">
                            <h3 class="cart-product-name">${item.name}</h3>
                            <div class="cart-product-meta">
                                ${item.category ? `<p class="cart-product-category">📦 ${categoryNames[item.category] || item.category}</p>` : ''}
                                ${item.color ? `<p class="cart-product-color">🎨 ${colorNames[item.color] || item.color}</p>` : ''}
                                ${item.fabric ? `<p class="cart-product-fabric">✨ ${item.fabric.charAt(0).toUpperCase() + item.fabric.slice(1)}</p>` : ''}
                            </div>
                            <div class="cart-product-quantity">
                                <span class="qty-label">Quantity:</span>
                                <div class="quantity-selector">
                                    <button class="quantity-btn" data-action="decrease" data-item-id="${item.id}">−</button>
                                    <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn" data-action="increase" data-item-id="${item.id}">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="cart-product-actions">
                            <div class="cart-product-pricing">
                                <p class="cart-product-price">₹${item.price.toLocaleString('en-IN')}</p>
                                <p class="cart-product-total">Total: ₹${(item.price * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                            <button class="btn-remove" data-item-id="${item.id}">Remove from cart</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        // Show summary panel when cart has items
        if (cartSummaryPanel) {
            cartSummaryPanel.style.display = 'block';
        }
        
        if (checkoutOrderItems) {
            checkoutOrderItems.innerHTML = cart.map(item => `
                <div class="checkout-item">
                    <span class="checkout-item-name">${item.name} x ${item.quantity}</span>
                    <span class="checkout-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
            `).join('');
        }
    }
    
    // Update summary
    updateCartSummary();
    
    // Re-attach event listeners
    attachCartEventListeners();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = localStorage.getItem('appliedDiscount') ? parseFloat(localStorage.getItem('appliedDiscount')) : 0;
    const shipping = getShippingCost();
    const tax = (subtotal - discount) * 0.18; // 18% tax
    const total = subtotal - discount + shipping + tax;
    
    updateSummaryField('checkoutSubtotal', `₹${subtotal.toLocaleString('en-IN')}`);
    updateSummaryField('checkoutShipping', shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`);
    updateSummaryField('checkoutTax', `₹${tax.toLocaleString('en-IN')}`);
    updateSummaryField('checkoutTotal', `₹${total.toLocaleString('en-IN')}`);
    
    // Also update regular cart summary
    updateSummaryField('subtotal', `₹${subtotal.toLocaleString('en-IN')}`);
    updateSummaryField('discount', discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '₹0');
    updateSummaryField('shipping', shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`);
    updateSummaryField('tax', `₹${tax.toLocaleString('en-IN')}`);
    updateSummaryField('total', `₹${total.toLocaleString('en-IN')}`);
}

function updateSummaryField(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function attachCartEventListeners() {
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.removeEventListener('click', quantityBtnClick);
        btn.addEventListener('click', quantityBtnClick);
    });
    
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(btn => {
        btn.removeEventListener('click', removeItemClick);
        btn.addEventListener('click', removeItemClick);
    });
}

function quantityBtnClick(e) {
    const action = this.getAttribute('data-action');
    const itemId = this.getAttribute('data-item-id');
    updateQuantity(itemId, action);
}

function removeItemClick(e) {
    const itemId = this.getAttribute('data-item-id');
    removeFromCart(itemId);
}

// ========================================
// COUPON & GIFT CARD
// ========================================

function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    if (!couponInput) return;
    
    const couponCode = couponInput.value.toUpperCase().trim();
    
    // Simple coupon validation (in real app, validate on server)
    const validCoupons = {
        'WELCOME10': 0.10,
        'SAVE20': 0.20,
        'LUXURY15': 0.15
    };
    
    if (validCoupons[couponCode]) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * validCoupons[couponCode];
        
        localStorage.setItem('appliedCoupon', couponCode);
        localStorage.setItem('appliedDiscount', discount.toString());
        
        updateCartSummary();
        showNotification(`Coupon applied! Discount: ₹${discount.toLocaleString('en-IN')}`);
    } else {
        showNotification('Invalid coupon code', 'error');
    }
}

function applyGiftCard() {
    const giftCardInput = document.getElementById('giftCardCode');
    if (!giftCardInput) return;
    
    const giftCardCode = giftCardInput.value.toUpperCase().trim();
    
    if (giftCardCode.length >= 10) {
        localStorage.setItem('appliedGiftCard', giftCardCode);
        showNotification('Gift card applied successfully!');
    } else {
        showNotification('Invalid gift card code', 'error');
    }
}

// ========================================
// CHECKOUT
// ========================================

function getShippingCost() {
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    if (!shippingMethod) return 0;
    
    const method = shippingMethod.value;
    const costs = {
        'standard': 0,
        'express': 500,
        'overnight': 1000
    };
    
    return costs[method] || 0;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// ========================================
// CLEAR CART
// ========================================

function showClearCartConfirmation() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'confirmationOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: var(--white);
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: slideUp 0.3s ease;
        border: 2px solid rgba(232, 197, 71, 0.2);
    `;
    
    // Modal content
    modal.innerHTML = `
        <h2 style="color: var(--sapphire-blue); margin-bottom: 16px; font-family: var(--font-display); font-size: 1.5rem;">Clear Cart?</h2>
        <p style="color: var(--text-dark); margin-bottom: 30px; font-size: 1rem; line-height: 1.6;">Are you sure you want to remove all items from your cart?</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="confirmClear" style="
                padding: 12px 28px;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 1rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
            ">Yes, Clear Cart</button>
            <button id="cancelClear" style="
                padding: 12px 28px;
                background: transparent;
                color: var(--sapphire-blue);
                border: 2px solid rgba(232, 197, 71, 0.4);
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 1rem;
                transition: all 0.3s ease;
            ">Cancel</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add event listeners
    document.getElementById('confirmClear').addEventListener('click', function() {
        clearCart();
        overlay.remove();
    });
    
    document.getElementById('cancelClear').addEventListener('click', function() {
        overlay.remove();
    });
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function clearCart() {
    // Clear cart array
    cart = [];
    
    // Clear localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('appliedDiscount');
    localStorage.removeItem('appliedGiftCard');
    
    // Reset coupon input if exists
    const couponInput = document.getElementById('couponCode');
    if (couponInput) {
        couponInput.value = '';
    }
    const couponMessage = document.getElementById('couponMessage');
    if (couponMessage) {
        couponMessage.style.display = 'none';
    }
    
    // Reset gift card input if exists
    const giftCardInput = document.getElementById('giftCard');
    if (giftCardInput) {
        giftCardInput.value = '';
    }
    
    // Update display
    updateCartDisplay();
    
    // Show notification
    showNotification('Cart cleared successfully!', 'success');
}

// ========================================
// WISHLIST (Save for later)
// ========================================

function saveForLater(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(item);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        removeFromCart(itemId);
        showNotification('Item saved for later');
    }
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// EXPORT FUNCTIONS (for use in other pages)
// ========================================

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
