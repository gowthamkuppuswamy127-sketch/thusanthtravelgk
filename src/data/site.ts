// Business details used across the site. Edit here, not in the pages.

const address = {
  line1: '118, 1st Cross, Subramanyapura Road, Kadrenahalli',
  line2: 'Kumaraswamy Layout 2nd Stage, Banashankari',
  city: 'Bengaluru',
  region: 'Karnataka',
  postalCode: '560070',
  country: 'IN',
};

const mapsQuery = `Tushanth tours and travels, ${address.line1}, ${address.line2}, ${address.region} ${address.postalCode}`;

export const site = {
  name: 'Tushanth Tours and Travels',
  shortName: 'Tushanth',
  tagline: 'Cabs, Tempo Travellers, tours and hotels from Bengaluru',
  description:
    'Bengaluru travel agency in Banashankari for airport taxis, Innova Crysta, Ertiga and sedan hire, Tempo Traveller and bus rentals, domestic and international tour packages, and hotel bookings.',

  phoneDisplay: '096202 47333',
  phoneE164: '+919620247333',
  whatsappNumber: '919620247333',

  address,
  addressOneLine: `${address.line1}, ${address.line2}, ${address.city}, ${address.region} ${address.postalCode}`,

  rating: 4.8,
  reviewCount: 116,

  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  reviewsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Tushanth tours and travels Banashankari Bengaluru')}`,
} as const;

export const telHref = `tel:${site.phoneE164}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours & packages' },
  { href: '/about', label: 'About us' },
  { href: '/contact', label: 'Contact' },
] as const;

