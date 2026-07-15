// ========================================
// ADMIN PANEL JAVASCRIPT
// ========================================

// Admin credentials
const ADMIN_EMAIL = 'VelorabyMegha@gmail.com';
const ADMIN_PASSWORD = 'Admin@123';

// ========================================
// ADMIN LOGIN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Handle admin login form
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;
            const rememberMe = document.getElementById('rememberAdmin').checked;
            
            // Simple authentication check
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // Store admin session
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminEmail', email);
                
                if (rememberMe) {
                    localStorage.setItem('adminEmail', email);
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Check if admin is logged in
    checkAdminLogin();
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminEmail');
            window.location.href = '../index.html';
        });
    }

    // Initialize dashboard
    initializeDashboard();
    
    // Initialize product upload form
    initializeProductUpload();
});

// ========================================
// AUTH CHECK
// ========================================

function checkAdminLogin() {
    const currentPage = window.location.pathname;
    
    // If on dashboard or other admin pages, check if logged in
    if (currentPage.includes('admin/') && !currentPage.includes('login')) {
        if (!sessionStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }
    }
}

// ========================================
// DASHBOARD INITIALIZATION
// ========================================

function initializeDashboard() {
    // Load dashboard data from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    
    // Calculate metrics
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalCustomers = customers.length;
    
    // Update metrics
    updateMetric('totalProducts', totalProducts);
    updateMetric('totalOrders', totalOrders);
    updateMetric('totalRevenue', `₹${totalRevenue.toLocaleString('en-IN')}`);
    updateMetric('totalCustomers', totalCustomers);
    
    // Load recent orders
    loadRecentOrders(orders);
    
    // Load recent products
    loadRecentProducts(products);
}

function updateMetric(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

function loadRecentOrders(orders) {
    const tbody = document.getElementById('recentOrdersTable');
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No orders yet</td></tr>';
        return;
    }
    
    const recentOrders = orders.slice(-5).reverse();
    tbody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>${order.id || '#12345'}</td>
            <td>${order.customer || 'Unknown'}</td>
            <td>₹${(order.total || 0).toLocaleString('en-IN')}</td>
            <td><span class="status-badge ${order.status || 'pending'}">${order.status || 'Pending'}</span></td>
            <td>${new Date(order.date || Date.now()).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

function loadRecentProducts(products) {
    const container = document.getElementById('recentProducts');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state">No products added yet</div>';
        return;
    }
    
    const recentProducts = products.slice(-6);
    container.innerHTML = recentProducts.map(product => `
        <div class="product-card-admin">
            <div class="product-image">${product.image || '👗'}</div>
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
        </div>
    `).join('');
}

// ========================================
// PRODUCT UPLOAD
// ========================================

function initializeProductUpload() {
    const form = document.getElementById('productUploadForm');
    if (!form) return;
    
    // Handle file upload
    const fileInput = document.getElementById('productImages');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleImagePreview(e);
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitProductForm();
    });
    
    // Handle preview button
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            previewProduct();
        });
    }
}

function handleImagePreview(e) {
    const files = e.target.files;
    const preview = document.getElementById('imagePreview');
    
    if (!preview) return;
    preview.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
        if (index < 5) { // Limit to 5 images
            const reader = new FileReader();
            reader.onload = function(event) {
                const item = document.createElement('div');
                item.className = 'image-preview-item';
                item.innerHTML = `<img src="${event.target.result}" alt="Preview ${index}">`;
                preview.appendChild(item);
            };
            reader.readAsDataURL(file);
        }
    });
}

function submitProductForm() {
    const form = document.getElementById('productUploadForm');
    const formData = {
        id: 'PROD-' + Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        description: document.getElementById('description').value,
        fabric: document.getElementById('fabric').value,
        color: document.getElementById('color').value,
        sizes: Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map(el => el.value),
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
        price: parseFloat(document.getElementById('price').value),
        discountPrice: parseFloat(document.getElementById('discountPrice').value) || 0,
        stock: parseInt(document.getElementById('stock').value),
        sku: document.getElementById('sku').value,
        isFeatured: document.getElementById('isFeatured').checked,
        isBestseller: document.getElementById('isBestseller').checked,
        isNewArrival: document.getElementById('isNewArrival').checked,
        isPublished: document.getElementById('isPublished').checked,
        createdAt: new Date().toISOString()
    };
    
    // Get existing products
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Add new product
    products.push(formData);
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    
    // Show success message
    alert('Product published successfully!');
    
    // Reset form
    form.reset();
    document.getElementById('imagePreview').innerHTML = '';
    
    // Redirect to products page
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function previewProduct() {
    const modal = document.getElementById('previewModal');
    if (!modal) return;
    
    const previewContent = document.getElementById('previewContent');
    const productName = document.getElementById('productName').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const fabric = document.getElementById('fabric').value;
    const color = document.getElementById('color').value;
    
    previewContent.innerHTML = `
        <div class="preview-product">
            <h3>${productName || 'Product Name'}</h3>
            <p><strong>Price:</strong> ₹${price || '0'}</p>
            <p><strong>Fabric:</strong> ${fabric || 'N/A'}</p>
            <p><strong>Color:</strong> ${color || 'N/A'}</p>
            <p><strong>Description:</strong></p>
            <p>${description || 'No description provided'}</p>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Close modal when clicking X
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// ========================================
// MENU NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    menuItems.forEach(item => {
        if (window.location.pathname.includes(item.getAttribute('data-page') || '')) {
            item.classList.add('active');
        }
    });
});
