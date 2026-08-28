// ------------------------------
// North Star Bakery Touchstone 4
// ------------------------------

// Product data used by the favorites feature
const bakeryProducts = [
  {
    id: "country-loaf",
    name: "Country Loaf",
    category: "Bread"
  },
  {
    id: "croissant-box",
    name: "Croissant Box",
    category: "Pastry"
  },
  {
    id: "celebration-cake",
    name: "Celebration Cake",
    category: "Cake"
  }
];

// Stores IDs for products the user has favorited
let favoriteIds = [];

// Keys used with localStorage
const storageKeys = {
  favorites: "northStarFavorites",
  customerName: "northStarCustomerName",
  customerEmail: "northStarCustomerEmail"
};


// ------------------------------
// FAVORITES FEATURE
// ------------------------------

function loadFavorites() {
  const savedFavorites = localStorage.getItem(storageKeys.favorites);

  if (savedFavorites) {
    favoriteIds = JSON.parse(savedFavorites);
  }
}

function saveFavorites() {
  localStorage.setItem(
    storageKeys.favorites,
    JSON.stringify(favoriteIds)
  );
}

function toggleFavorite(productId) {
  if (favoriteIds.includes(productId)) {
    favoriteIds = favoriteIds.filter(id => id !== productId);
  } else {
    favoriteIds.push(productId);
  }

  saveFavorites();
  renderFavoriteOptions();
  renderFavoritesList();
}

function renderFavoriteOptions() {
  const container = document.getElementById("favorite-options");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  bakeryProducts.forEach(product => {
    const button = document.createElement("button");

    const isFavorite = favoriteIds.includes(product.id);

    button.type = "button";
    button.className = "favorite-button";

    button.textContent = isFavorite
      ? `Remove ${product.name}`
      : `Favorite ${product.name}`;

    button.addEventListener("click", function() {
      toggleFavorite(product.id);
    });

    container.appendChild(button);
  });
}

function renderFavoritesList() {
  const list = document.getElementById("favorites-list");
  const emptyMessage = document.getElementById("favorites-empty");

  if (!list || !emptyMessage) {
    return;
  }

  list.innerHTML = "";

  if (favoriteIds.length === 0) {
    emptyMessage.textContent =
      "You have not saved any bakery favorites yet.";
    return;
  }

  emptyMessage.textContent = "";

  favoriteIds.forEach(id => {
    const product = bakeryProducts.find(item => item.id === id);

    if (product) {
      const listItem = document.createElement("li");
      listItem.textContent =
        `${product.name} (${product.category})`;

      list.appendChild(listItem);
    }
  });
}


// ------------------------------
// FORM STORAGE
// ------------------------------

function loadSavedFormData() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  if (!nameInput || !emailInput) {
    return;
  }

  const savedName =
    localStorage.getItem(storageKeys.customerName);

  const savedEmail =
    localStorage.getItem(storageKeys.customerEmail);

  if (savedName) {
    nameInput.value = savedName;
  }

  if (savedEmail) {
    emailInput.value = savedEmail;
  }
}

function setupFormStorage() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  if (!nameInput || !emailInput) {
    return;
  }

  nameInput.addEventListener("input", function() {
    localStorage.setItem(
      storageKeys.customerName,
      nameInput.value
    );
  });

  emailInput.addEventListener("input", function() {
    localStorage.setItem(
      storageKeys.customerEmail,
      emailInput.value
    );
  });
}


// ------------------------------
// FORM VALIDATION
// ------------------------------

function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");

  errors.forEach(error => {
    error.textContent = "";
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(event) {
  event.preventDefault();

  clearErrors();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const detailsInput = document.getElementById("item-details");
  const successMessage = document.getElementById("form-success");

  let isValid = true;

  // Validation check 1: required name
  if (nameInput.value.trim() === "") {
    showError(
      "name-error",
      "Please enter your name."
    );

    isValid = false;
  }

  // Validation check 2: valid email format
  if (!validateEmail(emailInput.value.trim())) {
    showError(
      "email-error",
      "Please enter a valid email address."
    );

    isValid = false;
  }

  // Validation check 3: minimum item-detail length
  if (detailsInput.value.trim().length < 10) {
    showError(
      "details-error",
      "Please provide at least 10 characters describing your order or question."
    );

    isValid = false;
  }

  if (!isValid) {
    successMessage.textContent = "";
    return;
  }

  successMessage.textContent =
    "Your request information looks good and is ready to submit.";
}

function setupFormValidation() {
  const form = document.getElementById("preorder-form");

  if (form) {
    form.addEventListener("submit", validateForm);
  }
}


// ------------------------------
// PAGE STARTUP
// ------------------------------

function initializePage() {
  loadFavorites();
  renderFavoriteOptions();
  renderFavoritesList();

  loadSavedFormData();
  setupFormStorage();
  setupFormValidation();
}

document.addEventListener("DOMContentLoaded", initializePage);