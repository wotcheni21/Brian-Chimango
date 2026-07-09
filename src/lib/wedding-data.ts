// Central config for all editable wedding content.
// Update dates, venues, schedule and contacts here — components read from this file only.

export const couple = {
  partnerOne: "Brian",
  partnerTwo: "Chimango",
  hashtag: "#Brian&Chimango2026",
};

export const weddingDate = {
  // ISO 8601, used by the countdown — keep in sync with the display date below
  iso: "2026-08-26T13:00:00+02:00",
  display: "26 August 2026",
  dayOfWeek: "Wednesday",
};

export const ceremony = {
  venueName: "Church on the Rock",
  venueNote: "Next to Blantyre Girls",
  time: "13:00",
  // Placeholder — replace with a real Google Maps link when available
  mapUrl: "https://maps.google.com/?q=Church+on+the+Rock+Blantyre",
};

export const reception = {
  venueName: "Amaryllis Hotel",
  venueNote: "Reception & celebration",
  // Placeholder — replace with a real Google Maps link when available
  mapUrl: "https://maps.google.com/?q=Amaryllis+Hotel+Blantyre",
};

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
};

// Placeholder order of events — confirm with the couple before publishing
export const schedule: ScheduleItem[] = [
  { time: "12:00", title: "Guest Arrival", description: "Doors open at the church" },
  { time: "13:00", title: "Church Ceremony", description: "Exchange of vows" },
  { time: "15:00", title: "Couple Photo Session", description: "Portraits with the newlyweds" },
  { time: "17:00", title: "Reception Guest Arrival", description: "Welcome drinks at Amaryllis Hotel" },
  { time: "18:00", title: "Dinner & Celebration", description: "Speeches and dinner service" },
  { time: "20:00", title: "Toasts & Cake Cutting", description: "Raise a glass to the newlyweds" },
  { time: "21:00", title: "Closing & After Celebration", description: "Dancing into the evening" },
];

export type RsvpContact = {
  name: string;
  phone: string;
};

export const rsvpContacts: RsvpContact[] = [
  { name: "Deborah Nakhumwa", phone: "+265990343566" },
  { name: "Florence Nakhumwa", phone: "+265999275877" },
];

export type OutfitInspoItem = {
  label: string;
  note?: string;
  // Leave empty until real inspiration photos are supplied — the card
  // renders an elegant placeholder automatically when image is undefined
  image?: string;
};

// Replace/extend this list once male outfit inspo images are supplied.
// Each item becomes one card in the Outfit Inspiration grid.
export const outfitInspo: OutfitInspoItem[] = [
  { label: "Suit", note: "Charcoal or evergreen tailoring" },
  { label: "Shirt", note: "Crisp white or ivory" },
  { label: "Tie & Accents", note: "Sage or moss tones" },
  { label: "Shoes", note: "Polished black leather" },
];

export const gallery = {
  images: [
    {
      src: "/images/couple-doorway-full.jpg",
      alt: "Brian and Chimango dressed in black, arriving at a doorway together",
    },
    {
      src: "/images/couple-reception-portrait.jpg",
      alt: "Brian and Chimango seated at a candlelit reception table",
    },
    {
      src: "/images/couple-beach-bw.jpg",
      alt: "Black and white portrait of Brian and Chimango by the sea",
    },
    {
      src: "/images/couple-doorway-close.jpg",
      alt: "Close portrait of Brian and Chimango at the doorway",
    },
  ],
};
