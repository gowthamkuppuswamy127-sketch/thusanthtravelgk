# Tushanth Tours and Travels website

Website for **Tushanth Tours and Travels**, Banashankari, Bengaluru: cab and Tempo Traveller hire, airport transfers, domestic and international tour packages, custom packages (family, honeymoon, MICE, education, industrial visits) and hotel bookings.

- **Stack:** [Astro 7](https://astro.build) (static output) · Tailwind CSS 4 · TypeScript · Poppins (self-hosted via Fontsource) · Lucide icons
- **Look:** "Coastal Blue": a white page with ocean-blue buttons and accents, deep navy text, and a full-screen photo hero with frosted panels. The logo gold is kept for stars.
- **Pages:** Home, Tours & packages (with filters), Our fleet, About us, Contact, plus a hidden `/admin` page for enquiries.

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the built site
```

## Project structure

```
src/
  data/            All editable content (see below)
  components/      Navbar, Footer, EnquiryForm, EnquiryModal, TourCard...
  components/home/ The home page sections, in page order
  layouts/         BaseLayout (SEO tags, fonts, nav, footer, enquiry popup)
  lib/enquiries.ts Enquiry + newsletter storage (swap this for a database)
  scripts/         Browser scripts: enquiry form, popup, newsletter, nav
  pages/           index, tours, fleet, about, contact, admin
  styles/global.css Colour tokens, glass utilities, buttons, form fields
  assets/brand/    Logo files (original + generated transparent versions)
public/            Favicons and the social share image
scripts/           build-brand-assets.mjs (regenerates logo variants)
```

## Editing content

Everything the business will want to change lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, phone, WhatsApp number, address, Google rating, map links, hero distances |
| `tours.ts` | Tour packages, categories, prices, filters. `featured: true` puts a package on the home page |
| `services.ts` | The four service cards and the options in the enquiry form |
| `fleet.ts` | Every vehicle on the Our fleet page, grouped into cars, Tempo Travellers, buses and sleeper buses, with seats, luggage, features and rates (per hour, per km, airport fare, driver bata) |
| `testimonials.ts` | **Placeholder reviews**: replace with real ones before launch |
| `faqs.ts` | FAQ questions and answers |
| `images.ts` | Every photo on the site (see below) |

### Photos

Photos are listed once in `src/data/images.ts`. Right now they are free Unsplash photos served from Unsplash's CDN. To use your own, put a file in `public/images/` and change its `src`, for example:

```ts
hillStay: { src: '/images/coorg-homestay.jpg', alt: 'Homestay in the coffee estates of Coorg' },
```

Real photos of your own vehicles, drivers and trips will do more for bookings than stock photos.

### Logo

The original logo is `src/assets/brand/logo-original.jpg`. `npm run brand` rebuilds the transparent versions, favicons and the share image (`public/og-image.jpg`) from it.

## Enquiries and the admin page

Every **Book now**, **Enquire** and **Get a quote** button opens the same enquiry popup, prefilled with the service or package. The Contact page has the same form inline and also accepts prefill links, for example `/contact?service=Tour%20package&package=Bali%20honeymoon`.

When someone sends an enquiry:

1. It is saved with a reference number such as `TT-260925-K4Q7`.
2. The visitor gets a **Send on WhatsApp** button with every detail already written out, addressed to 096202 47333.
3. If `PUBLIC_WEB3FORMS_KEY` is set, a copy is also emailed to you (see below).

Open **`/admin`** (not linked from the site) to see enquiries, change status (New → Contacted → Confirmed → Closed), add internal notes, search, export CSV, and see newsletter sign-ups. The demo passcode is `tushanth-demo`; change it with `PUBLIC_ADMIN_PASSCODE`. **Add demo enquiries** fills the table so you can try it.

### Current limitation: no database yet

As requested, there is no database. Enquiries are stored in the **browser's localStorage**, so the admin page only shows enquiries sent from the same browser. That is enough to demo the whole flow, but it is not how you receive real customer enquiries. Until a database is connected, real enquiries reach you through WhatsApp (and email, if you add the Web3Forms key).

The passcode check also runs in the browser, so it is not real security. Replace it with proper login at the same time as adding a database.

### Adding a database later

All storage goes through two small interfaces in `src/lib/enquiries.ts`: `EnquiryStore` and `SubscriberStore`. To go live, write a class that implements them by calling your backend, and change these two lines at the bottom of the storage section:

```ts
export const enquiryStore: EnquiryStore = new LocalEnquiryStore(STORAGE_KEYS.enquiries);
export const subscriberStore: SubscriberStore = new LocalSubscriberStore(STORAGE_KEYS.subscribers);
```

The forms and the admin page don't need to change. Good options:

- **Supabase** (Postgres with row-level security and built-in login for the admin page)
- **Firebase Firestore** with Firebase Auth
- **Google Sheets via Apps Script**: free, no server, enquiries land in a spreadsheet
- A **serverless function** on Netlify or Vercel writing to any database

### Email copies without a database (optional)

Create a free access key at [web3forms.com](https://web3forms.com) and set it as `PUBLIC_WEB3FORMS_KEY`. Each enquiry and newsletter sign-up is then emailed to the address you registered, and the success message tells the visitor you have received it.

## Configuration

Copy `.env.example` to `.env` for local use, or set these in your host's dashboard:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Your live URL, e.g. `https://www.example.com`. Used for canonical and share links |
| `PUBLIC_ADMIN_PASSCODE` | Passcode for `/admin` (default `tushanth-demo`) |
| `PUBLIC_WEB3FORMS_KEY` | Optional email copies of enquiries |

## Deploying

It's a static site, so any static host works. On Netlify, Vercel or Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22 (set by `.nvmrc`)

## Before going live

- [ ] Replace the sample testimonials in `src/data/testimonials.ts` with real reviews (with the customers' permission)
- [ ] Check package prices, durations and inclusions in `src/data/tours.ts`
- [ ] Check the vehicles and rates in `src/data/fleet.ts` against your current rate card (the sleeper buses, bus sizes and all rates are estimates)
- [ ] Check the FAQ answers and the claims in the "Why book with us" and About sections against how the business works
- [ ] Swap stock photos for your own
- [ ] Set `SITE_URL` and change `PUBLIC_ADMIN_PASSCODE`
- [ ] Connect a database (and real login) if you want the admin page to collect enquiries from every visitor
