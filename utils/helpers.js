module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = '📗';

    if (randomNum > 0.75) {
      book = '📘';
    } else if (randomNum > 0.5) {
      book = '📙';
    } else if (randomNum > 0.25) {
      book = '📒';
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },
};
