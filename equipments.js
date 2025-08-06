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

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    '<i class="bi bi-star-fill text-warning"></i>'.repeat(fullStars) +
    (halfStar ? '<i class="bi bi-star-half text-warning"></i>' : "") +
    '<i class="bi bi-star text-warning"></i>'.repeat(emptyStars)
  );
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

  fetch("json/equipments.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("equipmentContainer");

      data.forEach((item) => {
        const stars = renderStars(item.rating);

        const html = `
          <div class="row align-items-center g-4 mb-5 shadow px-4 pb-4 rounded" id="equipmentCard">
            <div class="col-md-6">
              <div class="row">
                  ${item.image
                    .map(
                      (src) =>
                        `<img src="${src}" alt="${item.title}" class="img-fluid rounded w-50" />`
                    )
                    .join("")}
              </div>
            </div>
            <div class="col-md-6 row g-2">
              <div class="d-flex align-items-center justify-content-between">
                <h2 class="fw-bold">${item.title}</h2>
              <span>${item.price.toLocaleString()} MMK</span>
              </div>
              <p class="text-muted">${item.description}</p>
              <div class="badgeAndRateContainer">
                <span class="badge bg-warning text-dark">${item.badge}</span>
                <div class="rating">${stars}</div>
              </div>
              <a href="#" class="btn btn-coffee add-to-cart">Add To Cart</a>
              <p class="text-muted">${item.delivery}</p>
            </div>
          </div>
        `;

        container.innerHTML += html;
      });

      document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          const item = data[index];
          addToCart(item);
        });
      });
    })
    .catch((error) => {
      console.error("Error loading equipments:", error);
    });
});
