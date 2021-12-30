const postClickHandler = (post_id) => {
  document.location.replace(`/${post_id}`);
};

const addCommentHandler = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  console.log('formProps', formProps.post_id);

  const post_id = formProps.post_id.trim();
  const user_id = formProps.user_id.trim();
  const content = formProps.content.trim();

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ content, user_id, post_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/${post_id}`);
  } else {
    alert('Failed to add comment.');
  }
};
