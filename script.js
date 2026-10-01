// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const timestamp = new Date().toLocaleString();

  const newResponse = { name, email, message, timestamp };

  // Store in LocalStorage
  const existingResponses = JSON.parse(localStorage.getItem('userResponses')) || [];
  existingResponses.push(newResponse);
  localStorage.setItem('userResponses', JSON.stringify(existingResponses));

  contactForm.reset();
  formMsg.textContent = 'Message sent successfully!';
  setTimeout(() => (formMsg.textContent = ''), 3000);

  // Refresh admin view if open
  loadResponses();
});

// Admin Login & Show/Hide Logic
const loginForm = document.getElementById('login-form');
const adminLoginSec = document.getElementById('admin-login-sec');
const adminDashboardSec = document.getElementById('admin-dashboard-sec');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Simple hardcoded credentials
  if (user === 'admin' && pass === 'admin123') {
    adminLoginSec.classList.add('hidden');
    adminDashboardSec.classList.remove('hidden');
    loadResponses();
    loginError.textContent = '';
  } else {
    loginError.textContent = 'Invalid username or password';
  }
});

logoutBtn.addEventListener('click', () => {
  adminDashboardSec.classList.add('hidden');
  adminLoginSec.classList.remove('hidden');
  loginForm.reset();
});

// Dynamic Response Rendering
function loadResponses() {
  const responsesList = document.getElementById('responses-list');
  const responses = JSON.parse(localStorage.getItem('userResponses')) || [];

  if (responses.length === 0) {
    responsesList.innerHTML = '<p>No responses received yet.</p>';
    return;
  }

  responsesList.innerHTML = responses
    .map(
      (res) => `
    <div class="response-card">
      <p><strong>Name:</strong> ${res.name}</p>
      <p><strong>Email:</strong> ${res.email}</p>
      <p><strong>Message:</strong> ${res.message}</p>
      <p class="timestamp">Submitted on: ${res.timestamp}</p>
    </div>
  `
    )
    .join('');
}