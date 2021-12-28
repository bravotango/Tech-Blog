const displayForm = async () => {
  document.location.replace('/add');
};

const addPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title-post').value.trim();
  const content = document.querySelector('#content-post').value.trim();
  const user_id = document.querySelector('#user_id-post').value.trim();

  console.log(title, content, user_id);
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