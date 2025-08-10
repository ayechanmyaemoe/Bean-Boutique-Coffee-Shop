let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function addToCart(item) {
  const existingItem = cartItems.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }
  saveCart();
  loadCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const distinctCount = cartItems.length;
  document.getElementById("cart-count").textContent = distinctCount;
}

function renderProducts(list) {
  const container = document.getElementById("productListWrapper");
  container.innerHTML = "";

  list.forEach((item) => {
    const productHTML = `
      <div class="col">
        <div class="product-card shadow-sm">
          <a href="bean-detail.html?id=${
            item.id
          }" class="text-decoration-none text-dark">
            <div class="img-bar"></div>
            <img src="${item.image}" alt="${
      item.title
    }" class="product-img w-100" />
            <div class="product-subtitle mt-3">${item.price.toLocaleString()} MMK</div>
            <div class="product-title">${item.title}</div>
            <div>${item.note}</div>
          </a>
          <div class="roast-scale-wrapper my-3">
            <div class="d-flex justify-content-between px-4 text-uppercase small text-muted fw-semibold">
              <span>Light</span>
              <span>Dark</span>
            </div>
            <div class="position-relative px-4">
              <div class="roast-line bg-dark mt-1 mb-2" style="height: 2px"></div>
              <div class="roast-marker" style="left: ${item.roast}%">
                <span>☕</span>
              </div>
            </div>
          </div>
          <a href="#" class="btn btn-coffee add-to-cart">Add to Cart</a>
        </div>
      </div>
    `;
    container.innerHTML += productHTML;
  });

  document.querySelectorAll(".add-to-cart").forEach((button, index) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const item = list[index];
      addToCart(item);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-section").innerHTML = data;
      updateCartCount();
    });

  fetch("components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-section").innerHTML = data;

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
    });

  fetch("components/cart_sidebar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("cart-sidebar-section").innerHTML = data;
      initializeCart();
      loadCartItems();
    });

  fetch("json/products.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      renderProducts(allProducts);
    })
    .catch((err) => {
      console.error("Failed to load products.json", err);
    });

  document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase().trim();
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
  });
});
