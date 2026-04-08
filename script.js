/* ============================================
   BloomWire — Core JavaScript
   ============================================ */

// --- Product Data ---
const products = [
    {
        id: 1,
        name: "Velvet Rose",
        category: "Single",
        price: 199,
        originalPrice: 249,
        emoji: "🌹",
        badge: "Bestseller",
        rating: 5,
        description: "Our signature pipe-cleaner rose with velvety textured petals in deep crimson. Each petal is hand-shaped for a lifelike bloom that never wilts.",
        features: ["Handcrafted with premium pipe cleaners", "Natural-look wire stems", "Lasts forever — no water needed", "Perfect gift for any occasion"],
    },
    {
        id: 2,
        name: "Lavender Dream Bouquet",
        category: "Bouquet",
        price: 899,
        originalPrice: 1199,
        emoji: "💐",
        badge: "Popular",
        rating: 5,
        description: "A dreamy arrangement of lavender-toned pipe-cleaner flowers — roses, tulips, and baby's breath in a coordinated pastel palette.",
        features: ["7 handcrafted stems", "Wrapped in craft paper", "Includes dried accent leaves", "Custom color options available"],
    },
    {
        id: 3,
        name: "Blush Tulip",
        category: "Single",
        price: 179,
        originalPrice: null,
        emoji: "🌷",
        rating: 4,
        description: "A delicate pink tulip crafted from twisted pipe cleaners with a gentle curve that mimics the real thing beautifully.",
        features: ["Realistic curved petals", "Wrapped green stem", "6-inch height", "Available in 5 colors"],
    },
    {
        id: 4,
        name: "Sunset Dahlia Bundle",
        category: "Bouquet",
        price: 1499,
        originalPrice: 1899,
        emoji: "🌻",
        badge: "New",
        rating: 5,
        description: "A vibrant arrangement of pipe-cleaner dahlias in warm sunset tones — amber, coral, and golden yellow.",
        features: ["12 handcrafted blooms", "Comes in a glass vase", "Premium gift wrapping", "Artisan signed card included"],
    },
    {
        id: 5,
        name: "Mini Daisy",
        category: "Single",
        price: 129,
        originalPrice: 149,
        emoji: "🌼",
        rating: 4,
        description: "Sweet little daisies that bring a touch of sunshine. Perfect for desk decor or adding to a custom arrangement.",
        features: ["Compact 4-inch size", "White & yellow tones", "Wire loop for hanging", "Set of 1 stem"],
    },
    {
        id: 6,
        name: "Royal Orchid",
        category: "Single",
        price: 349,
        originalPrice: 449,
        emoji: "🪻",
        badge: "Premium",
        rating: 5,
        description: "An elegant pipe-cleaner orchid with intricate petal layers. A statement piece for modern interiors.",
        features: ["Multi-layered petals", "8-inch display height", "Mounted on drift wood base", "Collector's edition"],
    },
    {
        id: 7,
        name: "Spring Garden Set",
        category: "Bouquet",
        price: 1199,
        originalPrice: null,
        emoji: "🌸",
        rating: 5,
        description: "Celebrate spring with this cheerful mix of cherry blossoms, tulips, and wildflowers in soft pastel tones.",
        features: ["9 mixed stems", "Seasonal spring palette", "Eco-friendly packaging", "Gift-ready presentation"],
    },
    {
        id: 8,
        name: "Frosted Peony",
        category: "Single",
        price: 249,
        originalPrice: 299,
        emoji: "🪷",
        rating: 4,
        description: "A lush peony bloom with layers of soft-frosted petals. The perfect centrepiece flower.",
        features: ["Oversized bloom head", "Frosted texture finish", "Natural green leaves", "Statement desk piece"],
    },
    {
        id: 9,
        name: "Wild Meadow Mix",
        category: "Bouquet",
        price: 749,
        originalPrice: null,
        emoji: "💮",
        rating: 4,
        description: "A free-spirited bouquet inspired by wild meadow flowers — perfect for a boho-chic aesthetic.",
        features: ["5 wildflower stems", "Natural dried grass accents", "Rustic jute wrapping", "Earthy color tones"],
    },
    {
        id: 10,
        name: "Cherry Blossom",
        category: "Single",
        price: 219,
        originalPrice: null,
        emoji: "🌸",
        rating: 5,
        description: "Delicate cherry blossom branch with tiny pipe-cleaner flowers. Brings a Japanese zen vibe to any space.",
        features: ["Branch-style stem", "Multiple mini blooms", "12-inch display", "Minimalist design"],
    },
    {
        id: 11,
        name: "Eternal Love Set",
        category: "Custom",
        price: 2499,
        originalPrice: 2999,
        emoji: "❤️",
        badge: "Limited",
        rating: 5,
        description: "A luxury heart-shaped arrangement of red roses and white lilies. The ultimate romantic gift.",
        features: ["Heart-shaped arrangement", "15 premium stems", "Velvet gift box", "Personalized message card"],
    },
    {
        id: 12,
        name: "Pastel Crown Wreath",
        category: "Custom",
        price: 1899,
        originalPrice: null,
        emoji: "👑",
        rating: 5,
        description: "A wearable flower crown made from miniature pipe-cleaner blooms in soft pastel hues. Perfect for weddings or photo shoots.",
        features: ["Adjustable wire base", "Lightweight & comfortable", "Custom color matching", "Handmade to order"],
    },
];

