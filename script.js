const products = [
  {
    id: "piston",
    name: "Piston",
    price: 120,
    note: "Forged build for stronger engine performance.",
    icon: "piston"
  },
  {
    id: "spark-plug",
    name: "Spark Plug",
    price: 24,
    note: "Reliable ignition and smoother starts.",
    icon: "spark"
  },
  {
    id: "brake-pads",
    name: "Brake Pads",
    price: 68,
    note: "Balanced stopping power and low dust.",
    icon: "brake"
  },
  {
    id: "car-wheels",
    name: "Car Wheels",
    price: 210,
    note: "Stylish alloy wheels for street and city use.",
    icon: "wheel"
  },
  {
    id: "oil-filter",
    name: "Oil Filter",
    price: 18,
    note: "Keeps oil flow clean and efficient.",
    icon: "filter"
  },
  {
    id: "engine-oil",
    name: "Engine Oil",
    price: 42,
    note: "Synthetic formula for dependable protection.",
    icon: "oil"
  },
  {
    id: "battery",
    name: "Battery",
    price: 145,
    note: "High-crank power for daily reliability.",
    icon: "battery"
  },
  {
    id: "headlights",
    name: "Headlights",
    price: 88,
    note: "Bright, modern lighting for safer driving.",
    icon: "headlight"
  }
];

const cart = new Map();
const productGrid = document.getElementById("products");
const cartFab = document.getElementById("cartFab");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");

function getIconMarkup(type) {
  const icons = {
    piston: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="4.5" width="10" height="7" rx="2" stroke="currentColor" stroke-width="1.7"/>
        <path d="M8.5 11.5V14.2C8.5 15.13 9.25 15.88 10.18 15.88H13.82C14.75 15.88 15.5 15.13 15.5 14.2V11.5" stroke="currentColor" stroke-width="1.7"/>
        <path d="M12 15.9V19.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M9.2 19.2H14.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>`,
    spark: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 4.5H14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M9.2 7H14.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M10 9.5H14V13L12.7 14.3V17.8" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M11 17.8H14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M10.8 20H13.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>`,
    brake: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="6.2" stroke="currentColor" stroke-width="1.7"/>
        <circle cx="12" cy="12" r="1.7" fill="currentColor"/>
        <path d="M17 8.8H18.4C19.28 8.8 20 9.52 20 10.4V13.6C20 14.48 19.28 15.2 18.4 15.2H17" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>`,
    wheel: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="1.7"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M12 4.5V9.5M12 14.5V19.5M4.5 12H9.5M14.5 12H19.5M6.8 6.8L10.1 10.1M13.9 13.9L17.2 17.2M17.2 6.8L13.9 10.1M10.1 13.9L6.8 17.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`,
    filter: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="4.8" width="10" height="14.4" rx="2.5" stroke="currentColor" stroke-width="1.7"/>
        <path d="M9.2 8H14.8M9.2 11.2H14.8M9.2 14.4H12.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>`,
    oil: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 7V5.5C9 4.95 9.45 4.5 10 4.5H14C14.55 4.5 15 4.95 15 5.5V7" stroke="currentColor" stroke-width="1.7"/>
        <path d="M8.5 7H15.5L16.5 10.2V17.2C16.5 18.03 15.83 18.7 15 18.7H9C8.17 18.7 7.5 18.03 7.5 17.2V10.2L8.5 7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M10.2 12.1C10.2 11.13 11.02 10.3 12 10.3C12.98 10.3 13.8 11.13 13.8 12.1C13.8 13.44 12 15.1 12 15.1C12 15.1 10.2 13.44 10.2 12.1Z" fill="currentColor"/>
      </svg>`,
    battery: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="7.5" width="13.5" height="9" rx="2" stroke="currentColor" stroke-width="1.7"/>
        <path d="M18.5 10H20V14H18.5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>
        <path d="M9 12H12.5M10.75 10.25V13.75M14.5 12H16.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      </svg>`,
    headlight: `
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.2 9.2C8.14 8.14 9.52 7.5 11.05 7.5H13.5C15.99 7.5 18 9.51 18 12C18 14.49 15.99 16.5 13.5 16.5H11.05C9.52 16.5 8.14 15.86 7.2 14.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        <path d="M6 9.7L4.5 8.9M5.4 12H3.8M6 14.3L4.5 15.1M14.5 10L19.2 8.8M14.5 12L20.2 12M14.5 14L19.2 15.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
  };

  return icons[type] || icons.filter;
}

function renderProducts() {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-icon">${getIconMarkup(product.icon)}</div>
      <div class="product-meta">
        <div class="product-name">${product.name}</div>
        <div class="product-note">${product.note}</div>
      </div>
      <div class="product-footer">
        <div class="price">$${product.price}</div>
        <button class="add-button" type="button" data-id="${product.id}">Add</button>
      </div>
    </article>
  `).join("");
}

function updateCartDisplay() {
  const entries = Array.from(cart.values());
  const itemCount = entries.reduce((sum, item) => sum + item.quantity, 0);
  const total = entries.reduce((sum, item) => sum + item.quantity * item.price, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `$${total}`;

  if (!entries.length) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        Your cart is empty for now.<br>
        Tap any product card to start building the order.
      </div>
    `;
    return;
  }

  cartItems.innerHTML = entries.map((item) => `
    <div class="cart-item">
      <div class="cart-item-main">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">Qty: ${item.quantity}</div>
      </div>
      <strong>$${item.quantity * item.price}</strong>
    </div>
  `).join("");
}

function pulseElement(element) {
  element.classList.remove("bump");
  void element.offsetWidth;
  element.classList.add("bump");
}

function addToCart(productId, button) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const current = cart.get(productId) || { ...product, quantity: 0 };
  current.quantity += 1;
  cart.set(productId, current);

  button.textContent = "Added";
  button.classList.add("added");
  pulseElement(button);
  pulseElement(cartFab);

  window.setTimeout(() => {
    button.textContent = "Add";
    button.classList.remove("added");
  }, 950);

  updateCartDisplay();
}

renderProducts();
updateCartDisplay();

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;
  addToCart(button.dataset.id, button);
});

cartFab.addEventListener("click", () => {
  cartModal.classList.add("open");
  cartModal.setAttribute("aria-hidden", "false");
});

function closeCartPanel() {
  cartModal.classList.remove("open");
  cartModal.setAttribute("aria-hidden", "true");
}

closeCart.addEventListener("click", closeCartPanel);

cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    closeCartPanel();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCartPanel();
  }
});
