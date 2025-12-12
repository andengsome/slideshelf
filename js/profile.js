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

// ===== EDIT PERSONAL INFO =====
const editPersonalInfoBtn = document.getElementById("editPersonalInfo");
const personalInfoView = document.getElementById("personalInfoView");
const personalInfoEdit = document.getElementById("personalInfoEdit");
const cancelPersonalInfo = document.getElementById("cancelPersonalInfo");
const personalInfoForm = document.getElementById("personalInfoForm");

editPersonalInfoBtn.addEventListener("click", () => {
  personalInfoView.classList.add("hidden");
  personalInfoEdit.classList.remove("hidden");
  editPersonalInfoBtn.classList.add("hidden");
});

cancelPersonalInfo.addEventListener("click", () => {
  personalInfoEdit.classList.add("hidden");
  personalInfoView.classList.remove("hidden");
  editPersonalInfoBtn.classList.remove("hidden");
});

personalInfoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Simulate saving
  alert("Profile updated successfully!");
  personalInfoEdit.classList.add("hidden");
  personalInfoView.classList.remove("hidden");
  editPersonalInfoBtn.classList.remove("hidden");

  // Update view with new values
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const occupation = document.getElementById("occupation").value;
  const location = document.getElementById("location").value;

  document.querySelectorAll(".info-value")[0].textContent = fullName;
  document.querySelectorAll(".info-value")[1].textContent = email;
  document.querySelectorAll(".info-value")[2].textContent = occupation;
  document.querySelectorAll(".info-value")[3].textContent = location;
  document.querySelector(".profile-header h1").textContent = fullName;
});

// ===== EDIT ABOUT =====
const editAboutBtn = document.getElementById("editAbout");
const aboutView = document.getElementById("aboutView");
const aboutEdit = document.getElementById("aboutEdit");
const cancelAbout = document.getElementById("cancelAbout");
const aboutForm = document.getElementById("aboutForm");

editAboutBtn.addEventListener("click", () => {
  aboutView.classList.add("hidden");
  aboutEdit.classList.remove("hidden");
  editAboutBtn.classList.add("hidden");
});

cancelAbout.addEventListener("click", () => {
  aboutEdit.classList.add("hidden");
  aboutView.classList.remove("hidden");
  editAboutBtn.classList.remove("hidden");
});

aboutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("About section updated successfully!");
  aboutEdit.classList.add("hidden");
  aboutView.classList.remove("hidden");
  editAboutBtn.classList.remove("hidden");

  // Update view
  aboutView.querySelector("p").textContent =
    document.getElementById("bio").value;
});

// ===== DELETE ACCOUNT =====
document.getElementById("deleteAccount").addEventListener("click", () => {
  if (
    confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone."
    )
  ) {
    if (confirm("This will permanently delete all your data. Are you sure?")) {
      alert("Account deleted. Redirecting to home page...");
      window.location.href = "login.html";
    }
  }
});

// ===== LOGO KEYBOARD SUPPORT =====
document.querySelector(".logo").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    window.location.href = "index.html";
  }
});
