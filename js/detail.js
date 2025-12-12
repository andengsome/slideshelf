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

// ===== FAVORITE BUTTON =====
const favoriteBtn = document.getElementById("favoriteBtn");
favoriteBtn.addEventListener("click", () => {
  const isActive = favoriteBtn.classList.toggle("active");
  const icon = favoriteBtn.querySelector(".material-icons");
  icon.textContent = isActive ? "favorite" : "favorite_border";
  favoriteBtn.setAttribute("aria-pressed", isActive);
  favoriteBtn.setAttribute(
    "aria-label",
    isActive ? "Remove from favorites" : "Add to favorites"
  );
});

// ===== SHARE BUTTON =====
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", () => {
  if (navigator.share) {
    navigator
      .share({
        title: "That's My Seat Game",
        text: "Check out this awesome template!",
        url: window.location.href,
      })
      .catch(() => {
        // User cancelled or error
      });
  } else {
    alert("Share link copied to clipboard!");
    navigator.clipboard.writeText(window.location.href);
  }
});

// ===== RATE BUTTON =====
const rateBtn = document.getElementById("rateBtn");
rateBtn.addEventListener("click", () => {
  alert("Rating feature coming soon!");
});

// ===== FEEDBACK SUBMISSION =====
const submitFeedbackBtn = document.querySelector(".submit-feedback-btn");
const feedbackInput = document.querySelector(".feedback-input");

submitFeedbackBtn.addEventListener("click", () => {
  const feedback = feedbackInput.value.trim();
  if (feedback) {
    alert("Thank you for your feedback!");
    feedbackInput.value = "";
  } else {
    alert("Please enter your feedback before submitting.");
  }
});

// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll(".slide-image");
const dots = document.querySelectorAll(".carousel-dot");
const slideCount = document.querySelector(".slide-count");
const totalSlides = slides.length;

function showSlide(index) {
  // Wrap around
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Update slides
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-selected", i === currentSlide);
  });

  // Update slide count
  slideCount.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
}

// Next/Previous buttons
document.getElementById("nextSlide").addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

document.getElementById("prevSlide").addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });

  // Keyboard support for dots
  dot.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showSlide(index);
    }
  });
});

// Keyboard navigation (Arrow keys)
document.addEventListener("keydown", (e) => {
  const carousel = document.querySelector(".preview-carousel");
  const isCarouselFocused = carousel.contains(document.activeElement);

  if (isCarouselFocused) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showSlide(currentSlide + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      showSlide(currentSlide - 1);
    }
  }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carouselElement = document.querySelector(".preview-carousel");

carouselElement.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carouselElement.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      showSlide(currentSlide + 1);
    } else {
      // Swipe right - previous slide
      showSlide(currentSlide - 1);
    }
  }
}

// Initialize
showSlide(0);

// ===== DOWNLOAD MODAL =====
const downloadBtn = document.getElementById("downloadBtn");
const downloadModal = document.getElementById("downloadModal");
const closeDownloadModal = document.getElementById("closeDownloadModal");

downloadBtn.addEventListener("click", () => {
  downloadModal.classList.add("active");
  // Focus first format button
  setTimeout(() => {
    document.querySelector(".format-download-btn").focus();
  }, 100);
});

closeDownloadModal.addEventListener("click", () => {
  downloadModal.classList.remove("active");
  downloadBtn.focus();
});

downloadModal.addEventListener("click", (e) => {
  if (e.target === downloadModal) {
    downloadModal.classList.remove("active");
    downloadBtn.focus();
  }
});

// Close on Escape
downloadModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    downloadModal.classList.remove("active");
    downloadBtn.focus();
  }
});

// ===== FORMAT SELECTION =====
const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");

document.querySelectorAll(".format-download-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const format = btn.dataset.format;
    console.log("Downloading format:", format);

    // Update format in success modal
    const formatText = document.getElementById("downloadedFormat");
    if (format === "canva") {
      formatText.textContent = "Canva";
    } else if (format === "powerpoint") {
      formatText.textContent = ".PPTX";
    } else if (format === "slides") {
      formatText.textContent = "Google Slides";
    }

    downloadModal.classList.remove("active");

    setTimeout(() => {
      successModal.classList.add("active");
      // Focus close button
      setTimeout(() => {
        closeSuccessModal.focus();
      }, 100);
    }, 300);
  });

  // Keyboard support
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
});

closeSuccessModal.addEventListener("click", () => {
  successModal.classList.remove("active");
  downloadBtn.focus();
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("active");
    downloadBtn.focus();
  }
});

// Close on Escape
successModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    successModal.classList.remove("active");
    downloadBtn.focus();
  }
});

// ===== LOGO KEYBOARD SUPPORT =====
document.querySelector(".logo").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    window.location.href = "index.html";
  }
});
