import type { PhotoKey } from './images';

// Packages shown on the home page (featured: true) and the Tours page.
// Prices are indicative starting prices per person in INR; set priceFrom to
// null for trips that are always quoted on request.

export const tourCategories = [
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
  { id: 'weekend', label: 'Weekend getaways' },
  { id: 'family', label: 'Family' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'mice', label: 'MICE & corporate' },
  { id: 'education', label: 'Education tours' },
  { id: 'industrial', label: 'Industrial visits' },
] as const;

export type TourCategory = (typeof tourCategories)[number]['id'];

export interface Tour {
  slug: string;
  name: string;
  places: string;
  summary: string;
  days: number;
  nights: number;
  /** Shown instead of "X days / Y nights" when the length is flexible. */
  durationLabel?: string;
  priceFrom: number | null;
  categories: TourCategory[];
  photo: PhotoKey;
  highlights: string[];
  featured?: boolean;
  /** Higher numbers sort first under "Most popular". */
  popularity: number;
}

export const tours: Tour[] = [
  {
    slug: 'coorg-mysuru',
    name: 'Coorg & Mysuru hill weekend',
    places: 'Mysuru · Bylakuppe · Madikeri',
    summary: 'Palace mornings, monastery afternoons and a night among the coffee estates of Coorg.',
    days: 3,
    nights: 2,
    priceFrom: 8999,
    categories: ['domestic', 'weekend', 'family'],
    photo: 'hillStay',
    highlights: [
      'Mysuru Palace and Chamundi Hills',
      'Golden Temple at Bylakuppe',
      "Abbey Falls and Raja's Seat",
      'Stay near the coffee estates',
    ],
    featured: true,
    popularity: 100,
  },
  {
    slug: 'ooty-coonoor',
    name: 'Ooty & Coonoor escape',
    places: 'Ooty · Coonoor · Pykara',
    summary: 'Cool Nilgiri air, tea country viewpoints and a slow ride on the hill railway.',
    days: 3,
    nights: 2,
    priceFrom: 9499,
    categories: ['domestic', 'weekend', 'family', 'honeymoon'],
    photo: 'valley',
    highlights: [
      'Nilgiri toy train (subject to tickets)',
      'Doddabetta Peak and the Botanical Garden',
      'Tea factory visit in Coonoor',
      'Boating on Pykara Lake',
    ],
    featured: true,
    popularity: 95,
  },
  {
    slug: 'munnar-alleppey',
    name: 'Munnar & Alleppey backwaters',
    places: 'Munnar · Thekkady · Alleppey',
    summary: 'Tea hills, a spice-garden walk and a night on a houseboat in the Kerala backwaters.',
    days: 5,
    nights: 4,
    priceFrom: 17999,
    categories: ['domestic', 'family', 'honeymoon'],
    photo: 'mistyHills',
    highlights: [
      'Tea estates and Eravikulam National Park',
      'Spice plantation walk in Thekkady',
      'Overnight houseboat in Alleppey',
      'Kathakali show (optional)',
    ],
    popularity: 90,
  },
  {
    slug: 'goa-beaches',
    name: 'Goa beaches & forts',
    places: 'North Goa · Old Goa · South Goa',
    summary: 'Busy beaches up north, quiet coves down south, and old churches in between.',
    days: 4,
    nights: 3,
    priceFrom: 12999,
    categories: ['domestic', 'family', 'honeymoon'],
    photo: 'beach',
    highlights: [
      'Calangute, Baga and Anjuna beaches',
      'Old Goa churches and Fort Aguada',
      'Sunset cruise on the Mandovi',
      "South Goa's quieter beaches",
    ],
    popularity: 85,
  },
  {
    slug: 'golden-triangle',
    name: 'Golden Triangle: Delhi, Agra, Jaipur',
    places: 'Delhi · Agra · Jaipur',
    summary: "India's classic heritage loop, with the Taj Mahal at sunrise and Jaipur's forts.",
    days: 6,
    nights: 5,
    priceFrom: 24999,
    categories: ['domestic', 'family', 'education'],
    photo: 'tajMahal',
    highlights: [
      'Taj Mahal at sunrise',
      'Amber Fort and Hawa Mahal',
      'Qutub Minar and India Gate',
      'AC vehicle with driver throughout',
    ],
    featured: true,
    popularity: 80,
  },
  {
    slug: 'dubai-city-desert',
    name: 'Dubai city & desert',
    places: 'Dubai · Abu Dhabi',
    summary: 'Skyline views, a desert safari and a day trip to Abu Dhabi.',
    days: 5,
    nights: 4,
    priceFrom: 54999,
    categories: ['international', 'family'],
    photo: 'dubai',
    highlights: [
      'Burj Khalifa observation deck',
      'Desert safari with dinner',
      'Dhow cruise at Dubai Marina',
      'Abu Dhabi day trip',
    ],
    popularity: 75,
  },
  {
    slug: 'bali-honeymoon',
    name: 'Bali honeymoon',
    places: 'Ubud · Kintamani · Seminyak',
    summary: 'Pool villas in Ubud, rice terraces and sunsets over the sea temples.',
    days: 6,
    nights: 5,
    priceFrom: 62999,
    categories: ['international', 'honeymoon'],
    photo: 'bali',
    highlights: [
      'Private pool villa in Ubud',
      'Tegallalang rice terraces',
      'Kintamani volcano viewpoint',
      'Sunset at Tanah Lot',
    ],
    featured: true,
    popularity: 78,
  },
  {
    slug: 'maldives-island',
    name: 'Maldives island resort',
    places: 'Malé · resort island',
    summary: 'A short flight from Bengaluru to clear lagoons, reef snorkelling and slow days.',
    days: 4,
    nights: 3,
    priceFrom: 84999,
    categories: ['international', 'honeymoon'],
    photo: 'maldives',
    highlights: [
      'Beach or water villa stay',
      'Speedboat or seaplane transfers',
      'Snorkelling on the house reef',
      'Meal plans to suit your budget',
    ],
    popularity: 70,
  },
  {
    slug: 'thailand-phuket-krabi',
    name: 'Thailand: Phuket & Krabi',
    places: 'Phuket · Phi Phi · Krabi',
    summary: 'Island hopping, limestone cliffs and night markets, with every transfer arranged.',
    days: 5,
    nights: 4,
    priceFrom: 42999,
    categories: ['international', 'family', 'honeymoon'],
    photo: 'thailand',
    highlights: [
      'Phi Phi Islands by speedboat',
      'Four-island tour from Krabi',
      'Phuket Old Town walk',
      'Airport and hotel transfers',
    ],
    popularity: 72,
  },
  {
    slug: 'corporate-offsite',
    name: 'Corporate offsites & MICE',
    places: 'Coorg · Chikmagalur · Mysuru · Goa',
    summary: 'Meetings, incentives, conferences and events, planned around your team size and agenda.',
    days: 2,
    nights: 1,
    durationLabel: 'Flexible dates',
    priceFrom: null,
    categories: ['mice', 'domestic'],
    photo: 'conference',
    highlights: [
      'Venue and resort shortlists',
      'Tempo Travellers and coaches for the team',
      'Team activities and gala dinners',
      'One coordinator from start to finish',
    ],
    popularity: 60,
  },
  {
    slug: 'educational-tours',
    name: 'School & college educational tours',
    places: 'Mysuru · Hampi · science centres and museums',
    summary: 'Study trips built around the syllabus, with safe transport and supervised stays.',
    days: 3,
    nights: 2,
    durationLabel: 'Flexible dates',
    priceFrom: null,
    categories: ['education', 'domestic'],
    photo: 'campus',
    highlights: [
      'Itineraries planned with teachers',
      'Buses and Tempo Travellers with experienced drivers',
      'Group stays with separate rooms for staff',
      'Student group pricing',
    ],
    popularity: 55,
  },
  {
    slug: 'industrial-visits',
    name: 'Industrial visits',
    places: 'Bengaluru · Mysuru · Hosur',
    summary: 'Plant and factory visits for engineering, polytechnic and MBA students.',
    days: 1,
    nights: 0,
    durationLabel: 'Day trips or overnight',
    priceFrom: null,
    categories: ['industrial', 'education'],
    photo: 'industry',
    highlights: [
      'Help with scheduling the visit',
      'Group transport from campus',
      'Meals and short stops planned',
      'Day or overnight plans',
    ],
    popularity: 50,
  },
];

export const durationBuckets = [
  { id: 'short', label: 'Up to 3 days', test: (days: number) => days <= 3 },
  { id: 'mid', label: '4 to 5 days', test: (days: number) => days >= 4 && days <= 5 },
  { id: 'long', label: '6 days or more', test: (days: number) => days >= 6 },
] as const;

export const budgetBuckets = [
  { id: 'under-15k', label: 'Under ₹15,000', min: 0, max: 15000 },
  { id: '15k-40k', label: '₹15,000 to ₹40,000', min: 15000, max: 40000 },
  { id: '40k-75k', label: '₹40,000 to ₹75,000', min: 40000, max: 75000 },
  { id: 'over-75k', label: 'Over ₹75,000', min: 75000, max: Infinity },
] as const;

export function durationText(tour: Tour) {
  if (tour.durationLabel) return tour.durationLabel;
  const d = `${tour.days} ${tour.days === 1 ? 'day' : 'days'}`;
  return tour.nights ? `${d} / ${tour.nights} ${tour.nights === 1 ? 'night' : 'nights'}` : d;
}

export function formatINR(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}
