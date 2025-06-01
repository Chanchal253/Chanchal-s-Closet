"use strict";

// Responsive Navbar Toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.onclick = function () {
    return navLinks.classList.toggle('open');
  };
} // Example featured products (customize for your shop)


var featuredProducts = [{
  title: "Red Embroidered Saree",
  price: 1899,
  image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg"
}, {
  title: "White Summer Dress",
  price: 1599,
  image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80"
}, {
  title: "Crop Top & Lehenga",
  price: 2099,
  image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg"
}, {
  title: "Sequin Bodycon Dress",
  price: 2499,
  image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80"
}];
var featuredProductsDiv = document.getElementById('featuredProducts');

if (featuredProductsDiv) {
  featuredProducts.forEach(function (product) {
    var card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = "\n      <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n      <h3>").concat(product.title, "</h3>\n      <p>\u20B9").concat(product.price, "</p>\n      <button onclick=\"addToCart('").concat(product.title.replace(/'/g, "\\'"), "', ").concat(product.price, ", '").concat(product.image, "')\">\n        \u2795 Add to Cart\n      </button>\n    ");
    featuredProductsDiv.appendChild(card);
  });
} // Simple cart logic for demo (shared across pages using localStorage)


function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  var cart = getCart();
  var cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = cart.length;
}

window.addToCart = function (title, price, image) {
  var cart = getCart();
  cart.push({
    title: title,
    price: price,
    image: image
  });
  setCart(cart);
  alert("Added \"".concat(title, "\" to cart!"));
};

updateCartCount(); // Newsletter form demo

var newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.onsubmit = function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  };
}