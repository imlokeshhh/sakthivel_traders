/* =============================================================
   SAKTHIVEL TRADERS — EDIT YOUR BUSINESS DETAILS HERE
   -------------------------------------------------------------
   Everything marked TODO is a placeholder. Change it here and
   both index.html and shop.html update automatically.
   ============================================================= */

window.SITE = {
  name: "Sakthivel Traders",
  tagline: "Ride in comfort. Ride in style.",
  description:
    "Premium bike seat covers and fuel tank covers, hand-finished for Indian roads. Retail for riders, bulk supply for shops, dealers and distributors.",
  established: 2012, // TODO

  // TODO: WhatsApp number — country code + number, digits only (91 = India)
  whatsapp: "919876543210",
  phone: "+91 98765 43210", // TODO
  email: "sales@sakthiveltraders.com", // TODO
  address: "No. 00, Main Road, Coimbatore, Tamil Nadu 641001", // TODO
  hours: "Mon – Sat · 9:30 AM – 8:00 PM",
  mapsUrl: "https://maps.google.com/?q=Sakthivel+Traders", // TODO

  // TODO: paste your real links. Leave "" to hide an icon.
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },

  minWholesale: 25,

  // Photos — replace with your own, e.g. "assets/images/hero.jpg"
  images: {
    hero: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=2000&q=80&auto=format&fit=crop",
    about: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=80&auto=format&fit=crop",
    wholesale: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=1600&q=80&auto=format&fit=crop",
    shop: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=2000&q=80&auto=format&fit=crop",
  },
};

/* =============================================================
   CATEGORIES
   ============================================================= */
window.CATEGORIES = [
  { id: "seat", name: "Bike Seat Covers", tint: "#6b1d1d", from: 349,
    blurb: "Anti-slip, weather-proof seat covers with diamond and racing stitch patterns." },
  { id: "tank", name: "Tank Covers", tint: "#ff5b1f", from: 299,
    blurb: "Scratch-guard fuel tank covers with magnetic or strap-fit mounting." },
  { id: "custom", name: "Custom Covers", tint: "#1e3a5f", from: 899,
    blurb: "Your name, logo or club colours — stitched to order for any bike model." },
  { id: "wholesale", name: "Wholesale Products", tint: "#4a4d52", from: 7499,
    blurb: "Mixed-model bulk packs at dealer pricing for shops and distributors." },
];

/* =============================================================
   PRODUCTS
   - price / mrp in rupees
   - image: "" shows the built-in illustration. To use a photo,
     put it in assets/images/products/ and write the path,
     e.g. image: "assets/images/products/diamond-quilt.jpg"
   - colors: first colour is used for the illustration
   ============================================================= */
