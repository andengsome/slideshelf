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

function toggleDropdown(e) {
  e.stopPropagation();
  isDropdownOpen = !isDropdownOpen;

  profileTrigger.classList.toggle("active", isDropdownOpen);
  dropdownMenu.classList.toggle("show", isDropdownOpen);
  profileTrigger.setAttribute("aria-expanded", isDropdownOpen);
}

function closeDropdown() {
  isDropdownOpen = false;
  profileTrigger.classList.remove("active");
  dropdownMenu.classList.remove("show");
  profileTrigger.setAttribute("aria-expanded", "false");
}

profileTrigger.addEventListener("click", toggleDropdown);

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

document.addEventListener("click", (e) => {
  if (!profileTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
    closeDropdown();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isDropdownOpen) {
    closeDropdown();
    profileTrigger.focus();
  }
});

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
    window.location.href = "login.html";
  }
});

// ===== FILTER FUNCTIONALITY =====
document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-chip")
      .forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    console.log("Filtering by:", filter);
    // In a real app, this would filter the templates
  });
});

// ===== FAVORITE BUTTON FUNCTIONALITY =====
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".template-card");
    const templateTitle = card.querySelector(".template-title").textContent;

    if (confirm(`Remove "${templateTitle}" from favorites?`)) {
      card.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        card.remove();

        // Check if grid is empty
        const grid = document.getElementById("favoriteGrid");
        if (grid.children.length === 0) {
          grid.style.display = "none";
          document.getElementById("emptyState").style.display = "block";
          document.querySelector(".filter-bar").style.display = "none";
        }
      }, 300);
    }
  });
});

// ===== TEMPLATE CARD CLICK =====
document.querySelectorAll(".template-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "detail.html";
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "detail.html";
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

// Add fade out animation
const style = document.createElement("style");
style.textContent = `
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `;
document.head.appendChild(style);
