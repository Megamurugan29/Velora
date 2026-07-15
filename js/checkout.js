// ========================================
// CHECKOUT JAVASCRIPT
// ========================================

let currentStep = 1;
let orderData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout
    initializeCheckout();
    
    // Load cart
    loadCheckoutCart();
    
    // Step 1: Shipping
    document.getElementById('sameAsShipping').addEventListener('change', function() {
        const shippingForm = document.getElementById('shippingForm');
        shippingForm.style.display = this.checked ? 'none' : 'block';
    });
    
    document.getElementById('continueToPaymentBtn').addEventListener('click', function() {
        if (validateShippingStep()) {
            saveShippingData();
            goToStep(2);
        }
    });
    
    // Step 2: Payment
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePaymentForm();
        });
    });
    
    document.getElementById('backToShippingBtn').addEventListener('click', function() {
        goToStep(1);
    });
    
    document.getElementById('processPaymentBtn').addEventListener('click', function() {
        if (validatePaymentStep()) {
            processPayment();
        }
    });
});

// ========================================
// CHECKOUT INITIALIZATION
// ========================================

function initializeCheckout() {
    // Check if user has items in cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Load saved user data if available
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
        prefillUserData(userProfile);
    }
}

function loadCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('checkoutOrderItems');
    
    if (container && cart.length > 0) {
        container.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <span class="checkout-item-name">${item.name} x ${item.quantity}</span>
                <span class="checkout-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
        `).join('');
    }
    
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = localStorage.getItem('appliedDiscount') ? parseFloat(localStorage.getItem('appliedDiscount')) : 0;
    const shipping = getCheckoutShipping();
    const tax = (subtotal - discount) * 0.18;
    const total = subtotal - discount + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`;
    document.getElementById('checkoutTax').textContent = `₹${tax.toLocaleString('en-IN')}`;
    document.getElementById('checkoutTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function getCheckoutShipping() {
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

// ========================================
// STEP NAVIGATION
// ========================================

function goToStep(step) {
    currentStep = step;
    
    // Hide all sections
    document.getElementById('shippingStep').classList.remove('active');
    document.getElementById('paymentStep').classList.remove('active');
    document.getElementById('confirmationStep').classList.remove('active');
    
    // Remove active from progress steps
    document.querySelectorAll('.progress-step').forEach(el => el.classList.remove('active', 'completed'));
    
    // Show current section and update progress
    if (step === 1) {
        document.getElementById('shippingStep').classList.add('active');
        document.querySelectorAll('.progress-step')[0].classList.add('active');
    } else if (step === 2) {
        document.getElementById('paymentStep').classList.add('active');
        document.querySelectorAll('.progress-step')[0].classList.add('completed');
        document.querySelectorAll('.progress-step')[1].classList.add('active');
    } else if (step === 3) {
        document.getElementById('confirmationStep').classList.add('active');
        document.querySelectorAll('.progress-step')[0].classList.add('completed');
        document.querySelectorAll('.progress-step')[1].classList.add('completed');
        document.querySelectorAll('.progress-step')[2].classList.add('completed');
    }
    
    // Update summary
    updateCheckoutSummary();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ========================================
// STEP 1: SHIPPING VALIDATION
// ========================================

function validateShippingStep() {
    // Validate billing address
    const requiredFields = ['billFirstName', 'billLastName', 'billEmail', 'billPhone', 'billAddress', 'billCity', 'billState', 'billPostal'];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) {
            showCheckoutError(`Please fill in all required fields`);
            return false;
        }
    }
    
    // Validate email
    const email = document.getElementById('billEmail').value;
    if (!isValidEmail(email)) {
        showCheckoutError('Please enter a valid email address');
        return false;
    }
    
    // Validate phone
    const phone = document.getElementById('billPhone').value;
    if (!isValidPhone(phone)) {
        showCheckoutError('Please enter a valid phone number');
        return false;
    }
    
    // If different shipping address required
    const sameAsShipping = document.getElementById('sameAsShipping').checked;
    if (!sameAsShipping) {
        const shippingFields = ['shipFirstName', 'shipLastName', 'shipAddress', 'shipCity', 'shipState', 'shipPostal'];
        for (let fieldId of shippingFields) {
            const field = document.getElementById(fieldId);
            if (!field || !field.value.trim()) {
                showCheckoutError('Please fill in all shipping address fields');
                return false;
            }
        }
    }
    
    return true;
}

function saveShippingData() {
    const sameAsShipping = document.getElementById('sameAsShipping').checked;
    
    orderData.billing = {
        firstName: document.getElementById('billFirstName').value,
        lastName: document.getElementById('billLastName').value,
        email: document.getElementById('billEmail').value,
        phone: document.getElementById('billPhone').value,
        address: document.getElementById('billAddress').value,
        city: document.getElementById('billCity').value,
        state: document.getElementById('billState').value,
        postal: document.getElementById('billPostal').value
    };
    
    if (sameAsShipping) {
        orderData.shipping = orderData.billing;
    } else {
        orderData.shipping = {
            firstName: document.getElementById('shipFirstName').value,
            lastName: document.getElementById('shipLastName').value,
            address: document.getElementById('shipAddress').value,
            city: document.getElementById('shipCity').value,
            state: document.getElementById('shipState').value,
            postal: document.getElementById('shipPostal').value
        };
    }
    
    orderData.shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
}

// ========================================
// STEP 2: PAYMENT METHODS
// ========================================

function updatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Hide all forms
    document.getElementById('cardForm').style.display = 'none';
    document.getElementById('upiForm').style.display = 'none';
    document.getElementById('netbankingForm').style.display = 'none';
    document.getElementById('walletForm').style.display = 'none';
    
    // Show selected form
    switch (paymentMethod) {
        case 'card':
            document.getElementById('cardForm').style.display = 'block';
            break;
        case 'upi':
            document.getElementById('upiForm').style.display = 'block';
            break;
        case 'netbanking':
            document.getElementById('netbankingForm').style.display = 'block';
            break;
        case 'wallet':
            document.getElementById('walletForm').style.display = 'block';
            break;
    }
}

