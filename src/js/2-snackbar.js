import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay" ]');
const radioBtn = document.querySelector('[name="state"]');

form.addEventListener('submit', handelSubmit);

function handelSubmit(event) {
  event.preventDefault();

  const checked = document.querySelector('[name="state"]:checked');
  const delayValue = delay.value;

  const promise = new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (checked.value === 'fulfilled') {
        resolve(delayValue);
      } else {
        rejected(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(value =>
      iziToast.success({
        position: 'topRight',
        icon: '',
        timeout: value,
        title: '✅',
        message: ` Fulfilled promise in ${value}ms`,
      })
    )
    .catch(value =>
      iziToast.error({
        position: 'topRight',
        icon: '',
        timeout: value,
        title: '❌',
        message: `Rejected promise in ${value}ms`,
      })
    );
  form.reset();
}
