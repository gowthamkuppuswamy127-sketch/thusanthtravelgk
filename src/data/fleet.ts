import type { PhotoKey } from './images';
import type { ServiceOption, VehicleOption } from './services';

// The Our Fleet page (/fleet) and the About page's fleet summary read from
// this file. Rates are indicative starting prices in rupees: check them
// against the current rate card before going live.

export type FleetIcon = 'car' | 'car-front' | 'bus-front' | 'bus';

export interface FleetVehicle {
  id: string;
  name: string;
  /** Models or body type, shown under the name. */
  models: string;
  seats: number;
  /** Replaces "N seats" when the capacity needs wording, e.g. berths. */
  capacityText?: string;
  bags: string;
  icon: FleetIcon;
  bestFor: string;
  features: string[];
  /** Local use, per hour, with a minimum number of hours. */
  perHour?: number;
  minHours?: number;
  /** Outstation, per km, with a minimum distance billed per day. */
  perKm: number;
  minKmPerDay: number;
  /** One-way Kempegowda Airport transfer from south Bengaluru. */
  airportFrom?: number;
  /** Driver's daily allowance on outstation trips. */
  driverBata: number;
  popular?: boolean;
  vehicle: VehicleOption;
  service: ServiceOption;
}

export interface FleetCategory {
  id: string;
  /** Short label for the tab bar. */
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  photo: PhotoKey;
  icon: FleetIcon;
  capacity: string;
  vehicles: FleetVehicle[];
}

