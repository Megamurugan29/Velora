// ========================================
// PRODUCT LISTING AND FILTERING
// ========================================

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 12;

document.addEventListener('DOMContentLoaded', function() {
    // Load products
    loadProducts();
    
    // Initialize filters
    initializeFilters();
});

// ========================================
// LOAD PRODUCTS
// ========================================

function loadProducts() {
    // Try to load from localStorage first (admin uploaded)
    let savedProducts = localStorage.getItem('products');
    
    if (savedProducts) {
        allProducts = JSON.parse(savedProducts);
    } else {
        // Load sample products
        allProducts = getSampleProducts();
        localStorage.setItem('products', JSON.stringify(allProducts));
    }
    
    filteredProducts = [...allProducts];
    displayProducts(filteredProducts);
}

function getSampleProducts() {
    return [
        {
            id: 'PROD-001',
            name: 'Royal Silk Kurti - Emerald',
            category: 'royal',
            price: 5999,
            discountPrice: 4499,
            image: '../images/products/main/PROD-001-main.jpg',
            imageFrontView: '../images/products/details/PROD-001-front.jpg',
            imageSideView: '../images/products/details/PROD-001-side.jpg',
            imageBackView: '../images/products/details/PROD-001-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-001-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-001-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-001-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'silk',
            color: 'emerald',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            rating: 4.5,
            reviews: 24,
            description: 'Premium silk kurti with intricate embroidery inspired by Mughal palace architecture. Perfect for special occasions.',
            tags: ['embroidered', 'silk', 'luxury', 'festive'],
            isFeatured: true,
            isBestseller: true,
            isNewArrival: false
        },
        {
            id: 'PROD-002',
            name: 'Premium Silk Kurti - Maroon',
            category: 'premium',
            price: 3999,
            discountPrice: 2999,
            image: '../images/products/main/PROD-002-main.jpg',
            imageFrontView: '../images/products/details/PROD-002-front.jpg',
            imageSideView: '../images/products/details/PROD-002-side.jpg',
            imageBackView: '../images/products/details/PROD-002-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-002-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-002-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-002-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'silk',
            color: 'maroon',
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            rating: 4.8,
            reviews: 42,
            description: 'Luxurious premium silk in deep maroon shade with elegant draping. A timeless classic.',
            tags: ['handcrafted', 'silk', 'premium', 'elegant'],
            isFeatured: true,
            isBestseller: false,
            isNewArrival: true
        },
        {
            id: 'PROD-003',
            name: 'Festive Gold Kurti',
            category: 'festive',
            price: 6999,
            discountPrice: 5499,
            image: '../images/products/main/PROD-003-main.jpg',
            imageFrontView: '../images/products/details/PROD-003-front.jpg',
            imageSideView: '../images/products/details/PROD-003-side.jpg',
            imageBackView: '../images/products/details/PROD-003-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-003-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-003-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-003-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'blend',
            color: 'champagne',
            sizes: ['XS', 'S', 'M', 'L'],
            rating: 4.7,
            reviews: 31,
            description: 'Perfect for festivals with champagne gold accents and traditional Mughal patterns.',
            tags: ['festive', 'embroidered', 'gold', 'traditional'],
            isFeatured: false,
            isBestseller: true,
            isNewArrival: false
        },
        {
            id: 'PROD-004',
            name: 'Casual Cotton Kurti - Ivory',
            category: 'casual',
            price: 1999,
            discountPrice: 1499,
            image: '../images/products/main/PROD-004-main.jpg',
            imageFrontView: '../images/products/details/PROD-004-front.jpg',
            imageSideView: '../images/products/details/PROD-004-side.jpg',
            imageBackView: '../images/products/details/PROD-004-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-004-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-004-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-004-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'cotton',
            color: 'ivory',
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            rating: 4.3,
            reviews: 18,
            description: 'Comfortable everyday cotton kurti perfect for casual wear.',
            tags: ['cotton', 'casual', 'comfortable', 'breathable'],
            isFeatured: false,
            isBestseller: false,
            isNewArrival: false
        },
        {
            id: 'PROD-005',
            name: 'Royal Blue Silk Kurti',
            category: 'royal',
            price: 5499,
            discountPrice: 3999,
            image: '../images/products/main/PROD-005-main.jpg',
            imageFrontView: '../images/products/details/PROD-005-front.jpg',
            imageSideView: '../images/products/details/PROD-005-side.jpg',
            imageBackView: '../images/products/details/PROD-005-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-005-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-005-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-005-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'silk',
            color: 'sapphire',
            sizes: ['S', 'M', 'L', 'XL'],
            rating: 4.6,
            reviews: 29,
            description: 'Regal sapphire blue silk kurti with intricate beadwork.',
            tags: ['silk', 'beadwork', 'luxury', 'royal'],
            isFeatured: true,
            isBestseller: false,
            isNewArrival: true
        },
        {
            id: 'PROD-006',
            name: 'Premium Georgette Kurti',
            category: 'premium',
            price: 4499,
            discountPrice: 3299,
            image: '../images/products/main/PROD-006-main.jpg',
            imageFrontView: '../images/products/details/PROD-006-front.jpg',
            imageSideView: '../images/products/details/PROD-006-side.jpg',
            imageBackView: '../images/products/details/PROD-006-back.jpg',
            imageEmbroideryDetail: '../images/products/embroidery/PROD-006-embroidery.jpg',
            imageDupattaDetail: '../images/products/details/PROD-006-dupatta.jpg',
            imageFabricTexture: '../images/products/details/PROD-006-fabric.jpg',
            imageFallback: '../images/products/placeholder-kurti.svg',
            fabric: 'georgette',
            color: 'maroon',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            rating: 4.4,
            reviews: 22,
            description: 'Elegant georgette with flowing design and traditional prints.',
            tags: ['georgette', 'elegant', 'flowing', 'premium'],
            isFeatured: false,
            isBestseller: false,
            isNewArrival: false
        }
    ];
}

// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productsToDisplay) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div class="empty-state">No products found</div>';
        return;
    }
    
    // Pagination
    const totalPages = Math.ceil(productsToDisplay.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productsToDisplay.slice(startIndex, endIndex);
    
    // Display products
    productsGrid.innerHTML = paginatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     onerror="this.src='${product.imageFallback}'; this.onerror=null;"
                     loading="lazy">
                ${product.isFeatured ? '<span class="product-badge">Featured</span>' : ''}
                ${product.isBestseller ? '<span class="product-badge">Bestseller</span>' : ''}
                ${product.isNewArrival ? '<span class="product-badge">New</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} (${product.reviews})
                </div>
                <div class="product-price">
                    <span class="price-current">₹${product.discountPrice || product.price}</span>
                    ${product.discountPrice ? `<span class="price-original">₹${product.price}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addProductToCart('${product.id}')">Add to Cart</button>
                    <button class="btn-wishlist" onclick="addToWishlist('${product.id}')">♡</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Display pagination
    displayPagination(totalPages, productsToDisplay.length);
}

function displayPagination(totalPages, totalItems) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<a onclick="goToPage(${currentPage - 1})">← Previous</a>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<span class="active">${i}</span>`;
        } else {
            paginationHTML += `<a onclick="goToPage(${i})">${i}</a>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<a onclick="goToPage(${currentPage + 1})">Next →</a>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

// ========================================
// FILTERS
// ========================================

function initializeFilters() {
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            document.querySelector('.price-range p').textContent = `₹0 - ₹${this.value}`;
            applyFilters();
        });
    }
    
    // Size filters
    document.querySelectorAll('input[name="size"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Color filters (color boxes)
    document.querySelectorAll('.color-box').forEach(box => {
        box.addEventListener('click', function() {
            this.classList.toggle('selected');
            applyFilters();
        });
    });
    
    // Fabric filters
    document.querySelectorAll('input[name="fabric"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Reset filters
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllFilters);
    }
}

function applyFilters() {
    // Get selected filters
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
    const maxPrice = parseFloat(document.getElementById('priceRange')?.value || 50000);
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value);
    const selectedColors = Array.from(document.querySelectorAll('.color-box.selected')).map(el => el.getAttribute('data-color'));
    const selectedFabrics = Array.from(document.querySelectorAll('input[name="fabric"]:checked')).map(el => el.value);
    
    // Filter products
    filteredProducts = allProducts.filter(product => {
        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (product.discountPrice > maxPrice && product.price > maxPrice) {
            return false;
        }
        
        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes?.includes(size))) {
            return false;
        }
        
        // Color filter
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
            return false;
        }
        
        // Fabric filter
        if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric)) {
            return false;
        }
        
        return true;
    });
    
    // Apply sorting
    applySorting();
    
    // Reset pagination and display
    currentPage = 1;
    displayProducts(filteredProducts);
}

function resetAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
    document.querySelectorAll('.color-box').forEach(el => el.classList.remove('selected'));
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.value = 50000;
        document.querySelector('.price-range p').textContent = '₹0 - ₹50000';
    }
    
    filteredProducts = [...allProducts];
    currentPage = 1;
    displayProducts(filteredProducts);
}

// ========================================
// SORTING
// ========================================

function applySorting() {
    const sortValue = document.getElementById('sortSelect')?.value || 'featured';
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => b.isFeatured - a.isFeatured);
    }
}

// ========================================
// VIEW TOGGLE
// ========================================

function toggleView(view) {
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const productsGrid = document.querySelector('.products-grid');
    if (view === 'grid') {
        productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    } else if (view === 'list') {
        productsGrid.style.gridTemplateColumns = '1fr';
    }
}

// ========================================
// PAGINATION
// ========================================

function goToPage(page) {
    currentPage = page;
    displayProducts(filteredProducts);
    window.scrollTo(0, 0);
}

// ========================================
// CART & WISHLIST
// ========================================

function addProductToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // Use cart.js function
        if (typeof addToCart === 'function') {
            addToCart(product);
        } else {
            // Fallback cart management
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartItem = cart.find(item => item.id === productId);
            
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.discountPrice || product.price,
                    quantity: 1,
                    image: product.image,
                    imageFallback: product.imageFallback || '../images/products/placeholder-kurti.svg',
                    category: product.category,
                    fabric: product.fabric,
                    color: product.color,
                    sizes: product.sizes
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            showNotification('Product added to cart!');
        }
    }
}

function addToWishlist(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const exists = wishlist.find(item => item.id === productId);
        
        if (exists) {
            wishlist = wishlist.filter(item => item.id !== productId);
            showNotification('Removed from wishlist');
        } else {
            wishlist.push(product);
            showNotification('Added to wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

// ========================================
// UTILITIES
// ========================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #27ae60;
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

// Setup sort listener
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentPage = 1;
            applySorting();
            displayProducts(filteredProducts);
        });
    }
});
