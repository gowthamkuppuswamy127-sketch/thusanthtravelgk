// Frequently asked questions shown on the home page. Check the answers
// against how the business actually works before going live.

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What is included in a cab fare?',
    a: 'Your quote covers the vehicle, the driver and fuel. Tolls, parking, interstate permits and driver bata (the daily allowance for outstation trips) are listed separately, so you see the full cost before you confirm.',
  },
  {
    q: 'Do you do early-morning and late-night airport runs?',
    a: 'Yes. We run pickups and drops to Kempegowda International Airport for early and late flights. Share your flight number and timing when you book so we can plan the pickup.',
  },
  {
    q: 'Can I book a one-way outstation drop?',
    a: 'Yes. Tell us the pickup and drop points and we will quote a one-way fare. Round trips with the same car and driver are also available.',
  },
  {
    q: 'Which vehicles can I choose from?',
    a: 'Sedans for up to 4 passengers, Maruti Ertiga for up to 6, Toyota Innova Crysta for up to 7, Tempo Travellers for 12 to 17, buses for 21 to 49, and AC sleeper buses for overnight trips. The Our Fleet page lists every vehicle with its rates.',
  },
  {
    q: 'Can you change a tour package or plan one from scratch?',
    a: 'Every package can be changed: dates, hotels, sightseeing and vehicle. We also plan family trips, honeymoons, corporate MICE events, school and college tours, and industrial visits to your brief.',
  },
  {
    q: 'Do you book hotels without a cab?',
    a: 'Yes. We can book hotels and resorts on their own, or together with transport and sightseeing as one trip.',
  },
  {
    q: 'How do I confirm a booking?',
    a: 'Send an enquiry, call or WhatsApp us. Once you are happy with the quote, we confirm the booking and share the vehicle and driver details before your trip.',
  },
];
