'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromiseEl = document.querySelector('form');

const funcForInput = event => {
  event.preventDefault();
  const form = event.target;
  let delay = form.elements.delay.value;
  const radioResolve = form.elements.state.value;

  const makePromise = (delayFrom, radioResolveFrom) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (radioResolveFrom === 'fulfilled') {
          resolve(delayFrom);
        } else {
          reject(delayFrom);
        }
      }, delayFrom);
    });
  };

  makePromise(delay, radioResolve)
    .then(value => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        messageColor: '#fff',
        messageSize: '18px',
        messageLineHeight: '20px',
        backgroundColor: 'rgb(125, 218, 88)',
        position: 'topRight',
      });
      const iziToastElStyle = document.querySelector('.iziToast');
      iziToastElStyle.style.borderRadius = '10px';
      iziToastElStyle.style.overflow = 'hidden';
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${error}ms`,
        messageColor: '#fff',
        messageSize: '18px',
        messageLineHeight: '20px',
        backgroundColor: 'rgb(248, 108, 109)',
        position: 'topRight',
      });
      const iziToastElStyle = document.querySelector('.iziToast');
      iziToastElStyle.style.borderRadius = '10px';
      iziToastElStyle.style.overflow = 'hidden';
    });
};

formPromiseEl.addEventListener('submit', funcForInput);
