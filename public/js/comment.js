const postClickHandler = (post_id) => {
  console.log('post_id', post_id);
  //event.preventDefault();
  console.log('event', event);
  document.location.replace(`/${post_id}`);
};

const addCommentHandler = () => {};
