const productsData = {
  indian: [
    {
      title: "Red Embroidered Saree",
      price: 1899,
      image: "https://assets.utsavfashion.com/media/catalog/product/r/e/red-georgette-saree-with-blouse-1-1-1-v1.jpg"
    },
    {
      title: "Green Anarkali Suit",
      price: 2199,
      image: "https://assets.utsavfashion.com/media/catalog/product/g/r/green-net-anarkali-suit-with-dupatta-1-1-1-v1.jpg"
    },
    {
      title: "Blue Salwar Kameez",
      price: 1699,
      image: "https://assets.utsavfashion.com/media/catalog/product/b/l/blue-cotton-salwar-kameez-1-1-1-v1.jpg"
    }
  ],
  western: [
    {
      title: "White Summer Dress",
      price: 1599,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Denim Jacket & Tee",
      price: 1499,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Floral Midi Dress",
      price: 1299,
      image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&w=400&q=80"
    }
  ],
  "indo-western": [
    {
      title: "Crop Top & Lehenga",
      price: 2099,
      image: "https://assets.utsavfashion.com/media/catalog/product/c/r/crop-top-lehenga-in-pink-1-1-1-v1.jpg"
    },
    {
      title: "Jacket Style Kurti",
      price: 999,
      image: "https://assets.utsavfashion.com/media/catalog/product/j/a/jacket-style-kurti-in-blue-1-1-1-v1.jpg"
    },
    {
      title: "Cape Gown",
      price: 1799,
      image: "https://assets.utsavfashion.com/media/catalog/product/c/a/cape-gown-in-navy-blue-1-1-1-v1.jpg"
    }
  ],
  "party-wear": [
    {
      title: "Sequin Bodycon Dress",
      price: 2499,
      image: "https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&w=400&q=80"
    },
    {
      title: "Black Evening Gown",
      price: 2899,
      image: "https://assets.utsavfashion.com/media/catalog/product/b/l/black-net-gown-with-dupatta-1-1-1-v1.jpg"
    },
    {
      title: "Rose Gold Party Dress",
      price: 2199,
      image: "https://images.pexels.com/photos/415318/pexels-photo-415318.jpeg?auto=compress&w=400&q=80"
    }
  ],
  arrivals: [
    {
      title: "Trendy Printed Kurti",
      price: 799,
      image: "https://assets.utsavfashion.com/media/catalog/product/p/r/printed-kurti-in-mustard-yellow-1-1-1-v1.jpg"
    },
    {
      title: "Chic Skirt",
      price: 999,
      image: "https://images.pexels.com/photos/1488471/pexels-photo-1488471.jpeg?auto=compress&w=400&q=80"
    }
  ]
};

const menuBtn = document.getElementById('menuBtn');
const menuDrawer = document.getElementById('menuDrawer');
const closeMenu = document.getElementById('closeMenu');
const cartBtn = document.getElementById('cartBtn');
const checkoutSection = document.getElementById('checkoutSection');
const productScroll = document.getElementById('productScroll');
const sectionTitle = document.getElementById('sectionTitle');
const cartCount = document.getElementById('cartCount');
const cartItemsDiv = document.getElementById('cartItems');
const homeBtn = document.getElementById('homeBtn');
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const productsSection = document.getElementById('productsSection');

let cart = [];

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function renderCartItems() {
  cartItemsDiv.innerHTML = "";
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutSection.style.display = "none";
    return;
  }
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <span class="cart-item-title">${item.title}</span>
      <span>₹${item.price}</span>
      <button class="cart-item-remove" title="Remove" onclick="removeFromCart(${idx})">🗑️</button>
    `;
    cartItemsDiv.appendChild(div);
  });
  const totalDiv = document.createElement('div');
  totalDiv.style = "margin-top:0.7rem;font-weight:bold;color:var(--secondary);";
  totalDiv.innerHTML = `Total: ₹${total}`;
  cartItemsDiv.appendChild(totalDiv);
}

window.addToCart = function(title, price, image) {
  cart.push({title, price, image});
  updateCartCount();
  renderCartItems();
  checkoutSection.style.display = "block";
  window.scrollTo({top: checkoutSection.offsetTop - 50, behavior: 'smooth'});
};

window.removeFromCart = function(idx) {
  cart.splice(idx, 1);
  updateCartCount();
  renderCartItems();
  if (cart.length === 0) {
    checkoutSection.style.display = "none";
  }
};

function renderProducts(section) {
  productScroll.innerHTML = "";
  let products = [];
  let title = "Shop New Arrivals";
  if (section && productsData[section]) {
    products = productsData[section];
    title = {
      "indian": "Indian Collection",
      "western": "Western Collection",
      "indo-western": "Indo-western Collection",
      "party-wear": "Party-wear Collection"
    }[section] || "Shop New Arrivals";
  } else {
    products = [
      ...productsData.arrivals,
      ...productsData.indian.slice(0,1),
      ...productsData.western.slice(0,1),
      ...productsData["party-wear"].slice(0,1)
    ];
  }
  sectionTitle.textContent = title;
  products.forEach(product => {
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
    productScroll.appendChild(card);
  });
}

menuBtn.onclick = () => menuDrawer.classList.add('open');
closeMenu.onclick = () => menuDrawer.classList.remove('open');
menuDrawer.querySelectorAll('a').forEach(link => {
  link.onclick = (e) => {
    e.preventDefault();
    const section = link.getAttribute('data-section');
    renderProducts(section);
    menuDrawer.classList.remove('open');
    window.scrollTo({top: productsSection.offsetTop - 50, behavior: 'smooth'});
  };
});

cartBtn.onclick = () => {
  if (cart.length > 0) {
    checkoutSection.style.display = (checkoutSection.style.display === "block") ? "none" : "block";
    if (checkoutSection.style.display === "block") {
      window.scrollTo({top: checkoutSection.offsetTop - 50, behavior: 'smooth'});
    }
  } else {
    alert("Your cart is empty!");
  }
};

homeBtn.onclick = () => {
  renderProducts();
  window.scrollTo({top: 0, behavior: 'smooth'});
};

searchBtn.onclick = () => {
  searchBar.style.display = "flex";
  searchInput.focus();
};
searchClose.onclick = () => {
  searchBar.style.display = "none";
  searchInput.value = "";
  renderProducts();
};
searchInput.oninput = () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts();
    return;
  }
  let allProducts = [];
  Object.values(productsData).forEach(arr => allProducts = allProducts.concat(arr));
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(query));
  productScroll.innerHTML = "";
  sectionTitle.textContent = `Search Results`;
  if (filtered.length === 0) {
    productScroll.innerHTML = "<p>No products found.</p>";
  } else {
    filtered.forEach(product => {
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
      productScroll.appendChild(card);
    });
  }
};

document.getElementById('addressForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Order placed! Thank you for shopping at Chanchal\'s Closet.');
  this.reset();
  cart = [];
  updateCartCount();
  renderCartItems();
  checkoutSection.style.display = "none";
};

renderProducts();
updateCartCount();
renderCartItems();
