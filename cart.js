function initializeCart() {
  const openCartBtn = document.getElementById("openCart");
  const closeCartBtn = document.getElementById("closeCart");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  if (!openCartBtn || !closeCartBtn || !cartSidebar || !cartOverlay) {
    console.warn("Cart elements not found!");
    return;
  }

  openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add("active");
  });

  closeCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
  });

  cartOverlay.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove("active");
  });

  loadCartItems();
}

function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const cartSubtotal = document.getElementById("cartSubtotal");

  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML =
      "<p class='text-muted'>Your cart is empty.</p>";
    cartSubtotal.textContent = "0.00";
    return;
  }

  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${Array.isArray(item.image) ? item.image[0] : item.image}" alt="${item.title}" class="cart-img" />
        <div class="cart-item-detail">
          <div class="cart-item-hdr">
            <strong>${item.title}</strong>
            <span>${item.price.toLocaleString()} MMK</span>
          </div>
          <p class="text-muted mb-1">${item.size || "12.0 oz"}</p>
          <div class="d-flex align-items-center gap-4">
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${
              item.id
            }, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${
              item.id
            }, 1)">+</button>
          </div>
        </div>
        <div
          class="subscription-box p-2 d-flex justify-content-between align-items-center w-100"
        >
          <div class="flex-grow-1">
            <input type="checkbox" checked /> Subscribed
          </div>
          <select class="form-select form-select-sm w-auto">
            <option value="1">Every week</option>
            <option value="2" selected>Every 2 weeks</option>
            <option value="3">Every 3 weeks</option>
            <option value="4">Every month</option>
          </select>
        </div>
      </div>
    `;
  });

  cartSubtotal.textContent = subtotal.toLocaleString();
}

function updateQuantity(itemId, update) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((p) => p.id === itemId);
  if (!item) return;

  item.quantity += update;

  if (item.quantity <= 0) {
    cart = cart.filter((p) => p.id !== itemId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  loadCartItems();
}
