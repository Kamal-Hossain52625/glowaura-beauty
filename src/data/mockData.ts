import { Product, Category, Brand, Coupon, Order, Review, StoreSettings, User, AdminAccount } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Ayat & Amat",
  hotline: "+880 1711-234567",
  supportEmail: "support@ayatamat.com",
  announcement: "✨ Welcome to Ayat & Amat | Premium Men's, Women's & Baby Collections | Free Express Delivery across Bangladesh on orders over ৳2,500",
  deliveryInsideDhaka: 70,
  deliveryOutsideDhaka: 130,
  deliverySubDhaka: 100,
  freeDeliveryThreshold: 2500,
  bkashMerchantNumber: "01711234567 (Merchant)",
  nagadMerchantNumber: "01811234567 (Merchant)",
};

export const CATEGORIES: Category[] = [
  {
    id: "cat-men",
    name: "Men's Collection",
    slug: "mens-collection",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
    itemCount: 12,
    subcategories: ["Shirt", "T-Shirt", "Pant", "Clock"]
  },
  {
    id: "cat-women",
    name: "Women's Collection",
    slug: "womens-collection",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    itemCount: 9,
    subcategories: ["Three Piece", "Kurti & Tops", "Saree", "Clock & Jewelry"]
  },
  {
    id: "cat-baby",
    name: "Baby Collection",
    slug: "baby-collection",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
    subcategories: ["Baby Boys Clothing", "Baby Girls Clothing", "Rompers & Sets", "Baby Clock & Toys"]
  }
];

export const BRANDS: Brand[] = [
  {
    id: "brand-1",
    name: "Ayat & Amat Signature",
    slug: "ayat-amat-signature",
    logo: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=200&q=80",
    country: "Bangladesh",
    itemCount: 16
  },
  {
    id: "brand-2",
    name: "Zara & Urban",
    slug: "zara-urban",
    logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80",
    country: "Spain",
    itemCount: 6
  },
  {
    id: "brand-3",
    name: "Casio & Curren Timepieces",
    slug: "casio-curren",
    logo: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=200&q=80",
    country: "Japan",
    itemCount: 4
  },
  {
    id: "brand-4",
    name: "Apex & Heritage",
    slug: "apex-heritage",
    logo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=200&q=80",
    country: "Bangladesh",
    itemCount: 4
  }
];

