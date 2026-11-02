/* =========================================================
   Kele's Beauty Therapy - services and prices
   This is the ONLY place prices are stored. The services page,
   price list and enquiry form estimate all read from this array.
   price      = price in Rand (number)
   priceFrom  = true if the price is a starting price ("from R500")
   duration   = typical time in minutes for one person
   ========================================================= */

const SERVICES = [
    {
        id: "hair-washing",
        name: "Hair Washing & Conditioning",
        category: "hair",
        price: 300,
        priceFrom: false,
        duration: 45,
        description: "A relaxing wash and deep-conditioning treatment that leaves your hair clean, soft and ready to style.",
        tags: ["wash", "shampoo", "treatment", "conditioner"],
        image: "images/gallery/thumbs/hair-washing-at-salon-basin-thumb.webp",
        alt: "Stylist washing a client's hair at a salon basin"
    },
    {
        id: "hair-cutting",
        name: "Hair Cutting & Styling",
        category: "hair",
        price: 350,
        priceFrom: false,
        duration: 45,
        description: "Trend cuts and classic styles for men, women and kids, finished to suit your face and lifestyle.",
        tags: ["cut", "haircut", "trim", "fade", "men", "kids"],
        image: "images/gallery/thumbs/modern-hair-salon-interior-thumb.webp",
        alt: "Modern hair salon with styling chairs and mirrors"
    },
    {
        id: "hair-plaiting",
        name: "Hair Plaiting (Box Braids)",
        category: "hair",
        price: 500,
        priceFrom: true,
        duration: 240,
        description: "Neat, long-lasting box braids and knotless plaits. The final price depends on length and style.",
        tags: ["braids", "box braids", "knotless", "plaits", "extensions"],
        image: "images/gallery/thumbs/red-box-braids-being-plaited-thumb.webp",
        alt: "Stylist plaiting long red box braids"
    },
    {
        id: "cornrows",
        name: "Cornrows",
        category: "hair",
        price: 250,
        priceFrom: true,
        duration: 120,
        description: "Straight-back, zigzag or patterned cornrows for women and men, with or without extensions.",
        tags: ["cornrows", "braids", "straight back", "patterns", "men"],
        image: "images/gallery/thumbs/zigzag-cornrow-hairstyle-plaiting-thumb.webp",
        alt: "Stylist plaiting zigzag cornrows"
    },
    {
        id: "kids-plaits",
        name: "Kids' Plaits & Cornrows",
        category: "hair",
        price: 200,
        priceFrom: true,
        duration: 90,
        description: "Gentle, neat plaits and cornrows for children, ready for school or a special day.",
        tags: ["kids", "children", "school", "plaits", "cornrows"],
        image: "images/gallery/thumbs/stylist-braiding-natural-hair-thumb.webp",
        alt: "Hair stylist braiding a client's natural hair"
    },
    {
        id: "soft-glam",
        name: "Soft Glam & Event Makeup",
        category: "makeup",
        price: 450,
        priceFrom: false,
        duration: 60,
        description: "A flawless, natural-looking glam for parties, matric dances, graduations and nights out.",
        tags: ["glam", "event", "party", "matric dance", "graduation"],
        image: "images/gallery/thumbs/makeup-artist-applying-makeup-thumb.webp",
        alt: "Makeup artist applying makeup to a client"
    },
    {
        id: "bridal-makeup",
        name: "Bridal Makeup (with Trial)",
        category: "makeup",
        price: 1200,
        priceFrom: false,
        duration: 120,
        description: "Long-wearing bridal makeup that photographs beautifully, including a trial appointment before the big day.",
        tags: ["bride", "wedding", "bridal", "trial"],
        image: "images/gallery/thumbs/bridal-makeup-gold-eyeshadow-thumb.webp",
        alt: "Makeup artist applying gold eyeshadow to a bride"
    },
    {
        id: "photoshoot-makeup",
        name: "Photo-shoot & Headshot Makeup",
        category: "makeup",
        price: 500,
        priceFrom: false,
        duration: 60,
        description: "Camera-ready makeup for photo shoots, influencers and professional headshots.",
        tags: ["photo shoot", "headshot", "influencer", "camera"],
        image: "images/gallery/thumbs/bridal-makeup-gold-eyeshadow-thumb.webp",
        alt: "Close-up of eye makeup being applied"
    },
    {
        id: "manicure",
        name: "Classic Manicure",
        category: "nails",
        price: 180,
        priceFrom: false,
        duration: 45,
        description: "Nail shaping, cuticle care, a hand massage and your choice of polish.",
        tags: ["manicure", "hands", "polish", "mani"],
        image: "images/gallery/thumbs/purple-glitter-nail-manicure-thumb.webp",
        alt: "Manicured nails painted dark purple"
    },
    {
        id: "pedicure",
        name: "Classic Pedicure",
        category: "nails",
        price: 220,
        priceFrom: false,
        duration: 60,
        description: "A soak, scrub, nail and cuticle care and polish to leave your feet soft and refreshed.",
        tags: ["pedicure", "feet", "polish", "pedi"],
        image: "images/gallery/thumbs/pedicure-treatment-in-salon-thumb.webp",
        alt: "Nail technician giving a client a pedicure"
    },
    {
        id: "gel-overlay",
        name: "Gel Overlay & French Tips",
        category: "nails",
        price: 250,
        priceFrom: true,
        duration: 60,
        description: "Strong, glossy gel overlays, French tips and simple nail art that last for weeks.",
        tags: ["gel", "overlay", "french tips", "nail art", "acrylic"],
        image: "images/gallery/thumbs/french-tip-nail-manicure-thumb.webp",
        alt: "Hand with a French tip manicure"
    },
    {
        id: "massage",
        name: "Relaxing Massage",
        category: "massage",
        price: 120,
        priceFrom: false,
        duration: 30,
        description: "Unwind with a soothing massage that relieves tension and leaves you refreshed.",
        tags: ["massage", "relax", "back", "neck", "shoulders", "stress"],
        image: "images/gallery/thumbs/facial-massage-treatment-thumb.webp",
        alt: "Therapist giving a client a relaxing massage"
    },
    {
        id: "facial-massage",
        name: "Facial Massage",
        category: "massage",
        price: 150,
        priceFrom: false,
        duration: 30,
        description: "A calming face and scalp massage that boosts circulation and leaves your skin glowing.",
        tags: ["facial", "face", "skin", "scalp", "relax"],
        image: "images/gallery/thumbs/facial-massage-treatment-thumb.webp",
        alt: "Client relaxing during a facial massage"
    }
];

const SERVICE_CATEGORIES = {
    hair: "Hair",
    makeup: "Makeup",
    nails: "Nails",
    massage: "Massage"
};

function formatPrice(service) {
    return `${service.priceFrom ? "From " : ""}R${service.price.toLocaleString("en-ZA")}`;
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (!hours) return `${mins} min`;
    return mins ? `${hours} h ${mins} min` : `${hours} h`;
}
