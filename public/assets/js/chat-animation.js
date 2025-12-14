// Chat animation script
document.addEventListener('DOMContentLoaded', function () {
  const messages = document.querySelectorAll('.chat-msg');
  const baseDelay = 400;
  const step = 700;
  messages.forEach((msg, index) => {
    const delay = baseDelay + index * step;
    setTimeout(() => {
      msg.classList.add('show');
    }, delay);
  });
});