export const PRODUCTS: Product[] = [
  // ===================== MEN'S COLLECTION: SHIRT =====================
  {
    id: "prod-m-shirt-1",
    name: "Premium Oxford Cotton Formal Shirt - Sky Blue",
    slug: "premium-oxford-cotton-formal-shirt-sky-blue",
    sku: "A&A-MSH-001",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Shirt",
    regularPrice: 1850,
    discountPrice: 1450,
    stockQuantity: 42,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 124,
    volumeOrSize: "M, L, XL, XXL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Tailored 100% combed cotton Oxford weave formal shirt designed for executive comfort and breathability.",
    description: "The Ayat & Amat Signature Oxford Shirt is crafted from pure 100% long-staple combed cotton, offering a crisp, breathable silhouette for office, corporate meetings, and upscale evening gatherings. Wrinkle-resistant finish with reinforced mother-of-pearl buttons.",
    ingredients: "100% Combed Compact Cotton (Oxford Weave), Pre-shrunk, Anti-pilling.",
    usageInstructions: "Machine wash cold with similar colors. Warm iron when damp. Do not bleach.",
    specifications: {
      "Fabric": "100% Combed Cotton Oxford",
      "Fit": "Tailored Slim Fit",
      "Collar": "Semi-Spread Collar with Stays",
      "Sleeve": "Full Sleeve with Adjustable Cuff",
      "Wash Care": "Machine Wash Cold"
    },
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-shirt-2",
    name: "Executive Royal Twill Formal Shirt - Crisp White",
    slug: "executive-royal-twill-formal-shirt-white",
    sku: "A&A-MSH-002",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Shirt",
    regularPrice: 2200,
    discountPrice: 1690,
    stockQuantity: 35,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 89,
    volumeOrSize: "M, L, XL, XXL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Ultra-crisp Egyptian twill weave white shirt with french placket and non-iron finish.",
    description: "An indispensable classic in every gentleman's wardrobe. Engineered with fine 100s double twill cotton that maintains an impeccable crease all day long.",
    ingredients: "100% Egyptian Giza Cotton, Twill Weave.",
    usageInstructions: "Normal wash or dry clean. Hang dry for best finish.",
    specifications: {
      "Fabric": "100s Two-Ply Twill Cotton",
      "Fit": "Modern Regular Fit",
      "Collar": "English Cutaway",
      "Occasion": "Formal, Wedding & Business"
    },
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15c429fbb41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-shirt-3",
    name: "Casual Vintage Stonewash Denim Shirt - Deep Indigo",
    slug: "casual-vintage-stonewash-denim-shirt-indigo",
    sku: "A&A-MSH-003",
    brand: "Zara & Urban",
    category: "Men's Collection",
    subcategory: "Shirt",
    regularPrice: 2450,
    discountPrice: 1850,
    stockQuantity: 28,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 64,
    volumeOrSize: "M, L, XL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Washed 6.5 oz cotton denim shirt with snap buttons and western chest pockets.",
    description: "Rugged yet refined, this denim shirt is enzyme stone-washed for immediate softness and authentic vintage fade. Wear standalone or layer over a white tee.",
    ingredients: "100% Breathable Denim Cotton.",
    usageInstructions: "Wash inside out in cold water to preserve natural indigo patina.",
    specifications: {
      "Fabric": "6.5 oz Ring-Spun Cotton Denim",
      "Fit": "Relaxed Casual Fit",
      "Buttons": "Pearl Snap Buttons",
      "Pockets": "Dual Western Flap Pockets"
    },
    images: [
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== MEN'S COLLECTION: T-SHIRT =====================
  {
    id: "prod-m-tshirt-1",
    name: "Classic Solid Pique Cotton Polo T-Shirt - Pitch Black",
    slug: "classic-solid-pique-cotton-polo-tshirt-black",
    sku: "A&A-MTS-001",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "T-Shirt",
    regularPrice: 1250,
    discountPrice: 950,
    stockQuantity: 58,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 195,
    volumeOrSize: "S, M, L, XL, XXL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Heavyweight 240 GSM organic pique cotton polo with rib collar and ribbed cuffs.",
    description: "Our signature polo combines sporty heritage with elevated smart-casual style. Breathable honeycomb pique weave keeps you cool under Bangladesh tropical climate.",
    ingredients: "95% Combed Cotton, 5% Spandex for shape retention.",
    usageInstructions: "Machine wash cold. Do not tumble dry to preserve rib collar shape.",
    specifications: {
      "Fabric Weight": "240 GSM Pique Knit",
      "Collar": "Reinforced Ribbed Collar",
      "Placket": "2-Button Placket with Engraved Buttons",
      "Fit": "Athletic Regular Fit"
    },
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-tshirt-2",
    name: "Heavyweight 220 GSM Streetwear Graphic T-Shirt - Sage",
    slug: "heavyweight-220gsm-graphic-tshirt-sage",
    sku: "A&A-MTS-002",
    brand: "Zara & Urban",
    category: "Men's Collection",
    subcategory: "T-Shirt",
    regularPrice: 1100,
    discountPrice: 850,
    stockQuantity: 44,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 72,
    volumeOrSize: "M, L, XL, XXL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Boxy drop-shoulder oversized t-shirt with high-density screen print design.",
    description: "Tailored for contemporary casual streetwear. Made from 100% bio-washed combed cotton that feels luxurious, thick, and never transparent.",
    ingredients: "100% Bio-Washed Combed Cotton (220 GSM).",
    usageInstructions: "Do not iron directly on printed graphics. Machine wash gentle.",
    specifications: {
      "Weight": "220 GSM Heavyweight Jersey",
      "Fit": "Oversized Drop-Shoulder",
      "Neckline": "1.25 Inch Ribbed Crewneck"
    },
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-tshirt-3",
    name: "Supima Cotton Essential Crewneck T-Shirt - Olive Green",
    slug: "supima-cotton-essential-crewneck-tshirt-olive",
    sku: "A&A-MTS-003",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "T-Shirt",
    regularPrice: 950,
    discountPrice: 690,
    stockQuantity: 50,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 110,
    volumeOrSize: "S, M, L, XL",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Ultra-soft daily essential tee with silky smooth hand-feel and vibrant colorfastness.",
    description: "Everyday luxury for men. Super soft, lightweight, and perfect as an undershirt or casual daytime top with chinos.",
    ingredients: "100% Long-Staple Compact Cotton (180 GSM).",
    usageInstructions: "Machine wash cold with mild detergent.",
    specifications: {
      "Fabric": "180 GSM Bio-Polished Cotton",
      "Fit": "Regular Comfort Fit",
      "Stitching": "Twin-Needle Hem & Sleeves"
    },
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== MEN'S COLLECTION: PANT =====================
  {
    id: "prod-m-pant-1",
    name: "Tailored Stretch Slim-Fit Chino Pants - Khaki Beige",
    slug: "tailored-stretch-slim-fit-chino-pants-khaki",
    sku: "A&A-MPN-001",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Pant",
    regularPrice: 1950,
    discountPrice: 1550,
    stockQuantity: 36,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 96,
    volumeOrSize: "30, 32, 34, 36, 38",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Versatile cotton-twill stretch chino pants with YKK metal zipper and slant pockets.",
    description: "Seamlessly transition from the office boardroom to weekend hangouts. Cut in a modern slim silhouette with 3% elastane for unrestricted movement.",
    ingredients: "97% Cotton Twill, 3% Elastane.",
    usageInstructions: "Machine wash cold. Turn inside out before washing.",
    specifications: {
      "Fabric": "Peach-Finished Cotton Twill",
      "Closure": "YKK Brass Zipper + Button",
      "Fit": "Tapered Slim Fit",
      "Pockets": "2 Slant Front, 2 Welt Back Pockets"
    },
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-pant-2",
    name: "Vintage Indigo Raw Denim Straight Jeans - Dark Blue",
    slug: "vintage-indigo-raw-denim-straight-jeans-dark-blue",
    sku: "A&A-MPN-002",
    brand: "Apex & Heritage",
    category: "Men's Collection",
    subcategory: "Pant",
    regularPrice: 2450,
    discountPrice: 1890,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 135,
    volumeOrSize: "30, 32, 34, 36",
    countryOfOrigin: "Bangladesh",
    shortDescription: "12.5 oz authentic selvedge-look denim jeans with copper rivets and leather back patch.",
    description: "Built for durability and timeless casual style. Features 5-pocket styling and comfort stretch that conforms to your body shape.",
    ingredients: "98% Heavyweight Cotton Denim, 2% Spandex.",
    usageInstructions: "Wash sparingly in cold water to build unique fading whiskers.",
    specifications: {
      "Denim Weight": "12.5 oz Mid-Heavyweight",
      "Style": "5-Pocket Classic",
      "Fit": "Straight Slim Fit",
      "Rivets": "Antiqued Copper Rivets"
    },
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-pant-3",
    name: "Formal Executive Wrinkle-Free Trouser - Charcoal Grey",
    slug: "formal-executive-wrinkle-free-trouser-charcoal",
    sku: "A&A-MPN-003",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Pant",
    regularPrice: 1800,
    discountPrice: 1390,
    stockQuantity: 25,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 52,
    volumeOrSize: "30, 32, 34, 36, 38",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Refined poly-viscose blend formal office trousers with grip waistband and sharp front crease.",
    description: "Designed for corporate executives who demand both sharp presentation and all-day ease. Anti-wrinkle fabric retains its clean press throughout long shifts.",
    ingredients: "65% Polyester, 35% Viscose.",
    usageInstructions: "Dry clean or gentle hand wash. Warm iron.",
    specifications: {
      "Waistband": "Internal Shirt-Grip Band",
      "Cut": "Classic Formal Straight Fit",
      "Crease": "Permanent Heat-Set Front Crease"
    },
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== MEN'S COLLECTION: CLOCK / WATCH =====================
  {
    id: "prod-m-clock-1",
    name: "Ayat & Amat Heritage Chronograph Steel Clock / Watch",
    slug: "ayat-amat-heritage-chronograph-steel-clock-watch",
    sku: "A&A-MCK-001",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Clock",
    regularPrice: 3800,
    discountPrice: 2950,
    stockQuantity: 20,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 168,
    volumeOrSize: "Dial: 42mm, Strap: 22mm",
    countryOfOrigin: "Japan Movement / Assembled in BD",
    shortDescription: "Luxury 3-subdial chronograph quartz timepiece with 316L stainless steel bracelet and date display.",
    description: "Precision Japanese quartz movement encapsulated in a surgical-grade 316L stainless steel case. Scratch-resistant mineral crystal glass and 50M water resistance suitable for daily rain and hand washing.",
    ingredients: "316L Stainless Steel, Mineral Crystal Glass, Japanese Quartz Movement.",
    usageInstructions: "Wipe with microfiber cloth. Keep away from strong magnetic fields.",
    specifications: {
      "Movement": "Japanese Chronograph Quartz",
      "Dial Diameter": "42 mm",
      "Water Resistance": "5 ATM (50 Meters)",
      "Glass": "Scratch-Resistant Mineral Crystal",
      "Warranty": "1 Year Official Brand Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-clock-2",
    name: "Minimalist Sapphire Leather Strap Clock / Watch - Rosegold & Black",
    slug: "minimalist-sapphire-leather-strap-clock-watch",
    sku: "A&A-MCK-002",
    brand: "Casio & Curren Timepieces",
    category: "Men's Collection",
    subcategory: "Clock",
    regularPrice: 2600,
    discountPrice: 1990,
    stockQuantity: 22,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 94,
    volumeOrSize: "Dial: 40mm, Genuine Leather",
    countryOfOrigin: "Japan Movement",
    shortDescription: "Ultra-thin 7mm profile dress clock / watch with genuine brown leather strap and sunray black dial.",
    description: "The epitome of subtle masculine elegance. Ultra-slim profile slips easily under shirt cuffs. High accuracy timekeeping with genuine calfskin leather band.",
    ingredients: "Alloy Rosegold Plated Case, Genuine Leather Band, Quartz Engine.",
    usageInstructions: "Avoid submerging leather strap in water.",
    specifications: {
      "Case Thickness": "7.5 mm Ultra-Slim",
      "Band Material": "Genuine Calfskin Leather",
      "Movement": "Precision Quartz Movement",
      "Dial": "Sunray Black with Date Window"
    },
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-m-clock-3",
    name: "Luxury Golden Skeleton Mechanical Dial Clock / Watch",
    slug: "luxury-golden-skeleton-mechanical-dial-clock-watch",
    sku: "A&A-MCK-003",
    brand: "Ayat & Amat Signature",
    category: "Men's Collection",
    subcategory: "Clock",
    regularPrice: 4500,
    discountPrice: 3450,
    stockQuantity: 15,
    stockStatus: "low_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 45,
    volumeOrSize: "Dial: 44mm, Gold Plated",
    countryOfOrigin: "Automatic Mechanical",
    shortDescription: "Exquisite see-through skeleton mechanical movement clock / watch with dual exhibition sapphire glass.",
    description: "A conversation starter. Powered by the natural motion of your wrist without requiring any battery. Golden Roman numeral dial with glowing luminous hands.",
    ingredients: "Electroplated 18K Gold Finish Stainless Steel, Hardlex Glass.",
    usageInstructions: "Wind crown 20 times clockwise when first wearing.",
    specifications: {
      "Movement": "Automatic Self-Winding Mechanical",
      "Feature": "Exhibition Skeleton Dial & Caseback",
      "Waterproof": "3 ATM Splash Proof",
      "Clasp": "Butterfly Double Deployant Clasp"
    },
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== WOMEN'S COLLECTION: THREE PIECE =====================
  {
    id: "prod-w-three-1",
    name: "Exclusive Hand-Embroidered Organza Three Piece - Pastel Peach",
    slug: "exclusive-hand-embroidered-organza-three-piece-peach",
    sku: "A&A-W3P-001",
    brand: "Ayat & Amat Signature",
    category: "Women's Collection",
    subcategory: "Three Piece",
    regularPrice: 4200,
    discountPrice: 3450,
    stockQuantity: 24,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 88,
    volumeOrSize: "Unstitched Fabric (Kameez 3.5m, Salwar 2.5m, Dupatta 2.5m)",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Intricate zari and thread embroidery on pure organza kameez with silk inner, cotton satin salwar and scallop dupatta.",
    description: "Elevate your festive presence with Ayat & Amat's festive Three Piece. Delicately handcrafted with resham thread, sequin accents, and embroidered borders on rich pastel fabric.",
    ingredients: "Pure Organza Kameez, Raw Silk Lining, Heavy Embroidered Organza Dupatta, Cotton Satin Pant.",
    usageInstructions: "Dry clean recommended to preserve handcrafted zari embroidery.",
    specifications: {
      "Type": "Unstitched Premium 3-Piece",
      "Work": "Resham Zari & Cut-Work Embroidery",
      "Occasion": "Eid, Wedding, Festive Party Wear",
      "Dupatta": "Full Four-Side Scalloped Embroidery"
    },
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-w-three-2",
    name: "Pure Egyptian Cotton Digital Print 3-Piece Salwar Suit - Mint Floral",
    slug: "pure-egyptian-cotton-digital-print-three-piece-mint",
    sku: "A&A-W3P-002",
    brand: "Apex & Heritage",
    category: "Women's Collection",
    subcategory: "Three Piece",
    regularPrice: 3100,
    discountPrice: 2490,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 76,
    volumeOrSize: "Unstitched Fabric Set",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Ultra-breathable 80s lawn cotton three piece with chiffon printed dupatta and matching solid salwar.",
    description: "Daily comfort meets effortless elegance. Perfect for summer in Bangladesh with lightweight, soft cotton that stays cool and vibrant even after repeated washing.",
    ingredients: "100% Fine Lawn Cotton Kameez, Pure Chiffon Dupatta, Cambric Cotton Salwar.",
    usageInstructions: "Gentle machine wash with mild detergent.",
    specifications: {
      "Fabric": "80s Fine Lawn Cotton",
      "Dupatta": "Pure Chiffon Digital Printed 2.5m",
      "Color Fastness": "Guaranteed Non-Fade Reactive Dyes"
    },
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== WOMEN'S COLLECTION: KURTI & TOPS =====================
  {
    id: "prod-w-kurti-1",
    name: "Designer Embroidered Georgette Long Kurti - Navy & Gold",
    slug: "designer-embroidered-georgette-long-kurti-navy-gold",
    sku: "A&A-WKT-001",
    brand: "Zara & Urban",
    category: "Women's Collection",
    subcategory: "Kurti & Tops",
    regularPrice: 1850,
    discountPrice: 1450,
    stockQuantity: 32,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 65,
    volumeOrSize: "36, 38, 40, 42, 44 (Bust Size)",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Flowy georgette single kurti with gold neckline embroidery and comfortable inner lining.",
    description: "Chic and contemporary, this long kurti pairs seamlessly with leggings, cigarette pants, or palazzos. Soft attached lining prevents transparency.",
    ingredients: "Pure Heavy Faux Georgette with Butter Silk Inner.",
    usageInstructions: "Hand wash gently in cold water.",
    specifications: {
      "Length": "46 Inches Calf-Length",
      "Sleeve": "Three-Quarter Sleeves with Border Work",
      "Pattern": "A-Line Flared Silhouette"
    },
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== WOMEN'S COLLECTION: SAREE =====================
  {
    id: "prod-w-saree-1",
    name: "Dhakai Jamdani Handloom Soft Silk Saree - Ruby Red & Gold",
    slug: "dhakai-jamdani-handloom-soft-silk-saree-ruby-gold",
    sku: "A&A-WSR-001",
    brand: "Ayat & Amat Signature",
    category: "Women's Collection",
    subcategory: "Saree",
    regularPrice: 6500,
    discountPrice: 4990,
    stockQuantity: 18,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 5.0,
    reviewCount: 142,
    volumeOrSize: "12 Haat Saree with Blouse Piece (6.3 Meters)",
    countryOfOrigin: "Rupganj, Narayanganj, Bangladesh",
    shortDescription: "Authentic Dhakai Jamdani hand-woven on pure resham silk with intricate floral jal motifs.",
    description: "A masterpiece of Bangladeshi heritage weaving. Lightweight, airy, and shimmering with golden zari motifs across the entire body and pallu.",
    ingredients: "Natural Resham Silk with Metallic Golden Zari Weaving.",
    usageInstructions: "Dry clean only. Store wrapped in pure muslin cloth.",
    specifications: {
      "Weave": "Traditional Dhakai Handloom Jamdani (84 Count)",
      "Length": "6.3 Meters with 0.8m Blouse Piece Included",
      "Border": "Traditional Karat & Floral Zari Border"
    },
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== WOMEN'S COLLECTION: CLOCK & JEWELRY =====================
  {
    id: "prod-w-clock-1",
    name: "Women's Rose Gold Crystal-Bezel Mesh Clock / Watch",
    slug: "womens-rose-gold-crystal-bezel-mesh-clock-watch",
    sku: "A&A-WCK-001",
    brand: "Casio & Curren Timepieces",
    category: "Women's Collection",
    subcategory: "Clock & Jewelry",
    regularPrice: 3200,
    discountPrice: 2350,
    stockQuantity: 26,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 112,
    volumeOrSize: "Dial: 34mm, Adjustable Mesh Band",
    countryOfOrigin: "Japan Movement",
    shortDescription: "Glamorous rose gold timepiece with genuine Austrian crystal bezel and mother-of-pearl shimmering dial.",
    description: "A jewelry piece and precision clock in one. Delicate Milanese mesh magnet strap fits any wrist size comfortably with instant snap closure.",
    ingredients: "Rose Gold Vacuum Ion-Plated Alloy, Swarovski Elements Crystals, Quartz Mechanism.",
    usageInstructions: "Wipe clean with soft jeweler cloth. 30M splash resistance.",
    specifications: {
      "Dial Diameter": "34 mm Feminine Size",
      "Strap": "Milanese Magnetic Mesh Band (No tools needed)",
      "Dial Face": "Iridescent Natural Mother-of-Pearl",
      "Warranty": "1 Year Movement Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-w-jewelry-2",
    name: "Austrian Crystal Chandelier Pendant Necklace & Earring Set",
    slug: "austrian-crystal-chandelier-pendant-necklace-earring-set",
    sku: "A&A-WCK-002",
    brand: "Ayat & Amat Signature",
    category: "Women's Collection",
    subcategory: "Clock & Jewelry",
    regularPrice: 2100,
    discountPrice: 1650,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 56,
    volumeOrSize: "Necklace 45cm + 5cm extension, Earrings 3.5cm",
    countryOfOrigin: "Ayat & Amat Handcrafted",
    shortDescription: "Sparkling teardrop crystal pendant with matching dangle earrings plated in anti-tarnish rhodium.",
    description: "Complements festive sarees, lehengas, and western evening gowns with breathtaking sparkle.",
    ingredients: "Hypoallergenic Brass, Triple Rhodium Plated, Cubic Zirconia Crystals.",
    usageInstructions: "Avoid contact with perfumes, hairsprays, and moisture.",
    specifications: {
      "Plating": "Anti-Tarnish White Gold Rhodium",
      "Clasp": "Lobster Claw with Extender Chain",
      "Stone": "AAA+ Grade Faceted Cubic Zirconia"
    },
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== BABY COLLECTION: BABY BOYS =====================
  {
    id: "prod-b-boy-1",
    name: "Gentleman Baby Boy Bowtie Shirt & Suspender Short Set",
    slug: "gentleman-baby-boy-bowtie-shirt-suspender-short-set",
    sku: "A&A-BBY-001",
    brand: "Ayat & Amat Signature",
    category: "Baby Collection",
    subcategory: "Baby Boys Clothing",
    regularPrice: 1800,
    discountPrice: 1390,
    stockQuantity: 35,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 78,
    volumeOrSize: "6-12M, 12-18M, 18-24M, 2-3Y",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Adorable formal 3-piece set with cotton collared shirt, detachable bowtie, and elastic suspender shorts.",
    description: "Dress your little prince for birthdays, family parties, and festive occasions. Ultra-soft combed cotton is 100% gentle on delicate baby skin.",
    ingredients: "100% Breathable Organic Cotton.",
    usageInstructions: "Machine wash cold delicate. Remove bowtie before washing.",
    specifications: {
      "Fabric": "100% Combed Baby Cotton",
      "Set Includes": "Short-Sleeve Shirt, Bowtie, Suspender Shorts",
      "Waist": "Comfort-Fit Elastic Waistband"
    },
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-b-boy-2",
    name: "Toddler Dinosaur Safari Cotton Polo & Shorts Combo",
    slug: "toddler-dinosaur-safari-cotton-polo-shorts-combo",
    sku: "A&A-BBY-002",
    brand: "Zara & Urban",
    category: "Baby Collection",
    subcategory: "Baby Boys Clothing",
    regularPrice: 1450,
    discountPrice: 1150,
    stockQuantity: 40,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 92,
    volumeOrSize: "1Y, 2Y, 3Y, 4Y",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Playful polo t-shirt with cute embroidered dino and soft twill drawstring shorts.",
    description: "Everyday active wear for happy toddlers. Stretchy, breathable cotton allows full mobility for running and playing.",
    ingredients: "100% Organic Pique Cotton.",
    usageInstructions: "Machine wash cold.",
    specifications: {
      "Fit": "Relaxed Toddler Fit",
      "Waistband": "Soft Drawstring Cotton Waistband",
      "Dye": "Baby-Safe Non-Toxic Eco Dyes"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== BABY COLLECTION: BABY GIRLS =====================
  {
    id: "prod-b-girl-1",
    name: "Little Princess Floral Tulle Party Frock - Peach",
    slug: "little-princess-floral-tulle-party-frock-peach",
    sku: "A&A-BBY-003",
    brand: "Ayat & Amat Signature",
    category: "Baby Collection",
    subcategory: "Baby Girls Clothing",
    regularPrice: 1650,
    discountPrice: 1250,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 5.0,
    reviewCount: 104,
    volumeOrSize: "6-12M, 1-2Y, 2-3Y, 3-4Y",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Multi-layer soft tulle frock with floral lace bodice, cotton lining, and matching bow headband.",
    description: "Make your baby girl look like a fairy tale princess. The inner layer is lined with 100% soft cotton so tulle never touches her sensitive skin.",
    ingredients: "Soft Net Tulle with 100% Cotton Inner Lining.",
    usageInstructions: "Hand wash gently in cold water. Air dry.",
    specifications: {
      "Lining": "100% Pure Soft Cotton Inner",
      "Closure": "Hidden Back Zipper with Ribbon Tie",
      "Bonus": "Includes Matching Flower Headband"
    },
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== BABY COLLECTION: ROMPERS & SETS =====================
  {
    id: "prod-b-romp-1",
    name: "Organic Cotton Newborn Unisex Onesie Rompers (Pack of 3)",
    slug: "organic-cotton-newborn-unisex-onesie-rompers-pack-of-3",
    sku: "A&A-BBY-004",
    brand: "Ayat & Amat Signature",
    category: "Baby Collection",
    subcategory: "Rompers & Sets",
    regularPrice: 1600,
    discountPrice: 1290,
    stockQuantity: 50,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 160,
    volumeOrSize: "0-3M, 3-6M, 6-9M, 9-12M",
    countryOfOrigin: "Bangladesh",
    shortDescription: "GOTS certified organic cotton baby rompers with nickel-free bottom snap closures for rapid diaper changes.",
    description: "The essential gift for every newborn. Envelope neckline expands easily over baby's head, and smooth flatlock seams eliminate chafing.",
    ingredients: "100% GOTS Certified Organic Cotton (Interlock Knit).",
    usageInstructions: "Machine wash warm. Tumble dry low.",
    specifications: {
      "Pack Quantity": "3 Coordinating Rompers",
      "Certification": "GOTS Certified Organic",
      "Buttons": "Nickel-Free Reinforced Snap Buttons",
      "Collar": "Expandable Lap Shoulder Neckline"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-b-romp-2",
    name: "Plush Bear-Ear Hooded Winter Warm Baby Jumpsuit - Milky Cream",
    slug: "plush-bear-ear-hooded-winter-baby-jumpsuit-cream",
    sku: "A&A-BBY-005",
    brand: "Apex & Heritage",
    category: "Baby Collection",
    subcategory: "Rompers & Sets",
    regularPrice: 1750,
    discountPrice: 1350,
    stockQuantity: 28,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 84,
    volumeOrSize: "3-6M, 6-12M, 12-18M",
    countryOfOrigin: "Bangladesh",
    shortDescription: "Super-fluffy thermal fleece hooded romper with 3D bear ears and full front zipper.",
    description: "Keep your bundle of joy toasty warm during winter outings and stroller rides. Soft cotton jersey inner protects tender skin.",
    ingredients: "Microfiber Coral Fleece with 100% Cotton Jersey Lining.",
    usageInstructions: "Machine wash delicate cycle in laundry bag.",
    specifications: {
      "Hood": "Cute 3D Teddy Bear Ears",
      "Zipper": "Full Front Two-Way Safety Zipper with Chin Guard",
      "Warmth": "Double Layered Thermal Insulation"
    },
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ]
  },

  // ===================== BABY COLLECTION: BABY CLOCK & TOYS =====================
  {
    id: "prod-b-clock-1",
    name: "Cute Cartoon Animal Nursery Wall Clock with Silent Quartz Sweep",
    slug: "cute-cartoon-animal-nursery-wall-clock-silent",
    sku: "A&A-BCK-001",
    brand: "Ayat & Amat Signature",
    category: "Baby Collection",
    subcategory: "Baby Clock & Toys",
    regularPrice: 1500,
    discountPrice: 1150,
    stockQuantity: 25,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 74,
    volumeOrSize: "12 Inch Round (30cm)",
    countryOfOrigin: "Ayat & Amat Kids",
    shortDescription: "Non-ticking silent wall clock for kids bedroom with colorful large learning numbers and 3D animal illustrations.",
    description: "Designed specifically for nurseries and children's study rooms. Completely silent quartz sweep ensures your baby sleeps peacefully without any annoying ticking noise.",
    ingredients: "Eco-Friendly ABS Frame, Clear Glass Lens, Silent Sweep Quartz Mechanism.",
    usageInstructions: "Requires 1 AA battery (included). Easy hook hanging.",
    specifications: {
      "Diameter": "12 Inches (30 cm)",
      "Mechanism": "100% Non-Ticking Silent Sweep",
      "Display": "Large Easy-to-Read Numbers for Time Learning",
      "Safety": "Rounded Edge Child-Safe Casing"
    },
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584697964190-705b893683f1?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-b-toy-2",
    name: "Montessori Wooden Educational Building Block & Shape Clock Toy",
    slug: "montessori-wooden-educational-clock-toy",
    sku: "A&A-BCK-002",
    brand: "Ayat & Amat Signature",
    category: "Baby Collection",
    subcategory: "Baby Clock & Toys",
    regularPrice: 1200,
    discountPrice: 890,
    stockQuantity: 32,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 95,
    volumeOrSize: "Wooden Board 22cm x 22cm",
    countryOfOrigin: "Ayat & Amat Kids",
    shortDescription: "Interactive wooden clock puzzle with colorful geometric shapes and movable hour/minute hands for toddlers.",
    description: "A fun, brain-boosting educational toy that helps toddlers learn geometric shapes, colors, and time reading while sharpening hand-eye coordination.",
    ingredients: "Natural Solid Wood, Non-Toxic Water-Based Safe Paint.",
    usageInstructions: "Wipe with slightly damp cloth. Recommended for ages 18 months+.",
    specifications: {
      "Material": "Smooth Sanded Beech Wood",
      "Paint": "100% Lead-Free Non-Toxic Paint",
      "Function": "Shape Sorter + Time Learning Clock"
    },
    images: [
      "https://images.unsplash.com/photo-1584697964190-705b893683f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const INITIAL_PRODUCTS_LIST = PRODUCTS;
export const INITIAL_CATEGORIES_LIST = CATEGORIES;
export const INITIAL_BRANDS_LIST = BRANDS;

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "AYAT10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 1500,
    maxDiscount: 500,
    expiryDate: "2026-12-31",
    usageLimit: 1000,
    usedCount: 215,
    isActive: true
  },
  {
    id: "coup-2",
    code: "AMAT200",
    discountType: "fixed",
    discountValue: 200,
    minOrderAmount: 2000,
    expiryDate: "2026-12-31",
    usageLimit: 500,
    usedCount: 142,
    isActive: true
  },
  {
    id: "coup-3",
    code: "FASHION500",
    discountType: "fixed",
    discountValue: 500,
    minOrderAmount: 4000,
    expiryDate: "2026-12-31",
    usageLimit: 200,
    usedCount: 88,
    isActive: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "A&A-BD-48192",
    date: "2026-10-18 14:32",
    customerName: "Kamal Hossain",
    customerEmail: "kamal@gmail.com",
    customerPhone: "01789123456",
    district: "Dhaka",
    cityArea: "Uttara Sector 7",
    fullAddress: "House 12, Road 5, Sector 7, Uttara, Dhaka",
    items: [
      {
        productId: "prod-m-shirt-1",
        productName: "Premium Oxford Cotton Formal Shirt - Sky Blue",
        productImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        price: 1450,
        quantity: 1,
        total: 1450
      },
      {
        productId: "prod-m-clock-1",
        productName: "Ayat & Amat Heritage Chronograph Steel Clock / Watch",
        productImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        price: 2950,
        quantity: 1,
        total: 2950
      }
    ],
    subtotal: 4400,
    discount: 440,
    deliveryCharge: 0,
    total: 3960,
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    status: "processing",
    trackingHistory: [
      { status: "pending", date: "2026-10-18 14:32", note: "Order placed successfully via Cash on Delivery." },
      { status: "confirmed", date: "2026-10-18 15:00", note: "Customer verified via phone call. Packaging started." },
      { status: "processing", date: "2026-10-18 17:30", note: "Dispatched to sorting hub." }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-m-shirt-1",
    productName: "Premium Oxford Cotton Formal Shirt - Sky Blue",
    customerName: "Tariqul Islam",
    customerEmail: "tariqul@gmail.com",
    rating: 5,
    title: "Outstanding Fabric Quality!",
    comment: "The cotton texture is super comfortable and fits like a bespoke tailored shirt. Very impressed with Ayat & Amat's packaging!",
    date: "2026-10-15",
    isApproved: true,
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "prod-m-clock-1",
    productName: "Ayat & Amat Heritage Chronograph Steel Clock / Watch",
    customerName: "Nafis Ahmed",
    customerEmail: "nafis@gmail.com",
    rating: 5,
    title: "Premium Luxury Watch",
    comment: "Heavy stainless steel weight and stunning dial. Looks like a 15k watch in reality. Delivered in 24 hours in Dhaka!",
    date: "2026-10-12",
    isApproved: true,
    verifiedPurchase: true
  }
];

export const BANGLADESH_DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria", "Chandpur",
  "Chapainawabganj", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur",
  "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokathi",
  "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur",
  "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh",
  "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali",
  "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
  "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];

export const INITIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: "admin-super-1",
    name: "Ayat & Amat (Super Admin)",
    email: "admin@ayatamat.com",
    password: "", // Passwords are now securely stored and verified in Supabase database
    role: "super_admin",
    phone: "01711234567",
    permissions: ["all"],
    createdAt: "2026-09-01",
    isActive: true
  },
  {
    id: "admin-sub-1",
    name: "Tariqul Islam (Dispatch Manager)",
    email: "subadmin@ayatamat.com",
    password: "",
    role: "sub_admin",
    phone: "01819283746",
    permissions: ["orders", "tracking"],
    createdAt: "2026-09-15",
    isActive: true
  }
];

export const INITIAL_USER: User = {
  id: "user-1",
  name: "Maria Afrin",
  email: "mariaafrin1106@gmail.com",
  phone: "01789123456",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  defaultDistrict: "Dhaka",
  defaultAddress: "House 42, Flat 4B, Road 27, Dhanmondi, Dhaka",
  role: "admin"
};
