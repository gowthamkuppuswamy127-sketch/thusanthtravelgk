import { emailCopy, subscriberStore } from '../lib/enquiries';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initNewsletter() {
  document.querySelectorAll<HTMLFormElement>('form[data-newsletter]').forEach((form) => {
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    const status = form.parentElement?.querySelector<HTMLElement>('[data-newsletter-status]');
    if (!input || !status) return;

    const say = (text: string, tone: 'ok' | 'error') => {
      status.textContent = text;
      status.dataset.tone = tone;
    };

    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!EMAIL_RE.test(email)) {
        input.setAttribute('aria-invalid', 'true');
        say('Enter an email address like name@example.com.', 'error');
        input.focus();
        return;
      }
      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (button) button.disabled = true;
      try {
        const { alreadySubscribed } = await subscriberStore.add(email);
        if (alreadySubscribed) {
          say('You are already on the list with this email.', 'ok');
        } else {
          await emailCopy('New newsletter subscriber', [`Email: ${email}`]);
          say('You are on the list. Look out for weekend ideas and seasonal offers.', 'ok');
          form.reset();
        }
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
}
