fetch('/api/v1/auth/verify') 
  .then((res) => {
    if (res.ok) return res.json();
    else throw new Error('Please log in to continue! :D');
  })
  .then((user) => {
    renderLoggedInView(user.username);
  })
  .catch((error) => {
    renderLoggedOutView(error.message);
  });

function renderLoggedInView(username) {
  fetch(`/api/v1/${username}/posts`);
  const root = document.getElementById('root');
  const p = document.getElementById('p');
  p.textContent = username;
  root.appendChild(p);

  const form = document.createElement('form');
  const image = document.createElement('image');
  const textarea = document.createElement('textarea');
  textarea.name = 'text';
}