// ===== GET SEARCH QUERY FROM URL =====
function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("q") || urlParams.get("category") || "";
}

// ===== UPDATE SEARCH UI =====
function updateSearchUI() {
  const query = getSearchQuery();
  const searchInput = document.getElementById("searchInput");
  const resultsCount = document.getElementById("resultsCount");

  if (query) {
    searchInput.value = query;

    // Check if it's a category search
    const urlParams = new URLSearchParams(window.location.search);
    const isCategory = urlParams.has("category");

    if (isCategory) {
      resultsCount.innerHTML = `Showing templates in category <strong>"${query}"</strong>`;
    } else {
      resultsCount.innerHTML = `Search results for <strong>"${query}"</strong>`;
    }
  } else {
    resultsCount.innerHTML = "Showing <strong>all templates</strong>";
  }
}

// Update UI on page load
updateSearchUI();

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      // Update URL with search query
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
      // No query, show all
      window.location.href = "search.html";
    }
  }
});

// ===== CHECK LOGIN STATE =====
function checkLoginState() {
  const userDataStr = localStorage.getItem("slideshelfUser");
  const loginButtonContainer = document.getElementById("loginButtonContainer");
  const profileDropdownContainer = document.getElementById(
    "profileDropdownContainer"
  );

  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);

      // Show profile dropdown, hide login button
      profileDropdownContainer.classList.remove("hidden");
      loginButtonContainer.classList.add("hidden");

      // Update user info in dropdown
      document.getElementById("userName").textContent = userData.name;
      document.getElementById("userEmail").textContent = userData.email;

      // Set avatar initials
      const initials = userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      document.getElementById("profileAvatarInitial").textContent = initials;
      document.getElementById("dropdownAvatarInitial").textContent = initials;
    } catch (e) {
      // If error parsing, show login button
      profileDropdownContainer.classList.add("hidden");
      loginButtonContainer.classList.remove("hidden");
    }
  } else {
    // Not logged in - show login button
    profileDropdownContainer.classList.add("hidden");
    loginButtonContainer.classList.remove("hidden");
  }
}

// Check login state on page load
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

if (profileTrigger) {
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
    if (
      !profileTrigger.contains(e.target) &&
      !dropdownMenu.contains(e.target)
    ) {
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
}

// ===== LOGOUT FUNCTIONALITY =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("slideshelfUser");
      window.location.href = "login.html";
    }
  });
}

// ===== FILTER FUNCTIONALITY =====
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");

filterToggle.addEventListener("click", () => {
  filterPanel.classList.toggle("active");
});

// Filter chips
document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("active");
  });
});

// Clear filters
document.getElementById("clearFilters").addEventListener("click", () => {
  document.querySelectorAll(".filter-chip.active").forEach((chip) => {
    chip.classList.remove("active");
  });
});

// Apply filters
document.getElementById("applyFilters").addEventListener("click", () => {
  filterPanel.classList.remove("active");
  alert("Filters applied!");
});

// ===== FAVORITE BUTTON FUNCTIONALITY =====
document.querySelectorAll(".favorite-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("active");

    const icon = btn.querySelector(".material-icons");
    if (btn.classList.contains("active")) {
      icon.textContent = "favorite";
    } else {
      icon.textContent = "favorite_border";
    }
  });
});

// ===== TEMPLATE CARD CLICK =====
document.querySelectorAll(".template-card").forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "detail.html";
  });
});

// ===== SORT FUNCTIONALITY =====
document.getElementById("sortSelect").addEventListener("change", (e) => {
  console.log("Sorting by:", e.target.value);
});

// ===== LOGO KEYBOARD SUPPORT =====
document.querySelector(".logo").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    window.location.href = "index.html";
  }
});
