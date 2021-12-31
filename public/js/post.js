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

const updatePostHandler = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  const post_id = formProps.post_id.trim();
  const title = formProps.title.trim();
  const content = formProps.content.trim();

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post');
  }
};
