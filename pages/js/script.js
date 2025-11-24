// To toggle the hamburger menu and diplay the buttons
const ham = document.querySelector(".ham-menu");
const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".menu-overlay");

ham.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close when clicking a menu link
document.querySelectorAll(".nlink").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// Close when clicking outside
overlay.addEventListener("click", () => {
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
});


// Mock "database" for demo purposes
const usersDB = [
  { email: 'test@example.com', password: '123456' }
];

const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Handle login form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = this.email.value;
  const password = this.password.value;
  const remember = document.getElementById('rememberMe').checked;

  const user = usersDB.find(u => u.email === email && u.password === password);

  if(user) {
    // Store login info
    if(remember) {
      localStorage.setItem('loggedInUser', email); // persists across browser sessions
    } else {
      sessionStorage.setItem('loggedInUser', email); // clears on browser close
    }
    messageDiv.textContent = `Welcome, ${email}! You are logged in.`;
    messageDiv.style.color = 'green';
    loginForm.reset();
  } else {
    messageDiv.textContent = 'Invalid email or password';
    messageDiv.style.color = 'red';
  }
});

// Auto-login on page load
const loggedIn = localStorage.getItem('loggedInUser') || sessionStorage.getItem('loggedInUser');
if(loggedIn) {
  messageDiv.textContent = `Welcome back, ${loggedIn}! You are already logged in.`;
  messageDiv.style.color = 'green';
}