function validatePaymentStep() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    switch (paymentMethod) {
        case 'card':
            return validateCardPayment();
        case 'upi':
            return validateUPIPayment();
        case 'netbanking':
            return validateNetBankingPayment();
        case 'wallet':
            return validateWalletPayment();
    }
    
    return false;
}

function validateCardPayment() {
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cardCVV = document.getElementById('cardCVV').value.trim();
    
    if (!cardName) {
        showCheckoutError('Please enter cardholder name');
        return false;
    }
    
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        showCheckoutError('Please enter a valid 16-digit card number');
        return false;
    }
    
    if (!isValidExpiry(cardExpiry)) {
        showCheckoutError('Please enter expiry date in MM/YY format');
        return false;
    }
    
    if (cardCVV.length !== 3 || !/^\d+$/.test(cardCVV)) {
        showCheckoutError('Please enter a valid 3-digit CVV');
        return false;
    }
    
    orderData.payment = {
        method: 'card',
        cardName: cardName,
        cardNumber: cardNumber,
        cardExpiry: cardExpiry,
        cardCVV: cardCVV,
        saveCard: document.getElementById('savePaymentMethod').checked
    };
    
    return true;
}

function validateUPIPayment() {
    const upiId = document.getElementById('upiId').value.trim();
    
    if (!isValidUPI(upiId)) {
        showCheckoutError('Please enter a valid UPI ID');
        return false;
    }
    
    orderData.payment = {
        method: 'upi',
        upiId: upiId,
        savePayment: document.getElementById('savePaymentMethod').checked
    };
    
    return true;
}

function validateNetBankingPayment() {
    const bank = document.getElementById('bankSelect').value;
    
    if (!bank || bank === 'Choose your bank...') {
        showCheckoutError('Please select a bank');
        return false;
    }
    
    orderData.payment = {
        method: 'netbanking',
        bank: bank
    };
    
    return true;
}

function validateWalletPayment() {
    const wallet = document.getElementById('walletSelect').value;
    
    if (!wallet || wallet === 'Choose wallet...') {
        showCheckoutError('Please select a wallet');
        return false;
    }
    
    orderData.payment = {
        method: 'wallet',
        wallet: wallet
    };
    
    return true;
}

// ========================================
// PAYMENT PROCESSING
// ========================================

function processPayment() {
    // In a real app, this would call a payment gateway API
    // For demo, we'll simulate payment processing
    
    showCheckoutLoader(true);
    
    setTimeout(() => {
        // Create order
        createOrder();
        
        showCheckoutLoader(false);
        goToStep(3);
    }, 2000);
}

function createOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = localStorage.getItem('appliedDiscount') ? parseFloat(localStorage.getItem('appliedDiscount')) : 0;
    const shipping = getCheckoutShipping();
    const tax = (subtotal - discount) * 0.18;
    const total = subtotal - discount + shipping + tax;
    
    const order = {
        id: 'ORD-' + Date.now(),
        items: cart,
        customer: `${orderData.billing.firstName} ${orderData.billing.lastName}`,
        email: orderData.billing.email,
        phone: orderData.billing.phone,
        billing: orderData.billing,
        shipping: orderData.shipping,
        shippingMethod: orderData.shippingMethod,
        payment: orderData.payment,
        subtotal: subtotal,
        discount: discount,
        shipping: shipping,
        tax: tax,
        total: total,
        status: 'processing',
        date: new Date().toISOString()
    };
    
    // Save order
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Save customer
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerExists = customers.find(c => c.email === order.email);
    if (!customerExists) {
        customers.push({
            name: order.customer,
            email: order.email,
            phone: order.phone,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('customers', JSON.stringify(customers));
    }
    
    // Display order ID
    document.getElementById('orderId').textContent = order.id;
    
    // Clear cart
    localStorage.removeItem('cart');
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('appliedDiscount');
    localStorage.removeItem('appliedGiftCard');
}

// ========================================
// UTILITIES
// ========================================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

function isValidExpiry(expiry) {
    const parts = expiry.split('/');
    if (parts.length !== 2) return false;
    const month = parseInt(parts[0]);
    const year = parseInt('20' + parts[1]);
    if (month < 1 || month > 12) return false;
    if (year < new Date().getFullYear()) return false;
    return true;
}

function isValidUPI(upi) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upi);
}

function prefillUserData(userProfile) {
    document.getElementById('billFirstName').value = userProfile.firstName || '';
    document.getElementById('billLastName').value = userProfile.lastName || '';
    document.getElementById('billEmail').value = userProfile.email || '';
    document.getElementById('billPhone').value = userProfile.phone || '';
}

function showCheckoutError(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 25px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showCheckoutLoader(show) {
    let loader = document.getElementById('checkoutLoader');
    if (!loader && show) {
        loader = document.createElement('div');
        loader.id = 'checkoutLoader';
        loader.innerHTML = '<p>Processing payment...</p>';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            color: white;
        `;
        document.body.appendChild(loader);
    } else if (loader && !show) {
        loader.remove();
    }
}