window.PRODUCTS = [
  { id: "seat-diamond-quilt", name: "Diamond Quilt Seat Cover", category: "seat", price: 649, mrp: 899,
    material: "PU leather · 8mm foam", fits: "Pulsar, Apache, FZ, Unicorn", badge: "Bestseller", rating: 4.8, reviews: 312, image: "",
    colors: [["Jet Black", "#1f1f22"], ["Oxblood", "#6b1d1d"], ["Tan", "#9a6a3a"]] },
  { id: "seat-racing-stripe", name: "Racing Stripe Seat Cover", category: "seat", price: 549, mrp: 749,
    material: "Mesh-grip vinyl", fits: "Duke, R15, Gixxer, NS200", badge: "", rating: 4.6, reviews: 188, image: "",
    colors: [["Black / Orange", "#ff5b1f"], ["Black / Red", "#c81e1e"]] },
  { id: "seat-classic-cruiser", name: "Classic Cruiser Seat Cover", category: "seat", price: 899, mrp: 1199,
    material: "Rexine · double stitch", fits: "Royal Enfield Classic, Bullet, Meteor", badge: "New", rating: 4.9, reviews: 96, image: "",
    colors: [["Saddle Brown", "#7a4a24"], ["Jet Black", "#1f1f22"]] },
  { id: "seat-airflow-net", name: "AirFlow 3D Net Cover", category: "seat", price: 349, mrp: 499,
    material: "Breathable 3D mesh", fits: "Universal — scooters & commuters", badge: "", rating: 4.4, reviews: 421, image: "",
    colors: [["Graphite", "#3a3d42"], ["Navy", "#1e2a44"]] },

  { id: "tank-magnetic-guard", name: "Magnetic Tank Guard", category: "tank", price: 499, mrp: 699,
    material: "Leatherette · magnet base", fits: "Pulsar, Apache, Splendor, Shine", badge: "Bestseller", rating: 4.7, reviews: 254, image: "",
    colors: [["Jet Black", "#1f1f22"], ["Carbon Grey", "#4a4d52"]] },
  { id: "tank-carbon-weave", name: "Carbon Weave Tank Cover", category: "tank", price: 599, mrp: 799,
    material: "Carbon-texture PU", fits: "Duke, RC, R15, MT-15", badge: "", rating: 4.6, reviews: 143, image: "",
    colors: [["Carbon", "#2b2d31"], ["Carbon / Orange", "#ff5b1f"]] },
  { id: "tank-heritage-strap", name: "Heritage Strap Tank Cover", category: "tank", price: 749, mrp: 999,
    material: "Genuine-look leather · buckles", fits: "Royal Enfield, Jawa, Yezdi", badge: "New", rating: 4.8, reviews: 77, image: "",
    colors: [["Vintage Tan", "#a0703f"], ["Oxblood", "#6b1d1d"]] },
  { id: "tank-pad-grip", name: "Tank Pad + Knee Grips", category: "tank", price: 299, mrp: 449,
    material: "Rubber gel · 3M adhesive", fits: "Universal", badge: "", rating: 4.3, reviews: 509, image: "",
    colors: [["Black", "#1f1f22"]] },

  { id: "custom-name-seat", name: "Name-Stitched Seat Cover", category: "custom", price: 1099, mrp: 0,
    material: "PU leather · embroidered", fits: "Any model — share your bike", badge: "Made to order", rating: 4.9, reviews: 64, image: "",
    colors: [["Your choice", "#8b1e1e"], ["Jet Black", "#1f1f22"]] },
  { id: "custom-club-tank", name: "Club Logo Tank Cover", category: "custom", price: 1299, mrp: 0,
    material: "Leatherette · logo patch", fits: "Any model — share your bike", badge: "Made to order", rating: 4.8, reviews: 41, image: "",
    colors: [["Club colours", "#1e3a5f"]] },
  { id: "custom-combo", name: "Seat + Tank Matching Set", category: "custom", price: 1799, mrp: 2199,
    material: "Your choice of material", fits: "Any model — share your bike", badge: "", rating: 5.0, reviews: 29, image: "",
    colors: [["Tan / Black", "#9a6a3a"], ["Red / Black", "#b91c1c"]] },

  { id: "bulk-seat-25", name: "Seat Cover Dealer Pack", category: "wholesale", price: 9999, mrp: 13725, unit: "pack of 25",
    material: "Mixed models & colours", fits: "Top 10 commuter models", badge: "Bulk deal", rating: 4.7, reviews: 58, image: "",
    colors: [["Assorted", "#1f1f22"]] },
  { id: "bulk-tank-25", name: "Tank Cover Dealer Pack", category: "wholesale", price: 7499, mrp: 12475, unit: "pack of 25",
    material: "Magnetic + strap mix", fits: "Top 10 commuter models", badge: "Bulk deal", rating: 4.6, reviews: 33, image: "",
    colors: [["Assorted", "#3a3d42"]] },
  { id: "bulk-combo-100", name: "Distributor Combo Crate", category: "wholesale", price: 34999, mrp: 52000, unit: "crate of 100",
    material: "60 seat + 40 tank covers", fits: "Model mix on request", badge: "Bulk deal", rating: 4.9, reviews: 12, image: "",
    colors: [["Assorted", "#6b1d1d"]] },
];
