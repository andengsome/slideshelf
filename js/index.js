// ===== CHECK LOGIN STATE AND SHOW APPROPRIATE UI =====
function checkLoginState() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  const loginBtn = document.getElementById("loginButtonContainer");
  const profileDropdown = document.getElementById("profileDropdownContainer");

  if (isLoggedIn && userData.name) {
    // User is logged in - show profile dropdown
    loginBtn.classList.add("hidden");
    profileDropdown.classList.remove("hidden");

    // Update user info in dropdown
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const profileAvatarInitial = document.getElementById(
      "profileAvatarInitial"
    );
    const dropdownAvatarInitial = document.getElementById(
      "dropdownAvatarInitial"
    );

    userName.textContent = userData.name;
    userEmail.textContent = userData.email;

    // Set initials (first letter of name)
    const initials = userData.name.charAt(0).toUpperCase();
    profileAvatarInitial.textContent = initials;
    dropdownAvatarInitial.textContent = initials;
  } else {
    // User is NOT logged in - show login button
    loginBtn.classList.remove("hidden");
    profileDropdown.classList.add("hidden");
  }
}

// Run on page load
checkLoginState();

// ===== PROFILE DROPDOWN FUNCTIONALITY =====
const profileTrigger = document.getElementById("profileTrigger");
const dropdownMenu = document.getElementById("dropdownMenu");
let isDropdownOpen = false;

// Toggle dropdown
function toggleDropdown(e) {
  e.stopPropagation();
  isDropdownOpen = !isDropdownOpen;

  profileTrigger.classList.toggle("active", isDropdownOpen);
  dropdownMenu.classList.toggle("show", isDropdownOpen);
  profileTrigger.setAttribute("aria-expanded", isDropdownOpen);
}

// Close dropdown
function closeDropdown() {
  isDropdownOpen = false;
  profileTrigger.classList.remove("active");
  dropdownMenu.classList.remove("show");
  profileTrigger.setAttribute("aria-expanded", "false");
}

// Click event
profileTrigger.addEventListener("click", toggleDropdown);

// Keyboard support (Enter and Space)
profileTrigger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleDropdown(e);
  }
  if (e.key === "Escape" && isDropdownOpen) {
    closeDropdown();
    profileTrigger.focus();
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!profileTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeDropdown();
  }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isDropdownOpen) {
    closeDropdown();
    profileTrigger.focus();
  }
});

// Dropdown item keyboard navigation
const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
dropdownItems.forEach((item, index) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextItem = dropdownItems[index + 1] || dropdownItems[0];
      nextItem.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevItem =
        dropdownItems[index - 1] || dropdownItems[dropdownItems.length - 1];
      prevItem.focus();
    }
  });
});

// ===== LOGOUT FUNCTIONALITY =====
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    // Clear session data
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");

    // Redirect to login page
    window.location.href = "index.html";
  }
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById("mainSearchInput");

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
  }
});

// ===== FAVORITE BUTTON FUNCTIONALITY =====
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = btn.classList.toggle("active");

    const icon = btn.querySelector(".material-icons");
    icon.textContent = isActive ? "favorite" : "favorite_border";

    // Update aria-pressed for accessibility
    btn.setAttribute("aria-pressed", isActive);

    // Update aria-label
    const templateTitle = btn
      .closest(".template-card")
      .querySelector(".template-title").textContent;
    btn.setAttribute(
      "aria-label",
      isActive
        ? `Remove ${templateTitle} from favorites`
        : `Add ${templateTitle} to favorites`
    );
  });
});

// ===== TEMPLATE CARD CLICK =====
document.querySelectorAll(".template-card").forEach((card) => {
  // Click event
  card.addEventListener("click", () => {
    window.location.href = "detail.html";
  });

  // Keyboard support
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "detail.html";
    }
  });
});

// ===== CATEGORY CARD CLICK =====
document.querySelectorAll(".category-card").forEach((card) => {
  // Click event
  card.addEventListener("click", () => {
    const category = card.querySelector("h3").textContent;
    window.location.href = `search.html?category=${encodeURIComponent(
      category
    )}`;
  });

  // Keyboard support
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const category = card.querySelector("h3").textContent;
      window.location.href = `search.html?category=${encodeURIComponent(
        category
      )}`;
    }
  });
});

// ===== LOGO KEYBOARD SUPPORT =====
document.querySelector(".logo").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    window.location.href = "index.html";
  }
});
