import {
  emailCopy,
  enquiryLines,
  enquiryStore,
  enquiryWhatsAppText,
  formatMobile,
  normaliseIndianMobile,
  type Enquiry,
  type EnquiryInput,
} from '../lib/enquiries';
import { whatsappHref } from '../data/site';

export interface EnquiryPrefill {
  service?: string;
  packageName?: string;
  pickup?: string;
  destination?: string;
  travelDate?: string;
  passengers?: string;
  vehicle?: string;
}

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function localToday() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function field(form: HTMLFormElement, name: string) {
  return form.elements.namedItem(name) as Field | null;
}

function parts(root: HTMLElement) {
  return {
    form: root.querySelector<HTMLFormElement>('form[data-enquiry-form]')!,
    success: root.querySelector<HTMLElement>('[data-success]')!,
  };
}

function setPackage(root: HTMLElement, name?: string) {
  const { form } = parts(root);
  const chip = root.querySelector<HTMLElement>('[data-package-chip]');
  const input = field(form, 'packageName');
  if (!chip || !input) return;
  chip.hidden = !name;
  input.value = name ?? '';
  const label = chip.querySelector('[data-package-name]');
  if (label) label.textContent = name ?? '';
}

export function prefillEnquiry(root: HTMLElement, prefill: EnquiryPrefill) {
  const { form } = parts(root);
  for (const [key, value] of Object.entries(prefill)) {
    if (!value || key === 'packageName') continue;
    const el = field(form, key);
    if (!el) continue;
    if (el instanceof HTMLSelectElement) {
      if (Array.from(el.options).some((o) => o.value === value)) el.value = value;
    } else {
      el.value = value;
    }
  }
  setPackage(root, prefill.packageName);
}

function errorEl(form: HTMLFormElement, el: Field) {
  const id = el.getAttribute('aria-describedby');
  return id ? form.querySelector<HTMLElement>(`#${CSS.escape(id)}`) : null;
}

function setFieldError(form: HTMLFormElement, el: Field, message?: string) {
  const err = errorEl(form, el);
  if (message) {
    el.setAttribute('aria-invalid', 'true');
    if (err) {
      err.textContent = message;
      err.hidden = false;
    }
  } else {
    el.removeAttribute('aria-invalid');
    if (err) {
      err.textContent = '';
      err.hidden = true;
    }
  }
}

function validate(form: HTMLFormElement) {
  const get = (name: string) => (field(form, name)?.value ?? '').trim();
  const errors: Record<string, string> = {};

  const name = get('name').slice(0, 80);
  if (name.length < 2) errors.name = 'Enter your name so we know who to ask for.';

  const phone = normaliseIndianMobile(get('phone'));
  if (!get('phone')) errors.phone = 'Enter a mobile number so we can send your quote.';
  else if (!phone) errors.phone = 'Enter a 10-digit Indian mobile number, for example 98450 12345.';

  const service = get('service');
  if (!service) errors.service = 'Choose the service you need.';

  const email = get('email');
  if (email && !EMAIL_RE.test(email)) errors.email = 'Check the email address, or leave it blank.';

  const travelDate = get('travelDate');
  const returnDate = get('returnDate');
  if (travelDate && returnDate && returnDate < travelDate) errors.returnDate = 'The return date is before the travel date.';

  const values: EnquiryInput = {
    name,
    phone: phone ?? '',
    service,
    email: email || undefined,
    pickup: get('pickup').slice(0, 160) || undefined,
    destination: get('destination').slice(0, 160) || undefined,
    travelDate: travelDate || undefined,
    returnDate: returnDate || undefined,
    passengers: get('passengers') || undefined,
    vehicle: get('vehicle') || undefined,
    packageName: get('packageName') || undefined,
    message: get('message').slice(0, 1500) || undefined,
  };
  return { errors, values };
}

