// Responsive Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.onclick = () => navLinks.classList.toggle('open');
}

// Example featured products (customize for your shop)
const featuredProducts = [
  {
    title: "Red Embroidered Saree",
    price: 1899,
    image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg"
  },
  {
    title: "White Summer Dress",
    price: 1599,
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80"
  },
  {
    title: "Crop Top & Lehenga",
    price: 2099,
    image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg"
  },
  {
    title: "Sequin Bodycon Dress",
    price: 2499,
    image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80"
  }
];

const featuredProductsDiv = document.getElementById('featuredProducts');
if (featuredProductsDiv) {
  featuredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
        ➕ Add to Cart
      </button>
    `;
    featuredProductsDiv.appendChild(card);
  });
}

// Simple cart logic for demo (shared across pages using localStorage)
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
updateCartCount();

// Newsletter form demo
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.onsubmit = function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  }
}
