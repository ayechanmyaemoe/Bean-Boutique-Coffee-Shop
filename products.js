let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

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
  localStorage.setItem("cart", JSON.stringify(cartItems));

  saveCart();
  loadCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalCount;
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
      const container = document.getElementById("productListWrapper");

      data.forEach((item) => {
        const productHTML = `
        <div class="col">
          <div class="product-card shadow-sm">
            <div class="img-bar"></div>
            <img src="${item.image}" alt="${item.title}" class="product-img w-100" />
            <div class="product-subtitle mt-3">${item.price} MMK</div>
            <div class="product-title">${item.title}</div>
            <div>${item.description}</div>
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
          const item = data[index];
          addToCart(item);
        });
      });
    })
    .catch((err) => {
      console.error("Failed to load products.json", err);
    });
});
