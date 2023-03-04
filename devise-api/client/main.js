import './style.css';

const API_URL = 'http://localhost:3000/users/tokens';

let access_token;
let refresh_token = localStorage.getItem('refresh_token');
let resource_owner;

const signupForm = document.getElementById('sign_up_form');
const signinForm = document.getElementById('sign_in_form');

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

  const response = await fetch(`${API_URL}/sign_up`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  debugger;

  // Then store the token in localStorage
  await handleAuthResponse(response);
  userSession();
});

async function refreshToken() {
  refresh_token = localStorage.getItem('refresh_token');
  if (nullOrUndefined(refresh_token)) {
    return;
  }
  console.log(refresh_token);

  try {
    let response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 401) {
        // Handle the error, such as redirecting to the login page
      } else {
        throw new Error(response.statusText);
      }
    }
    let data = await response.json();
    console.log('Setting access token to: ', data.token);
    localStorage.setItem('resource_owner', JSON.stringify(data.resource_owner));
    localStorage.setItem('refresh_token', data.refresh_token);
    access_token = data.token;
    refresh_token = data.refresh_token;
    resource_owner = data.resource_owner;
  } catch (err) {
    console.log('Error refreshing token: ', err);
    resetTokens();
    userSession();
  }
}

// Sign in
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  const response = await fetch(`${API_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  await handleAuthResponse(response);
  userSession();
});

async function handleAuthResponse(response) {
  const data = await response.json();
  if (response.ok) {
    access_token = data.access_token;
    refresh_token = data.refresh_token;
    resource_owner = data.resource_owner;
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('resource_owner', JSON.stringify(resource_owner));
    return;
  }
  alert(data.message);
}

function nullOrUndefined(itemToCheck) {
  return itemToCheck === null || itemToCheck === undefined;
}

async function userSession() {
  await refreshToken();
  await requestNewAccessToken();
  window.access_token = access_token;
  if (nullOrUndefined(access_token)) {
    document.getElementById('sign_in_form').style.display = 'block';
    document.getElementById('sign_up_form').style.display = 'block';
    document.getElementById('sign_out').style.display = 'none';
  } else {
    document.getElementById('sign_in_form').style.display = 'none';
    document.getElementById('sign_up_form').style.display = 'none';
    document.getElementById('sign_out').style.display = 'block';
  }

  getUser();
}

function getUser() {
  let resource_owner = localStorage.getItem('resource_owner');
  if (nullOrUndefined(resource_owner)) {
    return;
  }
  resource_owner = JSON.parse(resource_owner);
  toggleUserDiv();
}

function toggleUserDiv() {
  if (resource_owner) {
    const user = document.getElementById('user');
    user.innerHTML = `Welcome ${resource_owner.email}`;
    user.style.display = 'block';
  } else {
    user.innerHTML = '';
    user.style.display = 'none';
  }
}

const signoutButton = document.getElementById('sign_out');
signoutButton.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('Logging out');
  resetTokens();
  userSession();
});

function resetTokens() {
  access_token = null;
  refresh_token = null;
  resource_owner = null;
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('resource_owner');
}

async function requestNewAccessToken() {
  if (nullOrUndefined(refresh_token)) {
    return;
  }
  if (access_token) {
    return;
  }
  try {
    const response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    handleAuthResponse(response);
  } catch (err) {
    console.log('Error refreshing token: ', err);
    resetTokens();
    userSession();
  }
}

async function userCanAccess() {
  if (nullOrUndefined(access_token)) {
    return;
  }
  const response = await fetch(`http://localhost:3000/pages/restricted`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();

  console.log('%c' + data.message, 'color: cyan');
  if (data.error) {
    console.log('Error: ', data.error);
    resetTokens();
    userSession();
  }
}

await userSession().then(() => {
  console.log(
    '%cUser session complete. Begin application logic',
    'color: green'
  );
  if (resource_owner) {
    userCanAccess();
  } else {
    console.log('No user');
  }
});
