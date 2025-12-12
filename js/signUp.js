// ===== FORM VALIDATION =====
const signupForm = document.getElementById("signupForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const termsCheckbox = document.getElementById("termsAccept");
const submitBtn = document.getElementById("submitBtn");

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, errorElement, message) {
  input.classList.add("error");
  input.classList.remove("success");
  errorElement.querySelector(".error-text").textContent = message;
  errorElement.classList.add("show");

  // Hide success message if exists
  const successElement = document.getElementById(input.id + "-success");
  if (successElement) successElement.classList.remove("show");
}

function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.classList.remove("show");
}

function showSuccess(input) {
  input.classList.add("success");
  input.classList.remove("error");
  const successElement = document.getElementById(input.id + "-success");
  if (successElement) successElement.classList.add("show");
}

// First Name validation
firstNameInput.addEventListener("blur", () => {
  const errorElement = document.getElementById("firstName-error");
  if (!firstNameInput.value.trim()) {
    showError(firstNameInput, errorElement, "First name is required");
  } else {
    hideError(firstNameInput, errorElement);
  }
});

// Last Name validation
lastNameInput.addEventListener("blur", () => {
  const errorElement = document.getElementById("lastName-error");
  if (!lastNameInput.value.trim()) {
    showError(lastNameInput, errorElement, "Last name is required");
  } else {
    hideError(lastNameInput, errorElement);
  }
});

// Email validation
emailInput.addEventListener("blur", () => {
  const errorElement = document.getElementById("email-error");
  if (!emailInput.value) {
    showError(emailInput, errorElement, "Email is required");
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, errorElement, "Please enter a valid email");
  } else {
    hideError(emailInput, errorElement);
    showSuccess(emailInput);
  }
});

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  return strength;
}

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);
  const strengthFill = document.getElementById("strengthFill");
  const strengthText = document.getElementById("strengthText");

  strengthFill.className = "strength-fill";

  if (password.length === 0) {
    strengthText.textContent = "Password strength: None";
  } else if (strength <= 2) {
    strengthFill.classList.add("weak");
    strengthText.textContent = "Password strength: Weak";
  } else if (strength <= 4) {
    strengthFill.classList.add("medium");
    strengthText.textContent = "Password strength: Medium";
  } else if (strength <= 6) {
    strengthFill.classList.add("strong");
    strengthText.textContent = "Password strength: Strong";
  }
});

passwordInput.addEventListener("blur", () => {
  const errorElement = document.getElementById("password-error");
  if (!passwordInput.value) {
    showError(passwordInput, errorElement, "Password is required");
  } else if (passwordInput.value.length < 8) {
    showError(
      passwordInput,
      errorElement,
      "Password must be at least 8 characters"
    );
  } else {
    hideError(passwordInput, errorElement);
  }
});

// Confirm password validation
confirmPasswordInput.addEventListener("blur", () => {
  const errorElement = document.getElementById("confirmPassword-error");
  if (!confirmPasswordInput.value) {
    showError(
      confirmPasswordInput,
      errorElement,
      "Please confirm your password"
    );
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordInput, errorElement, "Passwords do not match");
  } else {
    hideError(confirmPasswordInput, errorElement);
  }
});
// Toggle password visibility
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
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
let isConfirmPasswordVisible = false;
toggleConfirmPassword.addEventListener("click", () => {
  isConfirmPasswordVisible = !isConfirmPasswordVisible;
  confirmPasswordInput.type = isConfirmPasswordVisible ? "text" : "password";
  toggleConfirmPassword.querySelector(".material-icons").textContent =
    isConfirmPasswordVisible ? "visibility" : "visibility_off";
  toggleConfirmPassword.setAttribute(
    "aria-label",
    isConfirmPasswordVisible ? "Hide confirm password" : "Show confirm password"
  );
});
// Form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Trigger blur events to validate all fields
  firstNameInput.dispatchEvent(new Event("blur"));
  lastNameInput.dispatchEvent(new Event("blur"));
  emailInput.dispatchEvent(new Event("blur"));
  passwordInput.dispatchEvent(new Event("blur"));
  confirmPasswordInput.dispatchEvent(new Event("blur"));
  // Check if terms are accepted
  if (!termsCheckbox.checked) {
    alert("You must agree to the Terms of Service and Privacy Policy.");
    return;
  }
  // Check for any errors
  const errors = signupForm.querySelectorAll(".error");
  if (errors.length === 0) {
    // No errors, proceed with form submission
    submitBtn.classList.add("loading");
    // Simulate form submission
    setTimeout(() => {
      submitBtn.classList.remove("loading");
      alert("Account created successfully!");
      signupForm.reset();
      // Reset password strength
      document.getElementById("strengthFill").className = "strength-fill";
      document.getElementById("strengthText").textContent =
        "Password strength: None";
    }, 2000);
  }
});
