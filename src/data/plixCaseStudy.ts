export interface PlixAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PlixTestimonial {
  quote: string;
  author: string;
  role: string;
}

export const PLIX_CASE_STUDY = {
  heroImage: {
    src: "/images/case-studies/plix/hero/thumbnail.webp",
    alt: "Plix — Brand communication, campaigns and creatives hero showcase",
    width: 2748,
    height: 1671,
  } satisfies PlixAsset,

  overview: {
    brand: "PlixLife",
    discipline: "Brand & Visual Design",
    readTime: "4 min read",
    title: "From brief to brand expression.",
    description:
      "A collection of creative work, behind Plix's marketing communication, from campaign assets to day-to-day visual content.",
    deliverables: [
      "Campaign Assets",
      "Visual Assets",
      "Feature enhancements",
      "UI/UX - Refinements",
    ],
    role: "Visual Design Intern",
    timeline: "3 Months (Concept, Brand Guidelines, Creatives)",
    year: "2026",
    teamCollaboration: "Cross Collaborated with\nBrand Team & Packaging Team",
  },

  concept: {
    eyebrow: "CONCEPT",
    title: "The Plix ecosystem",
    body: "Plix began with a simple idea: making plant-based wellness more accessible to everyday consumers. What started with nutrition grew into an Indian D2C brand spanning skincare, haircare, etc. In 2023, it became part of Marico's growing brand portfolio.",
    images: [
      {
        src: "/images/case-studies/plix/concept/concept-1.webp",
        alt: "Plix Instagram feed displaying plant-based skincare and haircare content grid",
        width: 1349,
        height: 1531,
      },
      {
        src: "/images/case-studies/plix/concept/concept-2.webp",
        alt: "Watermelon Hydra-Cool and Guava Lite-Bright Fluid Sunscreen playful visual campaign",
        width: 1349,
        height: 1531,
      },
    ] satisfies PlixAsset[],
  },

  productSpotlight: {
    eyebrow: "PRODUCT SPOTLIGHT",
    title: "From product benefits to visual language.",
    pair: [
      {
        src: "/images/case-studies/plix/product-spotlight/spotlight-1.webp",
        alt: "Magnesium Duo creative addressing work stress ruining sleep",
        width: 1349,
        height: 1386,
      },
      {
        src: "/images/case-studies/plix/product-spotlight/spotlight-2.webp",
        alt: "Why this duo infographic breaking down Triple Magnesium Complex and Chamomile Extract",
        width: 1349,
        height: 1386,
      },
    ] satisfies PlixAsset[],
    wide: {
      src: "/images/case-studies/plix/product-spotlight/spotlight-3.webp",
      alt: "Deep Sleep Mini Mints by Plix promotional search ad banner",
      width: 2757,
      height: 1227,
    } satisfies PlixAsset,
  },

  productNarrative: {
    eyebrow: "PRODUCT NARRATIVE",
    title: "Products, with a little more personality.",
    wide: {
      src: "/images/case-studies/plix/product-narrative/narrative-1.webp",
      alt: "Water-Light Sun Protection lightweight fluid sunscreen wide campaign banner",
      width: 2757,
      height: 948,
    } satisfies PlixAsset,
    pair: [
      {
        src: "/images/case-studies/plix/product-narrative/narrative-2.webp",
        alt: "Don't Let Marks Settle In jamun topical skincare campaign creative",
        width: 1347,
        height: 1356,
      },
      {
        src: "/images/case-studies/plix/product-narrative/narrative-3.webp",
        alt: "Plix Pomegranate Youth Renewal Night Cream jar product creative",
        width: 1350,
        height: 1356,
      },
    ] satisfies PlixAsset[],
  },

  b1g1: {
    eyebrow: "PROMOTIONAL CAMPAIGNS / B1G1",
    title: "Making a good deal look better.",
    callout:
      "A summer-led promotional campaign bringing together product-focused compositions and consistent campaign messaging across digital placements",
    wide: {
      src: "/images/case-studies/plix/b1g1/b1g1-1.webp",
      alt: "Buy 1 Get 1 Free Hot Summer Sale Avocado Ceramide cleanser campaign banner",
      width: 2757,
      height: 1437,
    } satisfies PlixAsset,
    pair: [
      {
        src: "/images/case-studies/plix/b1g1/b1g1-2.webp",
        alt: "Steal the Deal Barrier Loving Avocado Ceramide cleanser campaign square",
        width: 1349,
        height: 1386,
      },
      {
        src: "/images/case-studies/plix/b1g1/b1g1-3.webp",
        alt: "B1G1 26' olive-toned glassmorphic campaign accent tile",
        width: 1349,
        height: 1386,
      },
    ] satisfies PlixAsset[],
  },

  reflection: {
    eyebrow: "LEARNINGS & REFLECTION",
    title: "Pausing to Reflect",
    paragraphs: [
      "Real world marketing and product placement can be very different it isn't just Pinterest-fancy it has some meaning , interpretation for every audience",
      "Working at a larger scale meant adapting to a faster pace, multiple priorities and constant iterations. I learnt that even when things move quickly, breaking the process down and taking one step at a time makes it easier to find your footing.",
    ],
  },

  testimonials: {
    eyebrow: "KIND WORDS / PLIX",
    title: "The people I got to create with.",
    teamImage: {
      src: "/images/case-studies/plix/team/team.webp",
      alt: "Plix design and brand team gathering together",
      width: 867,
      height: 1086,
    } satisfies PlixAsset,
    teamBadge: "Little Team Moment",
    quotes: [
      {
        quote:
          "Shravani has been a great addition to the team. She consistently delivers quality work with good speed & is highly proficient in Figma. She is proactive, receptive to feedback. Overall, she has shown strong design skills & the ability to handle responsibilities reliably.",
        author: "Vishakha Doke",
        role: "Lead Visual Designer, Plix",
      },
      {
        quote:
          "Shravani is curious, genuinely open to learning. It was great to see her confidence and skills grow during these three months, She is exceptionally good with Figma and has a strong eye for clean, thoughtful, and visually appealing work.",
        author: "Aarti Salunkhe",
        role: "Senior Visual Designer, Plix",
      },
    ] satisfies PlixTestimonial[],
  },

  signoff: {
    copyright: "©SHRAVANI SUTAR",
    discipline: "MULTIDISCIPLINARY ARTIST",
    note: "STILL MAKING THINGS, STILL LOOKING FOR THINGS TO MAKE. IF SOMETHING HERE CAUGHT YOUR ATTENTION, SAY HELLO.",
    email: "SHRAVANISUTAR.99@GMAIL.COM",
    emailHref: "mailto:shravanisutar.99@gmail.com",
  },

  nextWork: {
    leftLabel: "( Kora | Branding )",
    rightLabel: "( 02 )",
    ctaLabel: "Next Work",
    image: {
      src: "/images/case-studies/plix/footer/next-work.webp",
      alt: "Next Work — Kora Branding showcase",
      width: 2750,
      height: 766,
    } satisfies PlixAsset,
  },
};

