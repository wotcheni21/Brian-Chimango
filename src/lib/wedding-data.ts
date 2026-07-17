// Central config for all editable wedding content.
// Update dates, venues, schedule and contacts here — components read from this file only.

export const couple = {
  partnerOne: "Brian",
  partnerTwo: "Chimango",
  hashtag: "#Brian&Chimango2026",
};

export const familyStory = {
  courtMarriageDate: "16 February 2013",
  children: "3 boys",
  loveRoot:
    "13 years of love and 3 adorable boys has made our love stronger and more meaningful than ever before, and we will continue this journey together forever in holy matrimony. Join us to celebrate our marriage officiation in the presence of our Lord Jesus Christ, our family and friends.",
};

export const weddingDate = {
  // ISO 8601, used by the countdown — keep in sync with the display date below
  iso: "2026-08-26T13:00:00+02:00",
  display: "26 August 2026",
  dayOfWeek: "Wednesday",
};

export const ceremony = {
  venueName: "Church on the Rock",
  venueNote: "Behind Blantyre Girls",
  time: "13:00",
  mapUrl: "https://maps.google.com/?q=629F%2BQXF%2C+Blantyre",
};

export const reception = {
  venueName: "Amaryllis Hotel",
  venueNote: "Reception & celebration",
  time: "18:00",
  // Placeholder — replace with a real Google Maps link when available
  mapUrl: "https://maps.google.com/?q=Amaryllis+Hotel+Blantyre",
};

export type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
  details?: string[];
};

export const schedule: ScheduleItem[] = [
  { time: "12:30", title: "Guests Arrive", description: "Guests arrive and take their seats" },
  { time: "13:00", title: "Bridal Party Arrival", description: "Arrival of the bridal party and processional" },
  { time: "13:05", title: "Opening Prayer" },
  { time: "13:10", title: "Welcome Address" },
  { time: "13:15", title: "Praise & Worship / Hymn" },
  { time: "13:20", title: "Scripture Reading" },
  {
    time: "13:30 - 14:15",
    title: "Wedding Officiation",
    description: "The formal marriage ceremony",
    details: [
      "Exchange of marriage vows",
      "Exchange of rings",
      "Pronouncement of marriage",
      "Signing of the marriage register",
      "Final blessing",
    ],
  },
  { time: "14:15", title: "Presentation of the Newlyweds" },
  { time: "14:20", title: "Recessional & Congratulations" },
  { time: "14:30", title: "Luncheon" },
  { time: "15:30", title: "Photography Session", description: "Portraits with the newlyweds" },
  { time: "17:00", title: "Travel & Freshen Up", description: "Preparation for the reception" },
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
  { name: "Charles Reengo Whayo", phone: "+265 999 95 84 35" },
];

export type OutfitInspoItem = {
  label: string;
  note?: string;
  // Leave empty until real inspiration photos are supplied — the card
  // renders an elegant placeholder automatically when image is undefined
  image?: string;
};

export type OutfitPalette = {
  audience: string;
  title: string;
  description: string;
  image: string;
  swatches: { label: string; color: string }[];
};

export const outfitPalettes: OutfitPalette[] = [
  {
    audience: "For men",
    title: "Grey colour palette",
    description: "Clean grey tailoring, from deep charcoal to soft silver.",
    image: "/images/new pictures/Colour Palette 1.jpeg",
    swatches: [
      { label: "Charcoal", color: "#535557" },
      { label: "Graphite", color: "#6f706e" },
      { label: "Silver", color: "#a2a5ab" },
      { label: "Mist", color: "#c9c9c7" },
    ],
  },
  {
    audience: "For ladies",
    title: "Sage green with gold accessories",
    description: "Soft sage and evergreen outfits finished with warm gold accents.",
    image: "/images/new pictures/Colour Palette 2.jpeg",
    swatches: [
      { label: "Sage Hint", color: "#bfcfbb" },
      { label: "Sage", color: "#8ea58c" },
      { label: "Moss", color: "#738a6e" },
      { label: "Evergreen", color: "#344c3d" },
      { label: "Gold", color: "#b79b6b" },
    ],
  },
];

// Replace/extend this list once male outfit inspo images are supplied.
// Each item becomes one card in the Outfit Inspiration grid.
export const outfitInspo: OutfitInspoItem[] = [
  {
    label: "Gentlemen: Suit",
    note: "Charcoal or mid-grey tailoring",
    image: "/images/outfit/gentlemen-suit.png",
  },
  {
    label: "Gentlemen: Shirt",
    note: "Crisp white with clean grey tailoring",
    image: "/images/outfit/gentlemen-shirt.png",
  },
  {
    label: "Gentlemen: Tie & Accents",
    note: "Grey, silver or charcoal finishing details",
    image: "/images/outfit/gentlemen-accents.png",
  },
  {
    label: "Gentlemen: Shoes",
    note: "Polished black leather",
    image: "/images/outfit/gentlemen-shoes.png",
  },
  {
    label: "Ladies: Scarf Gown",
    note: "Soft sage chiffon with warm gold accessories",
    image: "/images/outfit/ladies-scarf-gown.jpg",
  },
  {
    label: "Ladies: Draped Gown",
    note: "Soft sage with an elegant flowing silhouette",
    image: "/images/outfit/ladies-draped-gown.jpg",
  },
  {
    label: "Ladies: Accessories",
    note: "Gold finishing touches",
    image: "/images/outfit/ladies-accessories.png",
  },
  {
    label: "Ladies: Shoes",
    note: "Warm gold or nude formal heels",
    image: "/images/outfit/ladies-shoes.png",
  },
];

export const gallery = {
  familyHighlights: [
    {
      src: "/images/family/family-formal-day.jpeg",
      alt: "Brian and Chimango dressed formally with two of their sons",
      caption: "The family at the heart of it all",
    },
    {
      src: "/images/family/family-graduation.jpeg",
      alt: "Brian and Chimango celebrating a graduation with their three sons",
      caption: "A milestone shared together",
    },
  ],
  images: [
    {
      src: "/images/couple-doorway-full.jpg",
      alt: "Brian and Chimango dressed in black, arriving at a doorway together",
      caption: "Together, then and now",
    },
    {
      src: "/images/couple-reception-portrait.jpg",
      alt: "Brian and Chimango seated at a candlelit reception table",
      caption: "A partnership built over time",
    },
    {
      src: "/images/couple-beach-bw.jpg",
      alt: "Black and white portrait of Brian and Chimango by the sea",
      caption: "Quiet moments",
      monochrome: true,
    },
    {
      src: "/images/couple-doorway-close.jpg",
      alt: "Close portrait of Brian and Chimango at the doorway",
      caption: "Favourite memories",
    },
    {
      src: "/images/new pictures/WhatsApp Image 2026-07-15 at 14.09.24.jpeg",
      alt: "A black and white family memory from Brian and Chimango",
      caption: "Family first",
      monochrome: true,
    },
    {
      src: "/images/new pictures/WhatsApp Image 2026-07-15 at 14.09.25.jpeg",
      alt: "A black and white family portrait from Brian and Chimango",
      caption: "The life they built",
      monochrome: true,
    },
    {
      src: "/images/new pictures/WhatsApp Image 2026-07-15 at 14.09.26.jpeg",
      alt: "A black and white memory from Brian and Chimango's journey",
      caption: "Years of grace",
      monochrome: true,
    },
    {
      src: "/images/new pictures/WhatsApp Image 2026-07-15 at 14.09.27.jpeg",
      alt: "A black and white family celebration memory",
      caption: "Home and heart",
      monochrome: true,
    },
  ],
};
