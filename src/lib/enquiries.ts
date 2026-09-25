// Enquiry and newsletter storage.
//
// Everything goes through the EnquiryStore / SubscriberStore interfaces. The
// current implementation keeps data in the browser's localStorage, which is
// enough to demo the full flow (form -> admin page) without a database. To go
// live with shared data, write an implementation that calls your API (for
// example Supabase, Firebase, a Google Sheet via Apps Script, or a serverless
// function) and export it below instead. Nothing else needs to change.

import { site } from '../data/site';

export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'closed';

export const enquiryStatuses: { id: EnquiryStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'closed', label: 'Closed' },
];

export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  service: string;
  pickup?: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: string;
  vehicle?: string;
  packageName?: string;
  message?: string;
  /** Page the enquiry was sent from. */
  source?: string;
}

export interface Enquiry extends EnquiryInput {
  id: string;
  createdAt: string;
  status: EnquiryStatus;
  notes?: string;
}

export interface EnquiryStore {
  list(): Promise<Enquiry[]>;
  add(input: EnquiryInput): Promise<Enquiry>;
  update(id: string, patch: Partial<Pick<Enquiry, 'status' | 'notes'>>): Promise<Enquiry | undefined>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}

export interface Subscriber {
  email: string;
  createdAt: string;
}

export interface SubscriberStore {
  list(): Promise<Subscriber[]>;
  add(email: string): Promise<{ subscriber: Subscriber; alreadySubscribed: boolean }>;
  remove(email: string): Promise<void>;
}

export const STORAGE_KEYS = {
  enquiries: 'tt.enquiries.v1',
  subscribers: 'tt.subscribers.v1',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked (some private windows). The visitor can
    // still send the enquiry on WhatsApp, so fail quietly.
  }
}

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function createReference(date = new Date()) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const stamp = `${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join('');
  return `TT-${stamp}-${suffix}`;
}

class LocalEnquiryStore implements EnquiryStore {
  constructor(private key: string) {}

  async list() {
    return read<Enquiry[]>(this.key, []).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async add(input: EnquiryInput) {
    const enquiry: Enquiry = {
      ...input,
      id: createReference(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    write(this.key, [enquiry, ...read<Enquiry[]>(this.key, [])]);
    return enquiry;
  }

  async update(id: string, patch: Partial<Pick<Enquiry, 'status' | 'notes'>>) {
    const all = read<Enquiry[]>(this.key, []);
    const index = all.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    all[index] = { ...all[index], ...patch };
    write(this.key, all);
    return all[index];
  }

  async remove(id: string) {
    write(
      this.key,
      read<Enquiry[]>(this.key, []).filter((e) => e.id !== id),
    );
  }

  async clear() {
    write(this.key, []);
  }
}

class LocalSubscriberStore implements SubscriberStore {
  constructor(private key: string) {}

  async list() {
    return read<Subscriber[]>(this.key, []).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async add(email: string) {
    const all = read<Subscriber[]>(this.key, []);
    const normalised = email.trim().toLowerCase();
    const existing = all.find((s) => s.email === normalised);
    if (existing) return { subscriber: existing, alreadySubscribed: true };
    const subscriber = { email: normalised, createdAt: new Date().toISOString() };
    write(this.key, [subscriber, ...all]);
    return { subscriber, alreadySubscribed: false };
  }

  async remove(email: string) {
    write(
      this.key,
      read<Subscriber[]>(this.key, []).filter((s) => s.email !== email),
    );
  }
}

// Swap these two lines for API-backed stores when a database is added.
export const enquiryStore: EnquiryStore = new LocalEnquiryStore(STORAGE_KEYS.enquiries);
export const subscriberStore: SubscriberStore = new LocalSubscriberStore(STORAGE_KEYS.subscribers);

/* ---------------------------------------------------------------------------
   Helpers shared by the forms and the admin page
--------------------------------------------------------------------------- */

/** Returns the 10-digit Indian mobile number, or null if it isn't one. */
export function normaliseIndianMobile(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export function formatMobile(digits: string) {
  return digits.length === 10 ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
}

export function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Lines describing an enquiry, used for WhatsApp and email. */
export function enquiryLines(e: Enquiry) {
  const rows: [string, string | undefined][] = [
    ['Reference', e.id],
    ['Service', e.service],
    ['Package', e.packageName],
    ['Name', e.name],
    ['Phone', formatMobile(e.phone)],
    ['Email', e.email],
    ['Pickup', e.pickup],
    ['Drop / destination', e.destination],
    ['Travel date', formatDate(e.travelDate)],
    ['Return date', formatDate(e.returnDate)],
    ['Travellers', e.passengers],
    ['Vehicle', e.vehicle],
    ['Notes', e.message],
  ];
  return rows.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v}`);
}

export function enquiryWhatsAppText(e: Enquiry) {
  return [`Hello ${site.name}, I'd like to book a trip.`, '', ...enquiryLines(e)].join('\n');
}

/**
 * Optional email copy of each enquiry through Web3Forms (free, no server).
 * Set PUBLIC_WEB3FORMS_KEY to enable; otherwise this does nothing.
 */
export async function emailCopy(subject: string, lines: string[]): Promise<'sent' | 'skipped' | 'failed'> {
  const key = import.meta.env.PUBLIC_WEB3FORMS_KEY;
  if (!key) return 'skipped';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: `${site.name} website`,
        message: lines.join('\n'),
      }),
    });
    return res.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}
