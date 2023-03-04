import './style.css';

const API_URL = 'http://localhost:3000/users/tokens';

let access_token;
let refresh_token = localStorage.getItem('refresh_token');
let resourse_owner;

const signupForm = document.getElementById('sign_up-form');
const signinForm = document.getElementById('sign_in-form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const password_confirm = document.getElementById(
    'signup-password-confirm'
  ).value;

  if (password !== password_confirm) {
    alert('Passwords do not match');
    return;
  }

  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  // Then store the token in localStorage
  await handleAuthResponse(response);
  userSession();
});
