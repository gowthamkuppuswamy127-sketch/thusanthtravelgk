// SAMPLE CONTENT: these reviews are placeholders written for the design.
// Replace them with real customer reviews (for example from the Google
// Business Profile, with the reviewer's permission) before going live.

export interface Testimonial {
  quote: string;
  name: string;
  trip: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We took an Innova Crysta to Coorg with two kids and my parents. The car was spotless and the driver never rushed us, even with all our stops.',
    name: 'Priya R.',
    trip: 'Family trip to Coorg',
    rating: 5,
  },
  {
    quote:
      'My flight was at 5:40 a.m. The driver was at the gate by 3:15 and got me to the airport with time to spare. That is all I want from an airport cab.',
    name: 'Karthik S.',
    trip: 'Airport drop, Kempegowda Airport',
    rating: 5,
  },
  {
    quote:
      'They handled a 17-seater Tempo Traveller and the resort for our team offsite in Chikmagalur. Pickups, meals and the return all ran on time.',
    name: 'Anand M.',
    trip: 'Corporate offsite, Chikmagalur',
    rating: 5,
  },
  {
    quote:
      'Flights, villa, transfers and day tours for our Bali honeymoon were planned in one go. Whenever we had a question, someone answered on WhatsApp.',
    name: 'Divya & Rahul',
    trip: 'Honeymoon in Bali',
    rating: 5,
  },
  {
    quote:
      'We booked two buses for a college industrial visit to Mysuru. The drivers were patient with 80 students and the timing was exactly as planned.',
    name: 'Prof. Suresh K.',
    trip: 'Industrial visit, Mysuru',
    rating: 5,
  },
];
