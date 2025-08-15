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

function getAllProducts() {
  return [
    {
      id: 1,
      title: "Simple Summer",
      price: 42000,
      note: "orange zest, nougat, guava",
      description:
        "A bright and refreshing seasonal blend with vibrant fruit notes and a smooth finish.",
      image: "images/beans/simple_summer.png",
      roast: 30,
      quantity: 0,
      tastingNotes: ["Orange Zest", "Nougat", "Guava"],
      brewingMethods: ["Pour Over", "French Press", "Cold Brew"],
    },
    {
      id: 2,
      title: "Mellow Gold",
      price: 34650,
      note: "caramel, hazelnut, date",
      description:
        "A mellow, nutty coffee with a comforting sweetness and gentle body.",
      image: "images/beans/mellow_gold.png",
      roast: 50,
      quantity: 0,
      tastingNotes: ["Caramel", "Hazelnut", "Date"],
      brewingMethods: ["Drip Machine", "Pour Over", "Espresso"],
    },
    {
      id: 3,
      title: "Black Velvet",
      price: 41370,
      note: "dark chocolate, brown sugar",
      description:
        "A bold and silky roast with a deep chocolatey richness and lingering sweetness.",
      image: "images/beans/black_velvet.png",
      roast: 85,
      quantity: 0,
      tastingNotes: ["Dark Chocolate", "Brown Sugar"],
      brewingMethods: ["Espresso", "French Press", "Moka Pot"],
    },
    {
      id: 4,
      title: "Java Blend",
      price: 34650,
      note: "toffee, caramel, citrus",
      description:
        "A classic coffee blend balancing sweetness and citrus brightness.",
      image: "images/beans/java_blend.png",
      roast: 55,
      quantity: 0,
      tastingNotes: ["Toffee", "Caramel", "Citrus"],
      brewingMethods: ["Pour Over", "Drip Machine", "Cold Brew"],
    },
    {
      id: 5,
      title: "Mocha Roast",
      price: 34650,
      note: "chocolate, nutty",
      description:
        "A rich, full-bodied roast with warm chocolatey tones and nutty depth.",
      image: "images/beans/mocha_roast.png",
      roast: 65,
      quantity: 0,
      tastingNotes: ["Chocolate", "Nutty"],
      brewingMethods: ["Espresso", "French Press", "Moka Pot"],
    },
    {
      id: 6,
      title: "Single Origin",
      price: 36750,
      note: "100% original",
      description:
        "A pure, traceable coffee showcasing the unique flavors of its origin.",
      image: "images/beans/single_origin.png",
      roast: 40,
      quantity: 0,
      tastingNotes: ["Bright Acidity", "Clean Finish", "Floral"],
      brewingMethods: ["Pour Over", "Chemex", "Aeropress"],
    },
    {
      id: 7,
      title: "Moonwalk",
      price: 34650,
      note: "milk chocolate, hazelnut, bergomel",
      description:
        "A balanced medium roast with a playful blend of sweetness and nutty comfort.",
      image: "images/beans/moonwalk.png",
      roast: 55,
      quantity: 0,
      tastingNotes: ["Bright Acidity", "Clean Finish", "Floral"],
      brewingMethods: ["Pour Over", "Chemex", "Aeropress"],
    },
    {
      id: 8,
      title: "Cosmo",
      price: 34650,
      note: "plum, cranberry, marzipan",
      description: "A vibrant, fruity coffee with a sweet marzipan finish.",
      image: "images/beans/cosmo.png",
      roast: 35,
      quantity: 0,
      tastingNotes: ["Plum", "Cranberry", "Marzipan"],
      brewingMethods: ["Pour Over", "Cold Brew", "Chemex"],
    },
    {
      id: 9,
      title: "Novo",
      price: 35700,
      note: "black cherry, walnut, molasses",
      description:
        "A deep, syrupy roast with nutty undertones and rich fruit sweetness.",
      image: "images/beans/novo.png",
      roast: 80,
      quantity: 0,
      tastingNotes: ["Black Cherry", "Walnut", "Molasses"],
      brewingMethods: ["Espresso", "French Press", "Moka Pot"],
    },
  ];
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
              <div class="roast-line bg-dark mt-1 mb-2"></div>
              <div class="roast-marker" data-roast="${item.roast}">
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

  document.querySelectorAll(".roast-marker").forEach(marker => {
    const roast = marker.dataset.roast;
    marker.style.left = roast + "%";
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
  allProducts = getAllProducts();
  renderProducts(allProducts);

  document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.toLowerCase().trim();
    const filtered = allProducts.filter((p) =>
      p.title.toLowerCase().includes(keyword)
    );
    renderProducts(filtered);
  });
});