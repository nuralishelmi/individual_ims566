// script.js - Shared behaviours for the site

// Utility: get element
const $ = (q) => document.querySelector(q);

// show year footer
document.addEventListener('DOMContentLoaded', ()=> {
  const y = new Date().getFullYear();
  const e = document.getElementById('year');
  if(e) e.innerText = y;
});

// ------------ AUTH (Simulated) ------------
function handleLogin(ev){
  ev.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const alertBox = document.getElementById('loginAlert');

  // hardcoded credentials
  if(email === 'user@example.com' && password === 'password123'){
    // "login" success -> redirect to dashboard
    alertBox.classList.add('d-none');
    // store a flag in sessionStorage for demo (not secure)
    sessionStorage.setItem('ss_logged_in','true');
    location.href = 'dashboard.html';
  } else {
    alertBox.classList.remove('d-none');
    alertBox.innerText = 'Invalid username or password. Try user@example.com / password123';
  }
}

// ------------ PRODUCTS RENDERING ------------
function createProductCard(p){
  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card product-card p-2 h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body p-2">
          <h6 class="card-title mb-1">${p.name}</h6>
          <div class="d-flex justify-content-between align-items-center">
            <div class="text-muted small">RM ${p.price.toFixed(2)}</div>
            <div><span class="badge bg-light text-muted">Stock ${p.stock}</span></div>
          </div>
          <div class="mt-2 d-flex gap-2">
            <a href="product.html?id=${p.id}" class="btn btn-sm btn-outline-orange w-100">View</a>
            <button onclick="addToCart(${p.id})" class="btn btn-sm btn-orange w-100">Add</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(list){
  const grid = document.getElementById('productGrid') || document.getElementById('categoryGrid');
  if(!grid) return;
  grid.innerHTML = list.map(p => createProductCard(p)).join('');
}

// Load initial products on index/categories
document.addEventListener('DOMContentLoaded', function() {
  const products = window.SS_PRODUCTS || [];
  if(document.getElementById('productGrid')){
    renderProducts(products);
  }
  if(document.getElementById('categoryGrid')){
    renderProducts(products);
  }
  // product detail page
  if(document.getElementById('productDetail')){
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('id'));
    const prod = products.find(p => p.id === id) || products[0];
    document.getElementById('productDetail').innerHTML = `
      <div class="row g-3">
        <div class="col-md-5"><img src="${prod.img}" class="img-fluid rounded-3" alt=""></div>
        <div class="col-md-7">
          <h4>${prod.name}</h4>
          <div class="mb-2 text-muted">Category: ${prod.category}</div>
          <div class="mb-2 h4">RM ${prod.price.toFixed(2)}</div>
          <p>${prod.desc}</p>
          <div class="mb-2">Stock: <strong>${prod.stock}</strong></div>
          <div class="d-flex gap-2">
            <button class="btn btn-orange" onclick="addToCart(${prod.id})">Add to cart</button>
            <a href="index.html" class="btn btn-outline-orange">Back</a>
          </div>
        </div>
      </div>
    `;
  }
});

// ------------ SEARCH & FILTER ------------
function searchProducts(){
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const filtered = window.SS_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(filtered);
}

function filterCategory(cat){
  if(cat === 'All') renderProducts(window.SS_PRODUCTS);
  else renderProducts(window.SS_PRODUCTS.filter(p => p.category === cat));
}

// ------------ CART (simulated) ------------
function addToCart(id){
  // simple simulated cart in localStorage
  const products = window.SS_PRODUCTS || [];
  const prod = products.find(p => p.id === id);
  if(!prod){ alert('Product not found'); return; }
  let cart = JSON.parse(localStorage.getItem('ss_cart') || '[]');
  cart.push({ id: prod.id, name: prod.name, price: prod.price });
  localStorage.setItem('ss_cart', JSON.stringify(cart));
  alert(${prod.name} added to cart (simulated).);
}