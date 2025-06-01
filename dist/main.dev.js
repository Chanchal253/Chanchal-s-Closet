"use strict";

// --------- CART LOGIC (Shared Across Pages) ---------
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
}; // --------- NAVBAR TOGGLE FOR MOBILE ---------


var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.onclick = function () {
    return navLinks.classList.toggle('open');
  };
} // --------- SHOP PAGE: FILTER PRODUCTS ---------


if (document.getElementById('shopProducts')) {
  var renderShopProducts = function renderShopProducts() {
    var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
    var grid = document.getElementById('shopProducts');
    grid.innerHTML = '';
    var filtered = category === 'all' ? allProducts : allProducts.filter(function (p) {
      return p.category === category;
    });
    filtered.forEach(function (product) {
      var card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = "\n        <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\">\n        <h3>").concat(product.title, "</h3>\n        <p>\u20B9").concat(product.price, "</p>\n        <a href=\"product.html?title=").concat(encodeURIComponent(product.title), "\" class=\"btn\">View</a>\n        <button onclick=\"addToCart('").concat(product.title.replace(/'/g, "\\'"), "', ").concat(product.price, ", '").concat(product.image, "')\">\n          \u2795 Add to Cart\n        </button>\n      ");
      grid.appendChild(card);
    });
  };

  // Example product data
  var allProducts = [{
    title: "Red Embroidered Saree",
    price: 1899,
    image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg",
    category: "indian"
  }, {
    title: "Green Anarkali Suit",
    price: 2199,
    image: "https://assets.utsavfashion.com/media/catalog/product/g/r/green-net-anarkali-suit-with-dupatta-1-1-1-v1.jpg",
    category: "indian"
  }, {
    title: "White Summer Dress",
    price: 1599,
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80",
    category: "western"
  }, {
    title: "Crop Top & Lehenga",
    price: 2099,
    image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg",
    category: "indo-western"
  }, {
    title: "Sequin Bodycon Dress",
    price: 2499,
    image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80",
    category: "party-wear"
  }];
  window.filterProducts = renderShopProducts;
  renderShopProducts();
} // --------- PRODUCT PAGE: LOAD PRODUCT DETAILS ---------


if (document.getElementById('productDetail')) {
  var params = new URLSearchParams(window.location.search);
  var title = params.get('title') || "Red Embroidered Saree";
  var products = [{
    title: "Red Embroidered Saree",
    price: 1899,
    image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg",
    desc: "A beautiful red saree perfect for festive occasions."
  }, {
    title: "White Summer Dress",
    price: 1599,
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80",
    desc: "Lightweight, stylish, and comfortable summer dress."
  }, {
    title: "Crop Top & Lehenga",
    price: 2099,
    image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg",
    desc: "Trendy Indo-western outfit for parties."
  }, {
    title: "Sequin Bodycon Dress",
    price: 2499,
    image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80",
    desc: "Shimmery party-wear dress for a glamorous look."
  }];
  var product = products.find(function (p) {
    return p.title === title;
  }) || products[0];
  document.getElementById('productDetail').innerHTML = "\n    <img src=\"".concat(product.image, "\" alt=\"").concat(product.title, "\" style=\"width:220px;border-radius:10px;\">\n    <h2>").concat(product.title, "</h2>\n    <p><strong>\u20B9").concat(product.price, "</strong></p>\n    <p>").concat(product.desc, "</p>\n    <button onclick=\"addToCart('").concat(product.title.replace(/'/g, "\\'"), "', ").concat(product.price, ", '").concat(product.image, "')\">\u2795 Add to Cart</button>\n  ");
} // --------- CART PAGE: RENDER CART ITEMS ---------


if (document.getElementById('cartItems')) {
  var renderCart = function renderCart() {
    var cart = getCart();
    var div = document.getElementById('cartItems');

    if (cart.length === 0) {
      div.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    var total = 0;
    div.innerHTML = cart.map(function (item, idx) {
      total += item.price;
      return "\n        <div class=\"cart-item\">\n          <img src=\"".concat(item.image, "\" alt=\"").concat(item.title, "\" style=\"width:50px;border-radius:6px;\">\n          <span>").concat(item.title, "</span>\n          <span>\u20B9").concat(item.price, "</span>\n          <button onclick=\"removeFromCart(").concat(idx, ")\">Remove</button>\n        </div>\n      ");
    }).join('') + "<div style=\"margin-top:1rem;font-weight:bold;\">Total: \u20B9".concat(total, "</div>");
  };

  window.removeFromCart = function (idx) {
    var cart = getCart();
    cart.splice(idx, 1);
    setCart(cart);
    renderCart();
  };

  renderCart();
} // --------- CHECKOUT PAGE: HANDLE CHECKOUT ---------


if (document.getElementById('checkoutForm')) {
  document.getElementById('checkoutForm').onsubmit = function (e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    alert('Order placed! Thank you for shopping at Chanchal\'s Closet.');
    window.location.href = "thankyou.html";
  };
} // --------- NEWSLETTER DEMO ---------


if (document.getElementById('newsletterForm')) {
  document.getElementById('newsletterForm').onsubmit = function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
  };
} // --------- INITIALIZE CART COUNT ON EVERY PAGE ---------


updateCartCount();

document.getElementById('checkoutForm').onsubmit = function (e) {
  // Before submitting, fill the hidden order field with cart data
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var orderSummary = cart.map(function (item, idx) {
    return idx + 1 + ". " + item.title + " (₹" + item.price + ")";
  }).join('\n');
  document.getElementById('orderField').value = orderSummary || "Cart empty"; // (Optional) Clear cart after order

  localStorage.removeItem('cart'); // Let the form submit to Formspree
};

document.getElementById('checkoutForm').onsubmit = function () {
  var cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var orderSummary = cart.map(function (item, idx) {
    return idx + 1 + ". " + item.title + " (₹" + item.price + ") x " + (item.qty || 1);
  }).join('\n');
  document.getElementById('orderField').value = orderSummary || "Cart empty"; // Optionally clear cart after order

  localStorage.removeItem('cart');
};