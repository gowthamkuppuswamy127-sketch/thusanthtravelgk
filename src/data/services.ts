import type { PhotoKey } from './images';

// Service names used by the enquiry form, the admin page and WhatsApp messages.
export const serviceOptions = [
  'Airport transfer',
  'Outstation cab',
  'Local cab (hourly)',
  'Tempo Traveller / bus hire',
  'Tour package',
  'Custom package',
  'Hotel / resort booking',
] as const;

export type ServiceOption = (typeof serviceOptions)[number];

export const vehicleOptions = [
  'No preference',
  'Sedan (up to 4 passengers)',
  'Maruti Ertiga (up to 6)',
  'Toyota Innova Crysta (up to 7)',
  'Tempo Traveller (12 to 17)',
  'Bus (20+)',
] as const;

export interface Service {
  id: string;
  title: string;
  /** Short label on the pill over the card photo. */
  badge: string;
  blurb: string;
  points: string[];
  photo: PhotoKey;
  icon: 'plane' | 'bus' | 'compass' | 'hotel';
  enquiry: ServiceOption;
}

export const services: Service[] = [
  {
    id: 'cabs',
    badge: 'From 4 seats',
    title: 'Cabs & airport transfers',
    blurb: 'Sedan, Ertiga and Innova Crysta for Kempegowda Airport runs, city errands and outstation trips.',
    points: ['Kempegowda Airport pickup and drop', 'One-way and round trips', 'Hourly local rentals'],
    photo: 'flight',
    icon: 'plane',
    enquiry: 'Airport transfer',
  },
  {
    id: 'coaches',
    badge: '12+ seats',
    title: 'Tempo Traveller & bus hire',
    blurb: '12 to 17 seat Tempo Travellers and buses for weddings, pilgrimages and office outings.',
    points: ['12 to 17 seat Tempo Travellers', 'Buses for larger groups', 'Drivers used to long highway runs'],
    photo: 'coach',
    icon: 'bus',
    enquiry: 'Tempo Traveller / bus hire',
  },
  {
    id: 'tours',
    badge: 'India & abroad',
    title: 'Tour packages',
    blurb: 'Ready-made and custom trips across India and abroad, with stays and sightseeing sorted.',
    points: ['Domestic and international', 'Family and honeymoon trips', 'MICE, education and industrial visits'],
    photo: 'roadTrip',
    icon: 'compass',
    enquiry: 'Tour package',
  },
  {
    id: 'hotels',
    badge: 'Any budget',
    title: 'Hotels & resorts',
    blurb: 'Rooms matched to your plan and budget, from hill homestays to beach resorts.',
    points: ['Hill, beach and city stays', 'Group and wedding room blocks', 'Booked with or without a cab'],
    photo: 'resort',
    icon: 'hotel',
    enquiry: 'Hotel / resort booking',
  },
];

export interface Vehicle {
  name: string;
  examples: string;
  passengers: string;
  bestFor: string;
  icon: 'car' | 'car-front' | 'bus-front' | 'bus';
}

export const fleet: Vehicle[] = [
  {
    name: 'Sedan',
    examples: 'Swift Dzire, Toyota Etios or similar',
    passengers: 'Up to 4',
    bestFor: 'Airport runs, city trips and couples heading out of town.',
    icon: 'car',
  },
  {
    name: 'Maruti Ertiga',
    examples: 'Seven-seat MUV',
    passengers: 'Up to 6',
    bestFor: 'Small families and friends on weekend getaways.',
    icon: 'car-front',
  },
  {
    name: 'Toyota Innova Crysta',
    examples: 'Premium MUV',
    passengers: 'Up to 7',
    bestFor: 'Long outstation drives where comfort matters.',
    icon: 'car-front',
  },
  {
    name: 'Tempo Traveller',
    examples: 'Air-conditioned group van',
    passengers: '12 to 17',
    bestFor: 'Groups, pilgrimages, weddings and office offsites.',
    icon: 'bus-front',
  },
];
