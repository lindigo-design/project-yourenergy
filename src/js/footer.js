import { subscribe } from './api.js';
import { EMAIL_PATTERN } from './constants.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('submit', async (e) => {
  if (!e.target.matches('#subscribe-form')) return;
  e.preventDefault();

  const input = e.target.elements.email;
  const email = input.value.trim();

  if (!EMAIL_PATTERN.test(email)) {
    iziToast.error({ message: 'Please enter a valid email address.', position: 'topRight' });
    return;
  }

  try {
    await subscribe(email);
    iziToast.success({ message: 'You have successfully subscribed!', position: 'topRight' });
    e.target.reset();
  } catch (err) {
    const msg = err.response?.data?.message ?? 'Subscription failed. Please try again.';
    iziToast.error({ message: msg, position: 'topRight' });
  }
});
