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
});