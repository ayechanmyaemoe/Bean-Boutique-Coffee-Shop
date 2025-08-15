function renderNavbar() {
  document.getElementById("navbar-section").innerHTML = `
    <!-- Announcement Banner -->
    <div class="promo-banner">GET 25% OFF YOUR FIRST ORDER >> CODE: NEWBEANIE</div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">☕ BEAN BOUTIQUE</a>

        <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        >
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <!-- Products Dropdown -->
            <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item dropdown">
            <a
                class="nav-link dropdown-toggle"
                href="#"
                id="productsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Products
            </a>
            <ul class="dropdown-menu" aria-labelledby="productsDropdown">
                <li>
                <a class="dropdown-item" href="beans.html">Coffee Beans</a>
                </li>
                <li>
                <a class="dropdown-item" href="equipments.html">Brewing Kits</a>
                </li>
            </ul>
            </li>

            <li class="nav-item">
            <a class="nav-link" href="subscriptions.html">Subscriptions</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="events.html">Events & Workshops</a>
            </li>
        </ul>

        <div class="d-flex flex-row g-2">
            <!-- Shopping Cart -->
            <div class="position-relative">
            <a href="#" class="btn btn-outline-dark" id="openCart">
                <i class="bi bi-cart3 fs-5"></i>
            </a>
            <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                id="cart-count"
            >
                0
            </span>
            </div>
        </div>
        </div>
    </div>
    </nav>
  `;
  updateCartCount();
}

function renderFooter() {
  document.getElementById("footer-section").innerHTML = `
    <!-- Footer -->
    <footer class="pt-5 pb-4">
    <div class="container text-md-start">
        <div class="row">
        <!-- Branding -->
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h5 class="fw-bold text-uppercase mb-3">Bean Boutique</h5>
            <p>
            Your go-to source for fresh, artisan, hand-roasted coffee delivered to
            your door.
            </p>
        </div>

        <!-- Navigation Links -->
        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Quick Links</h6>
            <ul class="list-unstyled">
            <li><a href="beans.html" class="footer-link">Shop</a></li>
            <li><a href="subscriptions.html" class="footer-link">Subscriptions</a></li>
            <li><a href="equipments.html" class="footer-link">Equipments</a></li>
            <li><a href="events.html" class="footer-link">Events</a></li>
            </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Newsletter</h6>
            <p>Join our newsletter to get special offers & brewing tips!</p>
            <form id="newsletterForm" class="d-flex">
            <input
                type="email"
                class="form-control rounded-start"
                placeholder="Email address"
            />
            <button class="btn btn-coffee rounded-end ms-1" type="submit">
                Join
            </button>
            </form>
        </div>

        <!-- Social Media -->
        <div class="col-md-3 col-lg-3 col-xl-2 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Follow Us</h6>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-white me-3"
            ><i class="bi bi-facebook fs-5"></i
            ></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-white me-3"
            ><i class="bi bi-instagram fs-5"></i
            ></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-white me-3"
            ><i class="bi bi-twitter fs-5"></i
            ></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="text-white"><i class="bi bi-youtube fs-5"></i></a>
        </div>
        </div>
        <hr class="border-light mt-4" />
        <div class="text-center small">
        © 2025 Bean Boutique. All rights reserved.
        </div>
    </div>
    </footer>
  `;

  const form = document.getElementById("newsletterForm");
  const emailInput = form.querySelector("input[type='email']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email to join the newsletter.",
        confirmButtonColor: "#8B4513",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#8B4513",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: "Our squirrel driven automation machines are shipping you a welcome email that should hit your inbox today.",
      confirmButtonColor: "#8B4513",
    });

    emailInput.value = "";
  });
}

function renderCartSidebar() {
  document.getElementById("cart-sidebar-section").innerHTML = `
    <!-- Cart Sidebar -->
    <div id="cartSidebar" class="cart-sidebar">
    <div
        class="cart-header d-flex justify-content-between align-items-center mb-4"
    >
        <h4 class="mb-0">Your Cart</h4>
        <button class="btn btn-close" id="closeCart"></button>
    </div>

    <div class="cart-items-wrapper">
        <div id="cartItems" class="cart-items"></div>

        <div class="mt-4 cart-subtotal">
        <p class="d-flex justify-content-between fs-5">
            <strong>Subtotal:</strong>
            <strong><span id="cartSubtotal">0.00</span> MMK</strong>
        </p>
        <button class="btn btn-warning w-100 fw-bold">CHECKOUT</button>
        <p class="text-muted mt-2 text-center">
            Ships in 1-2 days from Raleigh, NC
        </p>
        </div>
    </div>
    </div>

    <div id="cartOverlay" class="cart-overlay"></div>
  `;

  initializeCart();
  loadCartItems();
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const distinctCount = cartItems.length;
  document.getElementById("cart-count").textContent = distinctCount;
}

window.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  renderFooter();
  renderCartSidebar();
});