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

async function handleAuthResponse(response) {
  const data = await response.json();
  if (response.ok) {
    access_token = data.access_token;
    refresh_token = data.refresh_token;
    resourse_owner = data.resourse_owner;
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('resourse_owner', JSON.stringify(resourse_owner));
    return;
  }
  alert(data.message);
}

async function userSession() {
  await refreshAccessToken();
  await requestNewAccessToken();
  window.access_token = access_token;
  if (nullOrUndefined(access_token)) {
    document.getElementById('sign_in-form').style.display = 'block';
    document.getElementById('sign_up-form').style.display = 'block';
    document.getElementById('sign_out').style.display = 'none';
  } else {
    document.getElementById('sign_in-form').style.display = 'none';
    document.getElementById('sign_up-form').style.display = 'none';
    document.getElementById('sign_out').style.display = 'block';
  }

  getUser();
}
