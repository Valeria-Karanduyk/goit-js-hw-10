'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

let intervalId = null;
let userSelectedDate = null;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      iziToast.warning({
        title: 'Error',
        message: 'Please choose a date in the future',
        titleColor: 'rgba(255, 0, 0, 0.8)',
        backgroundColor: 'rgb(255, 99, 71)',
        position: 'topRight',
      });
      refs.start.disabled = true;
    } else {
      refs.start.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', () => {
  if (!userSelectedDate) return;

  refs.start.disabled = true;
  refs.input.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const differenceInTime = userSelectedDate - currentTime;

    if (differenceInTime <= 0) {
      clearInterval(intervalId);
      refs.input.disabled = false;
      refs.start.disabled = true;
      return;
    }

    const result = convertMs(differenceInTime);
    viewOfTimer(result);
  }, 1000);
});

function viewOfTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
