import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);

let userSelectedDate;

startBtn.addEventListener('click', timeCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        timeout: 2000,
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];    
    }
  },
};

flatpickr(dateInput, options);

function timeCounter() {
  dateInput.setAttribute('disabled', true);
  startBtn.setAttribute('disabled', true);

  const validateData = new Date(userSelectedDate);
  const toMs = validateData.getTime();

  const intervalSetter = setInterval(() => {
    const delta = toMs - new Date();
    const objDate = convertMs(delta);
    const { days, hours, minutes, seconds } = objDate;

    daysOutput.textContent = String(days).padStart(2, '0');
    hoursOutput.textContent = String(hours).padStart(2, '0');
    minutesOutput.textContent = String(minutes).padStart(2, '0');
    secondsOutput.textContent = String(seconds).padStart(2, '0');
    if (
      +daysOutput.textContent <= 0 &&
      +hoursOutput.textContent <= 0 &&
      +minutesOutput.textContent <= 0 &&
      +secondsOutput.textContent <= 0
    ) {
      clearInterval(intervalSetter);
      startBtn.removeAttribute('disabled');
      dateInput.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


