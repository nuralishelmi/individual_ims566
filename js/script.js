/* ========================= CART FUNCTION ========================= */

let cart = [];

function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) item.qty += 1;
    else cart.push({ name, price, qty: 1 });

    updateCartUI();
}

function updateCartUI() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount')?.innerText = count;
    document.getElementById('dashboardCartCount')?.innerText = count;

    const tbody = document.getElementById('cartTableBody');
    if (tbody) {
        tbody.innerHTML = '';
        let subtotal = 0;

        cart.forEach((it, idx) => {
            const row = document.createElement('tr');
            const amt = it.price * it.qty;
            subtotal += amt;

            row.innerHTML = `
                <td>${it.name}</td>
                <td><input type='number' min='1' value='${it.qty}' class='form-control form-control-sm' onchange='changeQty(${idx}, this.value)'></td>
                <td>RM ${amt.toFixed(2)}</td>
                <td><button class='btn btn-sm btn-danger' onclick='removeItem(${idx})'>Remove</button></td>
            `;
            tbody.appendChild(row);
        });

        document.getElementById('cartSubtotal').innerText = `RM ${subtotal.toFixed(2)}`;
    }
}

function changeQty(index, value) {
    cart[index].qty = Number(value);
    updateCartUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/* ========================= LOGIN / REGISTER ========================= */

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pw = document.getElementById('loginPassword').value;

    if (email === 'student@example.com' && pw === 'password123') {
        alert('Login success (demo)');
        localStorage.setItem("loggedInUser", JSON.stringify({ name: "Student", email }));
        window.location = 'dashboard.html';
    } else {
        alert('Invalid credentials. Use student@example.com / password123 for demo.');
    }
}

function handleRegister(e) {
    e.preventDefault();
    alert("Registered (demo). Please login using the demo account.");
    window.location = "login.html";
}

function showRegister() {
    document.getElementById('registerSection').style.display = 'block';
}

/* ========================= CONTACT FORM ========================= */

function submitContact(e) {
    e.preventDefault();
    alert("Message sent (demo). Thank you!");
    document.getElementById("contactForm").reset();
}

/* ========================= FILTER PRODUCTS (MEN/WOMEN/KIDS) ========================= */

function filterProducts(category) {
    const items = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active-filter'));
    event.target.classList.add('active-filter');

    items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        item.style.display = (category === 'all' || itemCat === category) ? 'block' : 'none';
    });
}

/* ========================= FILTER BRAND (COLLECTION PAGE) ========================= */

function filterCategory(category) {
    const products = document.querySelectorAll(".category-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active-filter"));
    event.target.classList.add("active-filter");

    products.forEach(product => {
        product.style.display =
            category === "all" || product.dataset.category === category
                ? "block"
                : "none";
    });
}

/* ========================= SEARCH BAR ========================= */

function searchProducts() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) return alert("Please type something to search.");

    let found = false;
    document.querySelectorAll('.highlight-search').forEach(el => el.classList.remove('highlight-search'));

    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();

        if (name.includes(q)) {
            found = true;
            card.classList.add('highlight-search');

            if (!document._scrolledToFirst) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document._scrolledToFirst = true;
            }
        }
    });

    setTimeout(() => {
        document.querySelectorAll('.highlight-search').forEach(el =>
            el.classList.remove('highlight-search')
        );
        document._scrolledToFirst = false;
    }, 8000);

    if (!found) alert("No results found.");
}

/* ========================= INITIAL LOAD ========================= */
window.addEventListener('load', updateCartUI);

/* END OF SCRIPT */
