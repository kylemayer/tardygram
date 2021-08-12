const button = document.createElement('button');
console.log('is this working?');
button.textContent = 'Login with GitHub';
button.addEventListener('click', () => {
  window.location.assign('/api/v1/auth/login');
});

document.getElementById('base').appendChild(button);