function showSuccess(root: HTMLElement, enquiry: Enquiry, emailed: boolean) {
  const { form, success } = parts(root);
  const set = (sel: string, text: string) => {
    const el = success.querySelector(sel);
    if (el) el.textContent = text;
  };
  set('[data-success-name]', enquiry.name.split(' ')[0]);
  set('[data-success-ref]', enquiry.id);
  if (emailed) {
    set('[data-success-title]', 'Enquiry sent');
    set(
      '[data-success-note]',
      `Our team will call you on ${formatMobile(enquiry.phone)} with a quote. Want a faster reply? Send it on WhatsApp too.`,
    );
  }
  const wa = success.querySelector<HTMLAnchorElement>('[data-success-whatsapp]');
  if (wa) wa.href = whatsappHref(enquiryWhatsAppText(enquiry));

  form.hidden = true;
  success.hidden = false;
  success.focus({ preventScroll: true });
  success.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function resetEnquiry(root: HTMLElement, clearFields: boolean) {
  const { form, success } = parts(root);
  if (clearFields) {
    form.reset();
    setPackage(root, undefined);
  }
  form.querySelectorAll<Field>('[aria-invalid]').forEach((el) => setFieldError(form, el));
  form.hidden = false;
  success.hidden = true;
}

function focusFirstEmpty(form: HTMLFormElement) {
  const candidates = ['service', 'name', 'phone'].map((n) => field(form, n));
  const target = candidates.find((el) => el && !el.value) ?? field(form, 'name');
  target?.focus();
}

export function initEnquiryForms() {
  document.querySelectorAll<HTMLElement>('[data-enquiry]').forEach((root) => {
    const { form } = parts(root);
    if (!form || form.dataset.ready) return;
    form.dataset.ready = 'true';

    const today = localToday();
    form.querySelectorAll<HTMLInputElement>('[data-min-today]').forEach((input) => (input.min = today));
    field(form, 'travelDate')?.addEventListener('change', (e) => {
      const ret = field(form, 'returnDate') as HTMLInputElement | null;
      const value = (e.target as HTMLInputElement).value;
      if (ret) ret.min = value || today;
    });

    root.querySelector('[data-package-clear]')?.addEventListener('click', () => setPackage(root, undefined));
    root.querySelector('[data-reset]')?.addEventListener('click', () => {
      resetEnquiry(root, true);
      focusFirstEmpty(form);
    });

    if (form.hasAttribute('data-prefill-url')) {
      const p = new URLSearchParams(location.search);
      const val = (k: string) => p.get(k) ?? undefined;
      prefillEnquiry(root, {
        service: val('service'),
        packageName: val('package'),
        pickup: val('pickup'),
        destination: val('destination'),
        travelDate: val('date'),
        passengers: val('passengers'),
        vehicle: val('vehicle'),
      });
    }

    form.addEventListener('input', (e) => {
      const target = e.target as Field;
      if (target.getAttribute('aria-invalid') === 'true') setFieldError(form, target);
    });
    form.addEventListener('change', (e) => {
      const target = e.target as Field;
      if (target.getAttribute('aria-invalid') === 'true') setFieldError(form, target);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { errors, values } = validate(form);
      form.querySelectorAll<Field>('input, select, textarea').forEach((el) => {
        if (el.name) setFieldError(form, el, errors[el.name]);
      });
      const firstInvalid = form.querySelector<Field>('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const button = form.querySelector<HTMLButtonElement>('[data-submit]');
      const label = form.querySelector('[data-submit-label]');
      if (button) button.disabled = true;
      if (label) label.textContent = 'Sending…';
      try {
        const enquiry = await enquiryStore.add({ ...values, source: location.pathname });
        const emailed = (await emailCopy(`New enquiry ${enquiry.id}: ${enquiry.service}`, enquiryLines(enquiry))) === 'sent';
        showSuccess(root, enquiry, emailed);
      } finally {
        if (button) button.disabled = false;
        if (label) label.textContent = 'Send enquiry';
      }
    });
  });
}

export function openEnquiry(prefill: EnquiryPrefill = {}) {
  const dialog = document.querySelector<HTMLDialogElement>('[data-enquiry-dialog]');
  const root = dialog?.querySelector<HTMLElement>('[data-enquiry]');
  if (!dialog || !root || typeof dialog.showModal !== 'function') {
    const params = new URLSearchParams();
    if (prefill.service) params.set('service', prefill.service);
    if (prefill.packageName) params.set('package', prefill.packageName);
    const query = params.toString();
    location.href = `/contact${query ? `?${query}` : ''}#enquiry`;
    return;
  }
  const { form, success } = parts(root);
  resetEnquiry(root, !success.hidden);
  prefillEnquiry(root, prefill);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  focusFirstEmpty(form);
}

export function initEnquiryDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-enquiry-dialog]');
  if (!dialog) return;
  dialog.querySelectorAll('[data-dialog-close]').forEach((btn) => btn.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-enquire]');
    if (!trigger) return;
    const me = e as MouseEvent;
    if (me.metaKey || me.ctrlKey || me.shiftKey || me.button !== 0) return;
    e.preventDefault();
    openEnquiry({
      service: trigger.dataset.service,
      packageName: trigger.dataset.package,
      destination: trigger.dataset.destination,
    });
  });
}
