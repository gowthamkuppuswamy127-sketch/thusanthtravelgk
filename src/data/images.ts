// Every photo on the site is listed here, so swapping stock images for the
// agency's own photos is a one-file change.
//
// `src` is either an Unsplash photo id ("photo-...", served from Unsplash's
// image CDN under the Unsplash License) or a path to a file you add under
// /public, for example "/images/innova-crysta.jpg".

export interface Photo {
  src: string;
  alt: string;
}

export const photos = {
  mistyHills: { src: 'photo-1470071459604-3b5ec3a7fe05', alt: 'Morning mist drifting through a forested hillside' },
  hillStay: { src: 'photo-1571896349842-33c89424de2d', alt: 'A quiet stay surrounded by greenery' },
  valley: { src: 'photo-1506905925346-21bda4d32df4', alt: 'Mountain ridges above a valley at golden hour' },
  beach: { src: 'photo-1507525428036-b1d6ec7e1a8b', alt: 'Calm sea washing onto a sandy beach' },
  tajMahal: { src: 'photo-1524492412937-b28074a5d7da', alt: 'The Taj Mahal in Agra' },
  dubai: { src: 'photo-1512453979798-5ea266f8880c', alt: 'The Dubai skyline' },
  bali: { src: 'photo-1537996194471-e657df975ab4', alt: 'A temple in Bali, Indonesia' },
  maldives: { src: 'photo-1514282401047-d79a71a590e8', alt: 'Aerial view of an island resort in the Maldives' },
  thailand: { src: 'photo-1552465011-b4e21bf6e79a', alt: 'Longtail boats moored off a beach in Thailand' },
  flight: { src: 'photo-1436491865332-7a61a109cc05', alt: 'A passenger jet in flight' },
  airportCab: { src: '/images/airport-cab.webp', alt: 'A white Tushanth Tours and Travels cab waiting outside Terminal 3 at the airport' },
  openRoad: { src: 'photo-1449965408869-eaa3f722e40d', alt: 'Driving on an open highway' },
  roadTrip: { src: 'photo-1469854523086-cc02fe5d8800', alt: 'A van on a road trip through open country' },
  coach: { src: 'photo-1544620347-c4fd4a3d5957', alt: 'A coach bus on the road' },
  resort: { src: 'photo-1566073771259-6a8506099945', alt: 'A resort hotel with a swimming pool' },
  conference: { src: 'photo-1540575467063-178a50c2df87', alt: 'Audience seated at a conference' },
  campus: { src: 'photo-1523050854058-8df90110c9f1', alt: 'Students on a college campus' },
  industry: { src: 'photo-1581091226825-a6a2a5aee158', alt: 'An engineer at work with industrial equipment' },
  family: { src: 'photo-1511895426328-dc8714191300', alt: 'A family spending time together' },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photoUrl(src: string, width: number, height?: number, quality = 70) {
  if (!src.startsWith('photo-')) return src;
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(width), q: String(quality) });
  if (height) params.set('h', String(height));
  return `https://images.unsplash.com/${src}?${params}`;
}
