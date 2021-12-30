module.exports = {
  get_emoji: (id) => {
    let postIcon = '📗';

    if (id % 4 === 0) {
      postIcon = '📘';
    } else if (id % 3 === 0) {
      postIcon = '📙';
    } else if (id % 2 === 0) {
      postIcon = '📒';
    }

    return `<span for="img" aria-label="post-icon">${postIcon}</span>`;
  },
};
