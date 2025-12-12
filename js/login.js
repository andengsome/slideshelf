// ===== FORM VALIDATION =====
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show error
function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.querySelector(".error-text").textContent = message;
  errorElement.classList.add("show");
}

// Hide error
function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}

// Real-time validation
emailInput.addEventListener("blur", () => {
  if (!emailInput.value) {
    showError(emailInput, emailError, "Email is required");
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, "Please enter a valid email");
  } else {
    hideError(emailInput, emailError);
  }
});

emailInput.addEventListener("input", () => {
  if (
    emailInput.classList.contains("error") &&
    validateEmail(emailInput.value)
  ) {
    hideError(emailInput, emailError);
  }
});

passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value.trim()) {
    showError(passwordInput, passwordError, "Password is required");
  } else if (passwordInput.value.length < 6) {
    showError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters"
    );
  } else {
    hideError(passwordInput, passwordError);
  }
});

passwordInput.addEventListener("input", () => {
  if (
    passwordInput.classList.contains("error") &&
    passwordInput.value.length >= 6
  ) {
    hideError(passwordInput, passwordError);
  }
});

// ===== PASSWORD TOGGLE =====
const togglePassword = document.getElementById("togglePassword");
let isPasswordVisible = false;

togglePassword.addEventListener("click", () => {
  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  togglePassword.querySelector(".material-icons").textContent =
    isPasswordVisible ? "visibility" : "visibility_off";
  togglePassword.setAttribute(
    "aria-label",
    isPasswordVisible ? "Hide password" : "Show password"
  );
});

// ===== FORM SUBMISSION =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;

  // Validate email
  if (!emailInput.value) {
    showError(emailInput, emailError, "Email is required");
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, "Please enter a valid email address");
    isValid = false;
  } else {
    hideError(emailInput, emailError);
  }

  // Validate password
  if (!passwordInput.value) {
    showError(passwordInput, passwordError, "Password is required");
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    showError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters"
    );
    isValid = false;
  } else {
    hideError(passwordInput, passwordError);
  }

  if (!isValid) {
    return;
  }

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Valid credentials
    const VALID_EMAIL = "23-05956@g.batstate-u.edu.ph";
    const VALID_PASSWORD = "Admin1234";
    const USER_NAME = "Andrea Mercado";

    // Check credentials
    if (
      emailInput.value === VALID_EMAIL &&
      passwordInput.value === VALID_PASSWORD
    ) {
      // Store login state and user data
      const userData = {
        name: USER_NAME,
        email: VALID_EMAIL,
        loggedInAt: new Date().toISOString(),
      };

      // Save to sessionStorage (persists during the session)
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userData", JSON.stringify(userData));

      console.log("Login successful:", userData);

      // Success - redirect to home
      window.location.href = "index.html";
    } else {
      // Invalid credentials
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;

      // Show error messages
      if (emailInput.value !== VALID_EMAIL) {
        showError(emailInput, emailError, "Invalid email address");
      }
      if (passwordInput.value !== VALID_PASSWORD) {
        showError(passwordInput, passwordError, "Invalid password");
      }

      // Show a general error message
      alert("Invalid email or password. Please try again.");
    }
  }, 1500);
});

// ===== SOCIAL LOGIN =====
document.getElementById("googleLogin").addEventListener("click", () => {
  console.log("Google login clicked");
  // In a real app, initiate Google OAuth flow
  alert("Google login would be initiated here");
});

document.getElementById("facebookLogin").addEventListener("click", () => {
  console.log("Facebook login clicked");
  // In a real app, initiate Facebook OAuth flow
  alert("Facebook login would be initiated here");
});

// ===== LOGO KEYBOARD SUPPORT =====
document.querySelector(".logo").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    window.location.href = "index.html";
  }
});
