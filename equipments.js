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
  allEquipments = [
    {
      id: 1,
      title: "Filter Coffee Machine",
      price: 600000,
      description:
        "Handmade in the Netherlands, it extracts with perfect precision - for filter coffee that tastes like it was brewed by hand.",
      image: [
        "images/equipments/filter_coffee_machine_1.png",
        "images/equipments/filter_coffee_machine_2.png",
      ],
      badge: "BestSeller",
      rating: 4.5,
      delivery: "Delivery 1 to 3 days in Local",
      quantity: 0,
    },
    {
      id: 2,
      title: "Espresso Machine",
      price: 500000,
      description:
        "The new Appartamento TCA from Rocket is the further development of the popular espresso machine. It not only has a noble design, but also a new brewing group, improved temperature control and is particularly energy efficient thanks to standby function.",
      image: [
        "images/equipments/expresso_machine_1.png",
        "images/equipments/expresso_machine_2.png",
      ],
      badge: "Premium",
      rating: 5,
      delivery: "Free shipping nationwide",
      quantity: 0,
    },
    {
      id: 3,
      title: "Hand Coffee Grinder",
      price: 200000,
      description:
        "The Timemore S3 manual coffee grinder combines a robust housing with new patented S2C890 burrs for better grinding uniformity and a precise adjustment system - ideal for espresso to French press.",
      image: [
        "images/equipments/coffee-grinder-1.png",
        "images/equipments/coffee-grinder-2.png",
      ],
      badge: "Top Rated",
      rating: 4,
      delivery: "Ships in 2 business days",
      quantity: 0,
    },
    {
      id: 4,
      title: "Barista Essential Set",
      price: 300000,
      description:
        "With the Barista Essential Set, you have everything you need for clean work and a good crema at hand: a tamper made of fine rosewood, the matching tamping mat, a tapping box and a microfiber cloth. The included espresso guide is your personal compass - it accompanies you step by step through the extraction process. All lovingly packaged in a beautiful gift box.",
      image: [
        "images/equipments/barista-set.png",
        "images/equipments/barista-set-2.png",
      ],
      badge: "Trending",
      rating: 4.2,
      delivery: "Delivery within 1 week",
      quantity: 0,
    },
  ];

  const container = document.getElementById("equipmentContainer");

  allEquipments.forEach((item) => {
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
      const item = allEquipments[index];
      addToCart(item);
    });
  });
});
