// --------- CART LOGIC (Shared Across Pages) ---------
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = cart.length;
}
window.addToCart = function(title, price, image) {
  const cart = getCart();
  cart.push({title, price, image});
  setCart(cart);
  alert(`Added "${title}" to cart!`);
};

// --------- NAVBAR TOGGLE FOR MOBILE ---------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.onclick = () => navLinks.classList.toggle('open');
}

// --------- SHOP PAGE: FILTER PRODUCTS ---------
if (document.getElementById('shopProducts')) {
  // Example product data
  const allProducts = [
    { title: "Red Embroidered Saree", price: 1899, image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg", category: "indian" },
    { title: "Green Anarkali Suit", price: 2199, image: "https://assets.utsavfashion.com/media/catalog/product/g/r/green-net-anarkali-suit-with-dupatta-1-1-1-v1.jpg", category: "indian" },
    { title: "White Summer Dress", price: 1599, image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80", category: "western" },
    { title: "Crop Top & Lehenga", price: 2099, image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg", category: "indo-western" },
    { title: "Sequin Bodycon Dress", price: 2499, image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80", category: "party-wear" }
  ];
  function renderShopProducts(category = 'all') {
    const grid = document.getElementById('shopProducts');
    grid.innerHTML = '';
    const filtered = category === 'all' ? allProducts : allProducts.filter(p => p.category === category);
    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>₹${product.price}</p>
        <a href="product.html?title=${encodeURIComponent(product.title)}" class="btn">View</a>
        <button onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
          ➕ Add to Cart
        </button>
      `;
      grid.appendChild(card);
    });
  }
  window.filterProducts = renderShopProducts;
  renderShopProducts();
}

// --------- PRODUCT PAGE: LOAD PRODUCT DETAILS ---------
if (document.getElementById('productDetail')) {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title') || "Red Embroidered Saree";
  const products = [
    { title: "Red Embroidered Saree", price: 1899, image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg", desc: "A beautiful red saree perfect for festive occasions." },
    { title: "White Summer Dress", price: 1599, image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80", desc: "Lightweight, stylish, and comfortable summer dress." },
    { title: "Crop Top & Lehenga", price: 2099, image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg", desc: "Trendy Indo-western outfit for parties." },
    { title: "Sequin Bodycon Dress", price: 2499, image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80", desc: "Shimmery party-wear dress for a glamorous look." }
  ];
  const product = products.find(p => p.title === title) || products[0];
  document.getElementById('productDetail').innerHTML = `
    <img src="${product.image}" alt="${product.title}" style="width:220px;border-radius:10px;">
    <h2>${product.title}</h2>
    <p><strong>₹${product.price}</strong></p>
    <p>${product.desc}</p>
    <button onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">➕ Add to Cart</button>
  `;
}

// --------- CART PAGE: RENDER CART ITEMS ---------
if (document.getElementById('cartItems')) {
  function renderCart() {
    const cart = getCart();
    const div = document.getElementById('cartItems');
    if (cart.length === 0) {
      div.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
    let total = 0;
    div.innerHTML = cart.map((item, idx) => {
      total += item.price;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" style="width:50px;border-radius:6px;">
          <span>${item.title}</span>
          <span>₹${item.price}</span>
          <button onclick="removeFromCart(${idx})">Remove</button>
        </div>
      `;
    }).join('') + `<div style="margin-top:1rem;font-weight:bold;">Total: ₹${total}</div>`;
  }
  window.removeFromCart = function(idx) {
    const cart = getCart();
    cart.splice(idx, 1);
    setCart(cart);
    renderCart();
  };
  renderCart();
}

// --------- CHECKOUT PAGE: HANDLE CHECKOUT ---------
if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').onsubmit = function(e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    alert('Order placed! Thank you for shopping at Chanchal\'s Closet.');
    window.location.href = "thankyou.html";
  };
}

// --------- NEWSLETTER DEMO ---------
if (document.getElementById('newsletterForm')) {
  document.getElementById('newsletterForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
  }
}

// --------- INITIALIZE CART COUNT ON EVERY PAGE ---------
updateCartCount();