// --- Cart System ---
const Cart = {
    KEY: 'bloomwire_cart',

    getItems() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY)) || [];
        } catch { return []; }
    },

    save(items) {
        localStorage.setItem(this.KEY, JSON.stringify(items));
        this.updateBadge();
    },

    add(productId, qty = 1) {
        const items = this.getItems();
        const existing = items.find(i => i.id === productId);
        if (existing) {
            existing.qty += qty;
        } else {
            items.push({ id: productId, qty });
        }
        this.save(items);
        showToast('Added to cart!', '🛒');
    },

    remove(productId) {
        const items = this.getItems().filter(i => i.id !== productId);
        this.save(items);
    },

    updateQty(productId, qty) {
        const items = this.getItems();
        const item = items.find(i => i.id === productId);
        if (item) {
            item.qty = Math.max(1, qty);
            this.save(items);
        }
    },

    getTotal() {
        const items = this.getItems();
        return items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.qty : 0);
        }, 0);
    },

    getCount() {
        return this.getItems().reduce((sum, item) => sum + item.qty, 0);
    },

    updateBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.getCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    },

    clear() {
        localStorage.removeItem(this.KEY);
        this.updateBadge();
    }
};

// --- Toast Notification ---
function showToast(message, icon = '✓') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// --- Product Card Renderer ---
function createProductCard(product) {
    const stars = Array(5).fill(0).map((_, i) =>
        `<span class="star${i < product.rating ? '' : ' empty'}">${i < product.rating ? '★' : '☆'}</span>`
    ).join('');

    return `
        <div class="product-card reveal">
            ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
            <a href="product-detail.html?id=${product.id}" class="img-container">
                ${product.emoji}
            </a>
            <div class="card-body">
                <div class="card-category">${product.category}</div>
                <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <div class="rating">${stars}</div>
                <p class="description">${product.description}</p>
                <div class="card-footer">
                    <div class="price">
                        ₹${product.price}
                        ${product.originalPrice ? `<span class="original">₹${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="btn-add" onclick="buyOnWhatsApp(${product.id})">Buy via WhatsApp</button>
                </div>
            </div>
        </div>
    `;
}

// --- Product Grid Renderer ---
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <span>🌿</span>
                <h3>No flowers found</h3>
                <p>Try a different search or filter.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = items.map(p => createProductCard(p)).join('');
    initScrollReveal();
}

// --- Filter & Search ---
function filterCategory(cat, event) {
    if (event) {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        event.target.classList.add('active');
    }

    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let filtered = cat === 'all' ? [...products] : products.filter(p => p.category === cat);

    if (query) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    renderProducts(filtered);
}

let searchTimeout;
function handleSearch(value) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const activeChip = document.querySelector('.chip.active');
        const cat = activeChip ? activeChip.dataset.category || 'all' : 'all';
        filterCategory(cat, null);
    }, 300);
}

// --- Featured Products (Home Page) ---
function renderFeatured() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const featured = products.filter(p => p.badge).slice(0, 4);
    grid.innerHTML = featured.map(p => createProductCard(p)).join('');
    initScrollReveal();
}

// --- Product Detail ---
function renderProductDetail() {
    const container = document.getElementById('productDetail');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (!product) {
        container.innerHTML = `
            <div class="cart-empty" style="grid-column: 1/-1;">
                <span>🌿</span>
                <h3>Product not found</h3>
                <p>The product you're looking for doesn't exist.</p>
                <a href="product.html" class="btn-primary" style="margin-top: 20px;">Browse Products</a>
            </div>
        `;
        return;
    }

    document.title = `${product.name} | BloomWire`;

    const stars = Array(5).fill(0).map((_, i) =>
        `<span class="star${i < product.rating ? '' : ' empty'}">${i < product.rating ? '★' : '☆'}</span>`
    ).join('');

    container.innerHTML = `
        <div class="detail-gallery">
            <div class="detail-main-img">${product.emoji}</div>
            <div class="detail-thumbnails">
                <div class="detail-thumb active">${product.emoji}</div>
                <div class="detail-thumb">🎁</div>
                <div class="detail-thumb">📦</div>
                <div class="detail-thumb">🏷️</div>
            </div>
        </div>
        <div class="detail-info">
            <span class="section-tag">${product.category}</span>
            <h1>${product.name}</h1>
            <div class="rating">${stars} <span style="margin-left:8px; font-size:0.85rem; color:#9a939f;">(${product.rating}.0)</span></div>
            <div class="detail-price">
                ₹${product.price}
                ${product.originalPrice ? `<span class="original">₹${product.originalPrice}</span>` : ''}
            </div>
            <p class="detail-description">${product.description}</p>
            <ul class="detail-features">
                ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="quantity-selector">
                <button onclick="updateDetailQty(${product.price}, -1)">−</button>
                <span id="detailQty">1</span>
                <button onclick="updateDetailQty(${product.price}, 1)">+</button>
            </div>
            <div class="detail-actions">
                <button class="btn-primary" onclick="buyOnWhatsApp(${product.id}, true)">Buy via WhatsApp — ₹<span id="detailPriceBtn">${product.price}</span></button>
            </div>
        </div>
    `;
}

let detailQty = 1;
function updateDetailQty(price, delta) {
    detailQty = Math.max(1, detailQty + delta);
    document.getElementById('detailQty').textContent = detailQty;
    const btnPrice = document.getElementById('detailPriceBtn');
    if (btnPrice) {
        btnPrice.textContent = (price * detailQty);
    }
}

function buyOnWhatsApp(productId, isDetail = false) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const qty = isDetail ? detailQty : 1;
    const total = product.price * qty;
    const text = `Hi BloomWire! I'm interested in ordering:\n\n*${product.name}* (ID: ${product.id})\nQuantity: ${qty}\nTotal Price: ₹${total}\n\nPlease let me know the process.`;
    const phone = "910000000000    "; // Default phone number
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

// --- Cart Page ---
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    if (!cartContainer) return;

    const items = Cart.getItems();

    if (items.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p style="color:#9a939f;">Looks like you haven't added any flowers yet.</p>
                <a href="product.html" class="btn-primary" style="margin-top: 20px; display:inline-flex;">Browse Collection</a>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    if (cartSummary) cartSummary.style.display = 'block';

    cartContainer.innerHTML = items.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        return `
            <div class="cart-item">
                <div class="cart-item-img">${product.emoji}</div>
                <div class="cart-item-info">
                    <h4>${product.name}</h4>
                    <p>${product.category} · ₹${product.price} each</p>
                    <div class="quantity-selector" style="margin:8px 0 0; transform: scale(0.85); transform-origin: left;">
                        <button onclick="changeCartQty(${product.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="changeCartQty(${product.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-price">₹${product.price * item.qty}</div>
                <button class="cart-item-remove" onclick="removeCartItem(${product.id})">✕</button>
            </div>
        `;
    }).join('');

    // Update summary
    const subtotal = Cart.getTotal();
    const shipping = subtotal > 500 ? 0 : 49;
    const total = subtotal + shipping;

    if (cartSummary) {
        cartSummary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
            <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : '₹' + shipping}</span></div>
            <div class="summary-row"><span>Tax (GST 5%)</span><span>₹${Math.round(subtotal * 0.05)}</span></div>
            <div class="summary-row total"><span>Total</span><span>₹${total + Math.round(subtotal * 0.05)}</span></div>
            <button class="btn-primary" onclick="showToast('Checkout coming soon!', '🚀')">Proceed to Checkout</button>
            <a href="product.html" class="btn-outline">Continue Shopping</a>
            ${shipping > 0 ? '<p style="font-size:0.8rem; color:#9a939f; text-align:center; margin-top:16px;">Free shipping on orders above ₹500</p>' : ''}
        `;
    }
}

function changeCartQty(productId, delta) {
    const items = Cart.getItems();
    const item = items.find(i => i.id === productId);
    if (item) {
        const newQty = item.qty + delta;
        if (newQty <= 0) {
            Cart.remove(productId);
        } else {
            Cart.updateQty(productId, newQty);
        }
        renderCart();
    }
}

function removeCartItem(productId) {
    Cart.remove(productId);
    renderCart();
    showToast('Removed from cart', '🗑️');
}

// --- FAQ Accordion ---
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            faqItems.forEach(i => i.classList.remove('open'));
            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });
}

// --- Mobile Nav Toggle ---
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }
}

// --- Scroll Reveal ---
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// --- Back to Top ---
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- Contact Form ---
function handleContactSubmit(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.', '📬');
    e.target.reset();
}

// --- Newsletter ---
function handleNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input && input.value) {
        showToast('Welcome to the BloomWire family! 🌸', '💌');
        input.value = '';
    }
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initBackToTop();
    initScrollReveal();

    // Page-specific inits
    renderFeatured();
    renderProductDetail();
    initFAQ();

    // If on products page, render all
    if (document.getElementById('productGrid') && !document.getElementById('productDetail')) {
        renderProducts(products);
    }

    // Newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', handleNewsletter);
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});