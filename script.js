if (window.navigator.userAgent.indexOf('MSIE ') > -1) {
  window.location.href = 'index4.html';
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const formattedHours = String(hours);
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const clockTime = document.querySelector('#clock .clock-time');
  if (clockTime) {
    clockTime.textContent = ` ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  }
}

updateClock();
setInterval(updateClock, 1000);