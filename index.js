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
  saveCart();
  loadCartItems();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalCount;
}

window.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    title: "Welcome!",
    html: "Thank you for visiting our website ☕ <br> Sign up with your email today and enjoy 10% off your very first purchase!",
    icon: "info",
    confirmButtonText: "Get Started",
    confirmButtonColor: "#a16d28",
    backdrop: `rgba(0,0,0,0.4)`,
  });

  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar-section").innerHTML = data;
      updateCartCount();

      fetch("components/cart_sidebar.html")
        .then((res) => res.text())
        .then((data) => {
          document.getElementById("cart-sidebar-section").innerHTML = data;
          initializeCart();
          loadCartItems();
        });
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
});