export const fleetCategories: FleetCategory[] = [
  {
    id: 'cars',
    label: 'Cars & airport',
    eyebrow: 'Cars · Airport pickup & drop',
    title: 'Cars for airport runs and city trips',
    intro:
      'Kempegowda Airport pickups and drops at any hour, local hourly hire and outstation drives. Your driver tracks your flight and waits if it is late.',
    photo: 'flight',
    icon: 'car',
    capacity: '4 to 7 passengers',
    vehicles: [
      {
        id: 'sedan',
        name: 'Sedan',
        models: 'Swift Dzire, Toyota Etios or similar',
        seats: 4,
        bags: '2 large bags',
        icon: 'car',
        bestFor: 'Airport runs, business travel and couples.',
        features: ['AC', 'Boot space for 2 suitcases', 'Phone charger'],
        perHour: 300,
        minHours: 4,
        perKm: 12,
        minKmPerDay: 300,
        airportFrom: 1299,
        driverBata: 400,
        vehicle: 'Sedan (up to 4 passengers)',
        service: 'Airport transfer',
      },
      {
        id: 'ertiga',
        name: 'Maruti Ertiga',
        models: 'Seven-seat MUV',
        seats: 6,
        bags: '3 bags',
        icon: 'car-front',
        bestFor: 'Small families and friends on weekend getaways.',
        features: ['AC', 'Three rows', 'Roof carrier on request'],
        perHour: 375,
        minHours: 4,
        perKm: 15,
        minKmPerDay: 300,
        airportFrom: 1699,
        driverBata: 400,
        vehicle: 'Maruti Ertiga (up to 6)',
        service: 'Airport transfer',
      },
      {
        id: 'innova-crysta',
        name: 'Toyota Innova Crysta',
        models: 'Premium MUV',
        seats: 7,
        bags: '4 bags',
        icon: 'car-front',
        bestFor: 'Long outstation drives and families with luggage.',
        features: ['Dual AC', 'Captain seats', 'Extra legroom'],
        perHour: 450,
        minHours: 4,
        perKm: 19,
        minKmPerDay: 300,
        airportFrom: 2199,
        driverBata: 500,
        popular: true,
        vehicle: 'Toyota Innova Crysta (up to 7)',
        service: 'Airport transfer',
      },
    ],
  },
  {
    id: 'tempo-travellers',
    label: 'Tempo Travellers',
    eyebrow: 'Tempo Travellers',
    title: 'Tempo Travellers for group trips',
    intro:
      'Pushback seats, room for everyone’s bags and a driver used to long highway runs. Ideal for pilgrimages, weddings, office outings and family reunions.',
    photo: 'roadTrip',
    icon: 'bus-front',
    capacity: '12 to 17 passengers',
    vehicles: [
      {
        id: 'tt-12',
        name: 'Tempo Traveller 12-seater',
        models: 'Force Traveller, 1+1 pushback seats',
        seats: 12,
        bags: '10+ bags',
        icon: 'bus-front',
        bestFor: 'Extended families, temple trips and weekend getaways.',
        features: ['AC', 'Pushback seats', 'Music system', 'Luggage carrier'],
        perHour: 700,
        minHours: 8,
        perKm: 24,
        minKmPerDay: 300,
        airportFrom: 3999,
        driverBata: 600,
        popular: true,
        vehicle: 'Tempo Traveller (12 to 17)',
        service: 'Tempo Traveller / bus hire',
      },
      {
        id: 'tt-17',
        name: 'Tempo Traveller 17-seater',
        models: 'Force Traveller, 2+1 pushback seats',
        seats: 17,
        bags: '14+ bags',
        icon: 'bus-front',
        bestFor: 'Office outings, wedding guests and college groups.',
        features: ['AC', 'Pushback seats', 'Music system', 'Luggage carrier'],
        perHour: 800,
        minHours: 8,
        perKm: 27,
        minKmPerDay: 300,
        airportFrom: 4499,
        driverBata: 600,
        vehicle: 'Tempo Traveller (12 to 17)',
        service: 'Tempo Traveller / bus hire',
      },
    ],
  },
  {
    id: 'buses',
    label: 'Buses',
    eyebrow: 'Buses',
    title: 'Buses for big groups',
    intro:
      'Mini buses and full-size coaches for school and college tours, corporate events, weddings and industrial visits. Need more than one? We run them together.',
    photo: 'coach',
    icon: 'bus',
    capacity: '21 to 49 passengers',
    vehicles: [
      {
        id: 'mini-bus',
        name: 'Mini bus',
        models: '21 to 26 seats, 2+1 layout',
        seats: 26,
        capacityText: '21 to 26 seats',
        bags: 'Rear boot',
        icon: 'bus',
        bestFor: 'Wedding parties, school trips and company offsites.',
        features: ['AC', 'Pushback seats', 'Music system', 'Mic for the guide'],
        perHour: 1100,
        minHours: 8,
        perKm: 38,
        minKmPerDay: 300,
        driverBata: 800,
        vehicle: 'Bus (20+)',
        service: 'Tempo Traveller / bus hire',
      },
      {
        id: 'coach-35',
        name: '35-seater coach',
        models: '2+2 pushback seats',
        seats: 35,
        bags: 'Under-floor luggage hold',
        icon: 'bus',
        bestFor: 'College tours, corporate events and pilgrim groups.',
        features: ['AC', 'Pushback seats', 'LED TV', 'Mic and speakers'],
        perHour: 1500,
        minHours: 8,
        perKm: 50,
        minKmPerDay: 300,
        driverBata: 1000,
        popular: true,
        vehicle: 'Bus (20+)',
        service: 'Tempo Traveller / bus hire',
      },
      {
        id: 'coach-49',
        name: '45 to 49-seater coach',
        models: 'Full-size 2+2 coach',
        seats: 49,
        capacityText: '45 to 49 seats',
        bags: 'Under-floor luggage hold',
        icon: 'bus',
        bestFor: 'Whole-class trips, industrial visits and large events.',
        features: ['AC', 'Pushback seats', 'LED TV', 'Mic and speakers'],
        perHour: 1900,
        minHours: 8,
        perKm: 62,
        minKmPerDay: 300,
        driverBata: 1000,
        vehicle: 'Bus (20+)',
        service: 'Tempo Traveller / bus hire',
      },
    ],
  },
  {
    id: 'sleeper-buses',
    label: 'Sleeper buses',
    eyebrow: 'Sleeper buses',
    title: 'Sleeper buses for overnight journeys',
    intro:
      'Travel through the night and arrive rested. Our sleeper coaches suit long pilgrimages, Goa and Kerala trips and multi-day group tours, with two drivers on long routes.',
    photo: 'openRoad',
    icon: 'bus',
    capacity: '30 to 36 berths',
    vehicles: [
      {
        id: 'sleeper-2-1',
        name: 'AC sleeper coach (2+1)',
        models: 'Full sleeper, 30 to 36 berths',
        seats: 36,
        capacityText: '30 to 36 berths',
        bags: 'Under-floor luggage hold',
        icon: 'bus',
        bestFor: 'Overnight pilgrimages and long-distance group tours.',
        features: ['AC', 'Blanket and pillow', 'Reading light', 'Charging point per berth'],
        perKm: 75,
        minKmPerDay: 400,
        driverBata: 1500,
        popular: true,
        vehicle: 'Sleeper bus',
        service: 'Tempo Traveller / bus hire',
      },
      {
        id: 'sleeper-seater',
        name: 'AC seater + sleeper coach',
        models: '15 berths and 21 pushback seats',
        seats: 36,
        capacityText: '15 berths + 21 seats',
        bags: 'Under-floor luggage hold',
        icon: 'bus',
        bestFor: 'Mixed groups where some sleep and some sit.',
        features: ['AC', 'Pushback seats', 'Blanket and pillow', 'Charging points'],
        perKm: 68,
        minKmPerDay: 400,
        driverBata: 1500,
        vehicle: 'Sleeper bus',
        service: 'Tempo Traveller / bus hire',
      },
    ],
  },
];

export const fleetVehicleCount = fleetCategories.reduce((n, c) => n + c.vehicles.length, 0);
