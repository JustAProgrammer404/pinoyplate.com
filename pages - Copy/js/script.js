// HOMEPAGE
// To toggle the hamburger menu and display the buttons
const ham = document.querySelector(".ham-menu");
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".menu-overlay");

if (ham && mobileNav && overlay) {
    ham.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
        overlay.classList.toggle("active");
        ham.classList.toggle("active"); // toggles the lines animation
    });

    // Close when clicking a menu link
    document.querySelectorAll(".nlink").forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("active");
            overlay.classList.remove("active");
            ham.classList.remove("active"); // also reset hamburger lines
        });
    });

    // Close when clicking outside
    overlay.addEventListener("click", () => {
        mobileNav.classList.remove("active");
        overlay.classList.remove("active");
        ham.classList.remove("active"); // also reset hamburger lines
    });
}
// HOMEPAGE





// SIGN-UP
const conpasswordInput = document.querySelector('input[name="confirmPassword"]');
const toggleConPassword = document.getElementById('toggleConPassword');

if (conpasswordInput && toggleConPassword) {
  toggleConPassword.addEventListener("click", () => {
    const isPassword = conpasswordInput.type === "password";
    conpasswordInput.type = isPassword ? "text" : "password";

    // Toggle icon
    toggleConPassword.name = isPassword ? "eye" : "eye-off";
  });
}

const signUpForm = document.getElementById('SignUpForm');
if (signUpForm) {
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop form from actually submitting

    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('conpass').value;

    // simple validation
    if (!name || !email || !pass || pass !== cpass || pass.length < 8) {
      alert('Please fill all fields correctly');
      return;
    }

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      alert('Email already registered!');
      return;
    }

    users.push({ name, email, pass });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! Please log in.');
    window.location.href = 'log.html'; // redirect to login
  });
}
// SIGN-UP





// LOGIN
// Password show/hide toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.querySelector('input[name="password"]');

if (togglePassword && passwordInput) {
togglePassword.addEventListener("click", () => {
  
  // Toggle input type
  const isPassword = passwordInput.type == "password";
  passwordInput.type = isPassword ? "text" : "password";

  // Toggle icon between eye and eye-off
  togglePassword.name = isPassword ? "eye" : "eye-off";
  
  // Force focus and repaint
  passwordInput.focus();
  passwordInput.offsetHeight; // force reflow
});
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value.trim();
    const pass = loginForm.querySelector('input[name="password"]').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
      alert('Invalid email or password');
      return;
    }

    // Save logged-in user
    localStorage.setItem('loggedInUser', JSON.stringify(user));

    window.location.href = 'homepage.html'; // go to homepage
  });
}
// LOGIN





// LOG OUT PROFILE
window.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Desktop
    const desktopSignUp = document.querySelector('.main-nav a.cta');
    const desktopLogIn = document.querySelector('.main-nav a.cta2[href="log.html"]');
    const logoutDesktop = document.getElementById('logoutBtnDesktop');
    const profileContainer = document.getElementById('profileContainer');
    const profileName = document.getElementById('profileName');
    const profilePic = document.getElementById('profilePic');

    // Mobile
    const mobileSignUp = document.querySelector('.mobile-nav a.cta');
    const mobileLogIn = document.querySelector('.mobile-nav a.cta2[href="log.html"]');
    const logoutMobile = document.getElementById('logoutBtnMobile');
    const mobileProfileContainer = document.getElementById('mobileProfileContainer');
    const mobileProfileName = document.getElementById('mobileProfileName');
    const mobileProfilePic = document.getElementById('mobileProfilePic');

    function showLoggedIn(user) {
        // Desktop
        if (desktopSignUp) desktopSignUp.style.display = 'none';
        if (desktopLogIn) desktopLogIn.style.display = 'none';
        if (logoutDesktop) logoutDesktop.style.display = 'inline-block';
        if (profileContainer) profileContainer.classList.add('visible');
        if (profileName) { profileName.textContent = `Hello, ${user.name}!`; profileName.style.display = 'inline-block'; }
        if (profilePic) { profilePic.src = user.avatar || 'images/default-pf.png'; profilePic.style.display = 'inline-block'; }

        // Mobile
        if (mobileSignUp) mobileSignUp.style.display = 'none';
        if (mobileLogIn) mobileLogIn.style.display = 'none';
        if (logoutMobile) logoutMobile.style.display = 'block';
        if (mobileProfileContainer) mobileProfileContainer.classList.add('visible');
        if (mobileProfileName) { mobileProfileName.textContent = `Hello, ${user.name}!`; mobileProfileName.style.display = 'inline-block'; }
        if (mobileProfilePic) { mobileProfilePic.src = user.avatar || 'images/default-pf.png'; mobileProfilePic.style.display = 'inline-block'; }
    }

    function showLoggedOut() {
        // Desktop
        if (desktopSignUp) desktopSignUp.style.display = 'inline-block';
        if (desktopLogIn) desktopLogIn.style.display = 'inline-block';
        if (logoutDesktop) logoutDesktop.style.display = 'none';
        if (profileContainer) profileContainer.classList.remove('visible');
        if (profileName) profileName.style.display = 'none';
        if (profilePic) profilePic.style.display = 'none';

        // Mobile
        if (mobileSignUp) mobileSignUp.style.display = 'block';
        if (mobileLogIn) mobileLogIn.style.display = 'block';
        if (logoutMobile) logoutMobile.style.display = 'none';
        if (mobileProfileContainer) mobileProfileContainer.classList.remove('visible');
        if (mobileProfileName) mobileProfileName.style.display = 'none';
        if (mobileProfilePic) mobileProfilePic.style.display = 'none';
    }

    // Initial check
    if (loggedInUser) {
        showLoggedIn(loggedInUser);
    } else {
        showLoggedOut();
    }

// LOG OUT FUNCTION
    function logout() {
        localStorage.removeItem('loggedInUser');
        // Refresh the page to update nav
        window.location.reload();
    }

    // Attach logout buttons
    if (logoutDesktop) logoutDesktop.addEventListener('click', logout);
    if (logoutMobile) logoutMobile.addEventListener('click', logout);
});
// LOG OUT FUNCTION





// CATEGORIES SEARCH FUNCTION
// Get elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('btnSearch');
const allCards = document.querySelectorAll('article.card');
const searchSection = document.querySelector('.searchResult');
const resultSection = document.getElementById('resultSection');

searchSection.style.display = 'none'; // hide initially

function filterCards() {
  const query = searchInput.value.toLowerCase().trim();
  resultSection.innerHTML = '';

  if (!query) {
    searchSection.style.display = 'none';
    return;
  }

  let found = false;

  allCards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      resultSection.appendChild(card.cloneNode(true));
      found = true;
    }
  });

  searchSection.style.display = found ? 'block' : 'none';
}

// Button click
searchButton.addEventListener('click', filterCards);

// Press Enter
searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') filterCards();
});
// CATEGORIES SEARCH FUNCTION