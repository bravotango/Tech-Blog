const displayPostForm = async () => {
  document.location.replace('/add');
};

const addPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-post').value.trim();
  const content = document.querySelector('#content-post').value.trim();
  const user_id = document.querySelector('#user_id-post').value.trim();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content, user_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to add post.');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-update-id')) {
    const id = event.target.getAttribute('data-post-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'UPDATE',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);
document
  .querySelector('.post-list')
  .addEventListener('click', updateButtonHandler);
