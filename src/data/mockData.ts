import { Product, Category, Brand, Coupon, Order, Review, StoreSettings, User, AdminAccount } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "GlowAura Beauty BD",
  hotline: "+880 1711-234567",
  supportEmail: "support@glowaurabd.com",
  announcement: "✨ Free Express Delivery across Bangladesh on orders over ৳2,500 | 100% Authentic Korean & Global Brands",
  deliveryInsideDhaka: 60,
  deliveryOutsideDhaka: 120,
  deliverySubDhaka: 90,
  freeDeliveryThreshold: 2500,
  bkashMerchantNumber: "01711234567 (Merchant)",
  nagadMerchantNumber: "01811234567 (Merchant)",
};

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Skincare",
    slug: "skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    itemCount: 16,
    subcategories: ["Serums & Ampoules", "Toners & Mists", "Moisturizers", "Cleansers", "Essences"]
  },
  {
    id: "cat-2",
    name: "Sun Care",
    slug: "sun-care",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    itemCount: 6,
    subcategories: ["Chemical Sunscreens", "Physical Sunscreens", "Sun Sticks", "Sun Gel"]
  },
  {
    id: "cat-3",
    name: "Makeup",
    slug: "makeup",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
    subcategories: ["Foundations & BB Creams", "Lipsticks & Tints", "Mascaras & Eyeliners", "Setting Sprays"]
  },
  {
    id: "cat-4",
    name: "Lip Care",
    slug: "lip-care",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    itemCount: 5,
    subcategories: ["Lip Masks", "Lip Balms", "Lip Scrubs", "Lip Oils"]
  },
  {
    id: "cat-5",
    name: "Face Care",
    slug: "face-care",
    image: "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=600&q=80",
    itemCount: 7,
    subcategories: ["Sheet Masks", "Clay Masks", "Exfoliators", "Eye Creams"]
  },
  {
    id: "cat-6",
    name: "Hair Care",
    slug: "hair-care",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    subcategories: ["Shampoos", "Conditioners", "Hair Serums", "Scalp Treatments"]
  },
  {
    id: "cat-7",
    name: "Body Care",
    slug: "body-care",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    subcategories: ["Body Lotions", "Body Scrubs", "Shower Gels"]
  },
  {
    id: "cat-8",
    name: "Fragrance",
    slug: "fragrance",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    subcategories: ["Eau De Parfum", "Body Mists", "Roll-on Oils"]
  },
  {
    id: "cat-9",
    name: "Beauty Tools",
    slug: "beauty-tools",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    subcategories: ["Gua Sha & Rollers", "Makeup Sponges", "Brushes"]
  },
  {
    id: "cat-10",
    name: "Personal Care",
    slug: "personal-care",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    subcategories: ["Hand Creams", "Foot Care", "Acne Patches"]
  }
];

export const BRANDS: Brand[] = [
  {
    id: "brand-1",
    name: "COSRX",
    slug: "cosrx",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80",
    country: "South Korea",
    itemCount: 6
  },
  {
    id: "brand-2",
    name: "Beauty of Joseon",
    slug: "beauty-of-joseon",
    logo: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=200&q=80",
    country: "South Korea",
    itemCount: 5
  },
  {
    id: "brand-3",
    name: "The Ordinary",
    slug: "the-ordinary",
    logo: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80",
    country: "Canada",
    itemCount: 5
  },
  {
    id: "brand-4",
    name: "CeraVe",
    slug: "cerave",
    logo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80",
    country: "United States",
    itemCount: 4
  },
  {
    id: "brand-5",
    name: "Laneige",
    slug: "laneige",
    logo: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=200&q=80",
    country: "South Korea",
    itemCount: 4
  },
  {
    id: "brand-6",
    name: "Anua",
    slug: "anua",
    logo: "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=200&q=80",
    country: "South Korea",
    itemCount: 3
  },
  {
    id: "brand-7",
    name: "Bioderma",
    slug: "bioderma",
    logo: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=200&q=80",
    country: "France",
    itemCount: 3
  },
  {
    id: "brand-8",
    name: "Maybelline New York",
    slug: "maybelline",
    logo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80",
    country: "United States",
    itemCount: 2
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Advanced Snail 96 Mucin Power Essence",
    slug: "cosrx-advanced-snail-96-mucin-power-essence",
    sku: "CSX-SN-96100",
    brand: "COSRX",
    category: "Skincare",
    subcategory: "Essences",
    regularPrice: 1650,
    discountPrice: 1390,
    stockQuantity: 45,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 148,
    volumeOrSize: "100ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Enriched with 96.3% skin-boosting Snail Secretion Filtrate for deep hydration and skin repair.",
    description: "COSRX Advanced Snail 96 Mucin Power Essence is formulated with 96.3% Snail Secretion Filtrate to protect skin from moisture loss while improving skin elasticity. Snail mucin helps repair and soothe red, sensitive skin post-breakouts by replenishing moisture.",
    ingredients: "Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Carbomer, Panthenol, Arginine.",
    usageInstructions: "After cleansing and toning, apply a small amount on your entire face. Gently pat using fingertips to aid absorption, and then continue with your moisturizer.",
    specifications: {
      "Skin Type": "All Skin Types, Dehydrated, Acne-Prone",
      "Formulation": "Lightweight Essence",
      "Key Benefit": "Hydration, Barrier Repair, Radiance",
      "Authenticity": "100% Genuine with Korean Barcode"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-2",
    name: "Relief Sun : Rice + Probiotics SPF50+ PA++++",
    slug: "beauty-of-joseon-relief-sun-rice-probiotics",
    sku: "BOJ-RS-5050",
    brand: "Beauty of Joseon",
    category: "Sun Care",
    subcategory: "Chemical Sunscreens",
    regularPrice: 1550,
    discountPrice: 1250,
    stockQuantity: 38,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 210,
    volumeOrSize: "50ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Organic, lightweight chemical sunscreen that leaves no white cast, featuring 30% Rice extract and fermented grain extracts.",
    description: "Relief Sun is an organic sunscreen that applies gently on the skin. Formulated with 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin without feeling sticky or oily.",
    ingredients: "Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Methylene Bis-benzotriazolyl Tetramethylbutylphenol, Coco-caprylate/Caprate, Caprylyl Methicone, Diethylhexyl Butamido Triazone, Glycerin, Butylene Glycol.",
    usageInstructions: "At the last step of basic skincare routine, evenly spread a generous amount over areas vulnerable to sun exposure. Reapply every 2-3 hours when outdoors.",
    specifications: {
      "SPF Rating": "SPF 50+ PA++++",
      "White Cast": "Zero White Cast",
      "Finish": "Dewy Natural Glow",
      "Texture": "Lotion Cream"
    },
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-3",
    name: "Niacinamide 10% + Zinc 1% Oil Control Serum",
    slug: "the-ordinary-niacinamide-10-zinc-1",
    sku: "ORD-NZ-1030",
    brand: "The Ordinary",
    category: "Skincare",
    subcategory: "Serums & Ampoules",
    regularPrice: 1350,
    discountPrice: 1100,
    stockQuantity: 52,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 189,
    volumeOrSize: "30ml",
    countryOfOrigin: "Canada",
    shortDescription: "High-strength vitamin and mineral blemish formula to reduce skin blemishes and congestion.",
    description: "Niacinamide (Vitamin B3) is indicated to reduce the appearance of skin blemishes and congestion. A high 10% concentration of this vitamin is supported in the formula by zinc salt of pyrrolidone carboxylic acid to balance visible aspects of sebum activity.",
    ingredients: "Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.",
    usageInstructions: "Apply to entire face morning and evening before heavier creams. Do not combine in the same routine with pure Vitamin C.",
    specifications: {
      "Target Issues": "Enlarged Pores, Oily Skin, Texture",
      "Cruelty Free": "Yes, Vegan",
      "PH Level": "5.50 - 6.50"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-4",
    name: "Lip Sleeping Mask (Berry) Overnight Repair",
    slug: "laneige-lip-sleeping-mask-berry",
    sku: "LAN-LSM-20B",
    brand: "Laneige",
    category: "Lip Care",
    subcategory: "Lip Masks",
    regularPrice: 1850,
    discountPrice: 1550,
    stockQuantity: 28,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 94,
    volumeOrSize: "20g",
    countryOfOrigin: "South Korea",
    shortDescription: "Leave-on lip mask that delivers intense moisture and antioxidants while you sleep.",
    description: "Laneige Lip Sleeping Mask gently melts away dead skin cells from the lips to make the lips feel smooth and elastic. Infused with Berry Fruit Complex, Vitamin C, and coconut oil to deliver long-lasting hydration.",
    ingredients: "Diisostearyl Malate, Hydrogenated Polyisobutene, Phytosteryl/Isostearyl/Cetyl/Stearyl/Behenyl Dimer Dilinoleate, Hydrogenated C6-14 Olefin Polymers, Polybutene, Microcrystalline Wax, Shea Butter, Synthetic Wax, Candelilla Wax, Sucrose Tetrastearate Triacetate.",
    usageInstructions: "Before going to bed at night, apply an adequate amount on the lips using the built-in spatula. The next morning, gently wipe the lips clean with tissue or cotton pad.",
    specifications: {
      "Flavor": "Sweet Berry",
      "Size": "20g Jar with Spatula",
      "Benefit": "Deep Lip Nourishment"
    },
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-5",
    name: "Heartleaf 77% Soothing Toner Calming Solution",
    slug: "anua-heartleaf-77-soothing-toner",
    sku: "ANU-HL-77250",
    brand: "Anua",
    category: "Skincare",
    subcategory: "Toners & Mists",
    regularPrice: 2150,
    discountPrice: 1850,
    stockQuantity: 22,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 87,
    volumeOrSize: "250ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Sub-acidic soothing toner formulated with 77% Houttuynia Cordata Extract to calm irritation and soothe redness.",
    description: "The viral #1 Korean toner infused with 77% Heartleaf extract from Jirisan, Korea. Effectively controls sebum, calms sensitive acne-prone skin, and restores skin barrier balance.",
    ingredients: "Houttuynia Cordata Extract (77%), Purified Water, 1,2-Hexanediol, Glycerin, Betaine, Panthenol, Saccharum Officinarum (Sugarcane) Extract, Portulaca Oleracea Extract, Butylene Glycol, Vitex Agnus-Castus Extract, Chamomilla Recutita (Matricaria) Flower Extract, Arctium Lappa Root Extract.",
    usageInstructions: "After washing your face, apply with a cotton pad or gently pat onto face with hands.",
    specifications: {
      "Key Ingredient": "Heartleaf Extract 77%",
      "EWG Rating": "All Green Grade",
      "Alcohol-Free": "Yes"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-6",
    name: "Hydrating Facial Cleanser for Normal to Dry Skin",
    slug: "cerave-hydrating-facial-cleanser",
    sku: "CER-HY-473",
    brand: "CeraVe",
    category: "Skincare",
    subcategory: "Cleansers",
    regularPrice: 2200,
    discountPrice: 1890,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 112,
    volumeOrSize: "473ml",
    countryOfOrigin: "United States",
    shortDescription: "Non-foaming face wash with hyaluronic acid, ceramides, and glycerin cleanses and restores skin barrier.",
    description: "Developed with dermatologists, CeraVe Hydrating Facial Cleanser is a gentle face wash with ingredients like ceramides and hyaluronic acid that work to restore the skin's natural barrier.",
    ingredients: "Aqua / Water / Eau, Glycerin, Cetearyl Alcohol, Peg-40 Stearate, Stearyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Glyceryl Stearate, Behentrimonium Methosulfate, Sodium Lauroyl Lactylate, Sodium Hyaluronate, Cholesterol, Phenoxyethanol.",
    usageInstructions: "Wet skin with lukewarm water. Massage cleanser into skin in a gentle, circular motion. Rinse.",
    specifications: {
      "Skin Type": "Normal to Dry Skin",
      "Formulation": "Creamy Lotion",
      "Paraben-Free": "Yes"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-7",
    name: "Glow Serum : Propolis + Niacinamide",
    slug: "beauty-of-joseon-glow-serum-propolis-niacinamide",
    sku: "BOJ-GS-30",
    brand: "Beauty of Joseon",
    category: "Skincare",
    subcategory: "Serums & Ampoules",
    regularPrice: 1650,
    discountPrice: 1350,
    stockQuantity: 25,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 96,
    volumeOrSize: "30ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Honey-like serum enriched with Hanbang ingredients to combat acne, reduce pores, and brighten skin.",
    description: "Contains 60% Propolis Extract and 2% Niacinamide to manage inflamed acne, regulate oil production, and enhance honey glow radiance.",
    ingredients: "Propolis Extract, Dipropylene Glycol, Glycerin, Butylene Glycol, Water, Niacinamide, 1,2-Hexanediol, Melia Azadirachta Flower Extract, Melia Azadirachta Leaf Extract, Sodium Hyaluronate, Curcuma Longa (Turmeric) Root Extract.",
    usageInstructions: "Apply 2-3 drops onto clean face after toning, gently pat until absorbed.",
    specifications: {
      "Benefit": "Anti-inflammatory, Brightening",
      "Finish": "Glass Skin Glow"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-8",
    name: "Sensibio H2O Micellar Water Makeup Remover",
    slug: "bioderma-sensibio-h2o-micellar-water",
    sku: "BIO-SB-500",
    brand: "Bioderma",
    category: "Face Care",
    subcategory: "Cleansers",
    regularPrice: 1950,
    discountPrice: 1650,
    stockQuantity: 40,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 130,
    volumeOrSize: "500ml",
    countryOfOrigin: "France",
    shortDescription: "The world's iconic micellar water for sensitive skin, effectively removing waterproof makeup without irritation.",
    description: "Cleanses, soothes and clears makeup from face and eyes. Preserves the cutaneous balance and respect the skin's hydrolipidic film.",
    ingredients: "Aqua/Water/Eau, PEG-6 Caprylic/Capric Glycerides, Fructooligosaccharides, Mannitol, Xylitol, Rhamnose, Cucumis Sativus (Cucumber) Fruit Extract, Propylene Glycol, Cetrimonium Bromide, Disodium EDTA.",
    usageInstructions: "Soak a cotton pad with Sensibio H2O. Gently cleanse and/or remove make-up from your face and eyes. No rinsing required.",
    specifications: {
      "Skin Type": "Sensitive to All",
      "Rinse Required": "No"
    },
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-9",
    name: "Low pH Good Morning Gel Cleanser",
    slug: "cosrx-low-ph-good-morning-gel-cleanser",
    sku: "CSX-GM-150",
    brand: "COSRX",
    category: "Skincare",
    subcategory: "Cleansers",
    regularPrice: 1250,
    discountPrice: 980,
    stockQuantity: 34,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 75,
    volumeOrSize: "150ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Gentle gel cleanser with tea tree oil and natural BHA to refine skin texture and balance pH level.",
    description: "Formulated with purifying botanical ingredients, this mildly acidic cleanser works softly to make skin supple and clear without stripping natural moisture.",
    ingredients: "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Polysorbate 20, Styrax Japonica Branch/Fruit/Leaf Extract, Butylene Glycol, Saccharomyces Ferment, Cryptomeria Japonica Leaf Extract, Nelumbo Nucifera Leaf Extract, Pinus Pumilio Leaf Extract, Melaleuca Alternifolia (Tea Tree) Leaf Oil.",
    usageInstructions: "Gently massage a small amount of this gel cleanser on wet skin in the morning or night. Rinse with tepid water.",
    specifications: {
      "PH": "5.0 - 6.0",
      "Skin Concern": "Morning Refresh, Acne Prevention"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-10",
    name: "SuperStay Matte Ink Liquid Lipstick - Pioneer 20",
    slug: "maybelline-superstay-matte-ink-pioneer",
    sku: "MAY-SS-20",
    brand: "Maybelline New York",
    category: "Makeup",
    subcategory: "Lipsticks & Tints",
    regularPrice: 1150,
    discountPrice: 890,
    stockQuantity: 20,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 62,
    volumeOrSize: "5ml",
    countryOfOrigin: "United States",
    shortDescription: "Flawless matte finish liquid lipstick with up to 16-hour saturated wear and transfer-proof performance.",
    description: "Ink your lips in up to 16 hours of saturated liquid matte color. Features a unique arrow applicator for precise application and intensely pigmented red tint.",
    ingredients: "Dimethicone, Trimethylsiloxysilicate, Isododecane, Nylon-611/Dimethicone Copolymer, Dimethicone Crosspolymer, C30-45 Alkyldimethylsilyl Polypropylsilsesquioxane, Lauroyl Lysine, Alumina, Silica Silylate, Disodium Stearoyl Glutamate.",
    usageInstructions: "Apply liquid lipstick in the center of your upper lip and follow the contours of your mouth. Glide the liquid lipstick across the entire bottom lip.",
    specifications: {
      "Finish": "Velvet Matte",
      "Wear Duration": "Up to 16 Hours",
      "Smudge Proof": "Yes"
    },
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-11",
    name: "Salicylic Acid 2% Masque Charcoal Cleanser",
    slug: "the-ordinary-salicylic-acid-2-masque",
    sku: "ORD-SA-250",
    brand: "The Ordinary",
    category: "Face Care",
    subcategory: "Clay Masks",
    regularPrice: 1750,
    discountPrice: 1450,
    stockQuantity: 18,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 41,
    volumeOrSize: "50ml",
    countryOfOrigin: "Canada",
    shortDescription: "Formulated with charcoal and Amazonian clays to target lackluster tone and textural irregularities.",
    description: "Infused with 2% Salicylic Acid, Charcoal, and Amazonian clay to promote deep pore cleansing, exfoliate dead surface cells, and reveal smooth clarity.",
    ingredients: "Aqua (Water), Kaolin, Squalane, Glycerin, Dimethyl Isosorbide, Silica Cetyl Silylate, Salicylic Acid, Sodium Polyacrylate, Charcoal Powder, Pentylene Glycol.",
    usageInstructions: "Use once or twice a week on thoroughly clean, dry skin. Do not use on wet skin. Leave on for no more than 10 minutes. Rinse thoroughly with lukewarm water.",
    specifications: {
      "Target Issues": "Blackheads, Pores, Oiliness",
      "Max Leave-on Time": "10 minutes"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-12",
    name: "Matte Sun Stick : Mugwort + Camelia SPF50+",
    slug: "beauty-of-joseon-matte-sun-stick",
    sku: "BOJ-MSS-18",
    brand: "Beauty of Joseon",
    category: "Sun Care",
    subcategory: "Sun Sticks",
    regularPrice: 1690,
    discountPrice: 1390,
    stockQuantity: 24,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 53,
    volumeOrSize: "18g",
    countryOfOrigin: "South Korea",
    shortDescription: "Non-greasy matte sun stick that glides effortlessly over makeup without clumping or sticky finish.",
    description: "Developed in collaboration with cosmetic chemist Ramón, this matte sun stick controls sebum with silica powder and calms skin with mugwort and green tea extracts.",
    ingredients: "Methyl Methacrylate Crosspolymer, Synthetic Wax, Dibutyl Adipate, Coco-Caprylate/Caprate, Isopropyl Palmitate, Caprylyl Methicone, Camellia Sinensis Leaf Extract, Artemisia Capillaris Extract.",
    usageInstructions: "Twist up the stick and apply evenly across face and neck. Reapply throughout the day over makeup.",
    specifications: {
      "Finish": "Ultra-Matte, Zero Greasiness",
      "Reapplication": "Ideal over Makeup",
      "SPF": "SPF 50+ PA++++"
    },
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-13",
    name: "Heartleaf Pore Control Cleansing Oil",
    slug: "anua-heartleaf-pore-control-cleansing-oil",
    sku: "ANU-PC-200",
    brand: "Anua",
    category: "Skincare",
    subcategory: "Cleansers",
    regularPrice: 2250,
    discountPrice: 1890,
    stockQuantity: 15,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 78,
    volumeOrSize: "200ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Non-comedogenic cleansing oil specifically designed to eliminate blackheads, waterproof makeup, and sebum.",
    description: "Hypoallergenic cleansing oil that melts away blackheads and excess sebum without clogging pores. Tested safe for acne-prone skin.",
    ingredients: "Ethylhexyl Palmitate, Sorbeth-30 Tetraoleate, Sorbitan Sesquioleate, Caprylic/Capric Triglyceride, Butyl Avocadate, Fragrance, Helianthus Annuus (Sunflower) Seed Oil, Macadamia Ternifolia Seed Oil, Olea Europaea (Olive) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Vitis Vinifera (Grape) Seed Oil, Caprylyl Glycol, Ethylhexylglycerin, Curcuma Longa (Turmeric) Root Extract, Melia Azadirachta Flower Extract, Tocopherol, Houttuynia Cordata Extract.",
    usageInstructions: "Dispense 2-3 pumps onto dry hands and massage gently onto dry face. Emulsify with warm water, then rinse completely.",
    specifications: {
      "Pore Care": "Blackheads & Whiteheads Melter",
      "Non-Comedogenic": "Certified"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-14",
    name: "Moisturizing Cream with Ceramides & Hyaluronic",
    slug: "cerave-moisturizing-cream",
    sku: "CER-MC-340",
    brand: "CeraVe",
    category: "Skincare",
    subcategory: "Moisturizers",
    regularPrice: 2400,
    discountPrice: 2050,
    stockQuantity: 28,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 164,
    volumeOrSize: "340g Tub",
    countryOfOrigin: "United States",
    shortDescription: "Rich, non-greasy moisturizing cream provides 24-hour hydration with 3 essential ceramides and MVE Technology.",
    description: "Formulated with 3 essential ceramides (1, 3, 6-II) that work together to lock in skin's moisture and help restore your skin's protective barrier.",
    ingredients: "Aqua / Water / Eau, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Cetyl Alcohol, Ceteareth-20, Petrolatum, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Dimethicone.",
    usageInstructions: "Apply liberally to face and body as often as needed, or as directed by a physician.",
    specifications: {
      "Skin Type": "Dry to Very Dry Skin",
      "Hydration": "24-Hour Sustained Delivery"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-15",
    name: "Natural Rose Quartz Facial Roller & Gua Sha Set",
    slug: "natural-rose-quartz-roller-guasha",
    sku: "TLS-RQ-02",
    brand: "Beauty of Joseon",
    category: "Beauty Tools",
    subcategory: "Gua Sha & Rollers",
    regularPrice: 1200,
    discountPrice: 850,
    stockQuantity: 19,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 32,
    volumeOrSize: "2 Piece Set",
    countryOfOrigin: "South Korea",
    shortDescription: "100% natural Brazilian rose quartz dual-ended roller and heart-shaped gua sha for lymphatic drainage.",
    description: "Sculpt, de-puff, and relax facial muscle tension while enhancing skincare absorption. Crafted with authentic smooth rose quartz stones.",
    ingredients: "100% Brazilian Natural Rose Quartz Stone, Reinforced Zinc Alloy Frame.",
    usageInstructions: "Apply facial oil or serum first. Glide roller upward and outward along cheekbones, jawline, and forehead. Use gua sha along contour lines.",
    specifications: {
      "Material": "100% Authentic Rose Quartz",
      "Includes": "Facial Roller + Heart Gua Sha"
    },
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-16",
    name: "Water Sleeping Mask EX Night Hydrator",
    slug: "laneige-water-sleeping-mask-ex",
    sku: "LAN-WSM-70",
    brand: "Laneige",
    category: "Face Care",
    subcategory: "Sheet Masks",
    regularPrice: 2800,
    discountPrice: 2390,
    stockQuantity: 14,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 67,
    volumeOrSize: "70ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Overnight moisturizing mask featuring Sleeping Micro-Biome™ and enhanced Probiotics complex.",
    description: "Recharges tired, stressed skin overnight. Wake up to plump, revitalized, and crystal-clear complexion as if you had 8 hours of sound beauty sleep.",
    ingredients: "Water, Butylene Glycol, Glycerin, Trehalose, Methyl Trimethicone, 1,2-Hexanediol, Squalane, Phenyl Trimethicone, PCA Dimethicone, Caprylyl Methicone, Lactobacillus Ferment Lysate.",
    usageInstructions: "After washing your face at night, apply toner and emulsion right before going to bed. Dispense an appropriate amount and spread evenly across face.",
    specifications: {
      "Complex": "Probiotics Sleeping Micro-Biome™",
      "Effect": "Deep Overnight Glow"
    },
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-17",
    name: "Master Cuddle Pimple Master Patch (24 Patches)",
    slug: "cosrx-acne-pimple-master-patch",
    sku: "CSX-AP-24",
    brand: "COSRX",
    category: "Personal Care",
    subcategory: "Acne Patches",
    regularPrice: 450,
    discountPrice: 350,
    stockQuantity: 65,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.9,
    reviewCount: 220,
    volumeOrSize: "24 Patches (3 Sizes)",
    countryOfOrigin: "South Korea",
    shortDescription: "Hydrocolloid dressing patches extract impurities and create protective barrier to heal pimples overnight.",
    description: "Protects wounded or troubled area from getting worse and maintains humidity of skin to prevent further breakouts. Waterproof and breathable hydrocolloid material.",
    ingredients: "Cellulose Gum, Styrene Isoprene Styrene Block Copolymer, Polyisobutylene, Petroleum Resin, Polyurethane Film, Liquid Paraffin, Tetrakis Methane.",
    usageInstructions: "Cleanse the area around the problem spot. Select a patch larger than the spot and attach the patch to the spot.",
    specifications: {
      "Quantity": "24 Patches (7mm, 10mm, 12mm)",
      "Type": "Medical Grade Hydrocolloid"
    },
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-18",
    name: "AHA 30% + BHA 2% Peeling Solution (Blood Serum)",
    slug: "the-ordinary-aha-30-bha-2-peeling-solution",
    sku: "ORD-PS-30",
    brand: "The Ordinary",
    category: "Skincare",
    subcategory: "Exfoliators",
    regularPrice: 1550,
    discountPrice: 1290,
    stockQuantity: 26,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 145,
    volumeOrSize: "30ml",
    countryOfOrigin: "Canada",
    shortDescription: "10-minute exfoliating facial wash to help combat blemishes and boost skin radiance.",
    description: "Alpha hydroxy acids (AHA) exfoliate the skin's topmost surface for a brighter and more even appearance. Beta hydroxy acids (BHA) also exfoliate inside pores to clear congestion.",
    ingredients: "Glycolic Acid, Aqua (Water), Aloe Barbadensis Leaf Water, Sodium Hydroxide, Daucus Carota Sativa Extract, Propanediol, Cocamidopropyl Dimethylamine, Salicylic Acid, Potassium Citrate, Lactic Acid, Tartaric Acid, Citric Acid, Panthenol.",
    usageInstructions: "Clean face and wait for skin to dry. Apply evenly across face and neck using fingertips. Leave on for no more than 10 minutes. Rinse thoroughly with lukewarm water. Do not use more than twice per week.",
    specifications: {
      "Strength": "Advanced Acid Exfoliant",
      "Skin Warning": "Sunburn Alert - Use Sunscreen"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-19",
    name: "Fit Me Matte + Poreless Liquid Foundation - 128 Warm Nude",
    slug: "maybelline-fit-me-matte-poreless-128",
    sku: "MAY-FM-128",
    brand: "Maybelline New York",
    category: "Makeup",
    subcategory: "Foundations & BB Creams",
    regularPrice: 1350,
    discountPrice: 1050,
    stockQuantity: 21,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 98,
    volumeOrSize: "30ml",
    countryOfOrigin: "United States",
    shortDescription: "Ultra-blendable liquid foundation refines pores and leaves a natural seamless matte finish.",
    description: "Formulated with micro-powders to control shine and blur pores. Matches tone and texture for a velvety, shine-free natural finish throughout the day.",
    ingredients: "Aqua / Water / Eau, Cyclohexasiloxane, Nylon-12, Isododecane, Alcohol Denat., Cyclopentasiloxane, Peg-10 Dimethicone, Cetyl Peg/Ppg-10/1 Dimethicone, Peg-20, Polyglyceryl-4 Isostearate, Disteardimonium Hectorite.",
    usageInstructions: "Apply foundation onto skin and blend with fingertips, a foundation brush, or a makeup sponge.",
    specifications: {
      "Shade": "128 Warm Nude",
      "Coverage": "Medium Buildable",
      "Finish": "Poreless Matte"
    },
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-20",
    name: "Hyaluronic Acid Intensive Cream Deep Hydration",
    slug: "cosrx-hyaluronic-acid-intensive-cream",
    sku: "CSX-HA-100",
    brand: "COSRX",
    category: "Skincare",
    subcategory: "Moisturizers",
    regularPrice: 1850,
    discountPrice: 1490,
    stockQuantity: 18,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 48,
    volumeOrSize: "100g",
    countryOfOrigin: "South Korea",
    shortDescription: "Intensely hydrating cream with high concentration of sea buckthorn water and hyaluronic acid.",
    description: "Increases moisture content in your skin and seals it inside, protecting skin from further loss of hydration while balancing skin water and oil content.",
    ingredients: "Hippophae Rhamnoides Water, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, Betaine, Helianthus Annuus (Sunflower) Seed Oil, 1,2-Hexanediol, Cetearyl Alcohol, Cetearyl Olivate, Sorbitan Olivate, Sodium Hyaluronate.",
    usageInstructions: "Gently apply a proper amount of the cream to face, avoiding the eye and mouth area, after cleansing and toning.",
    specifications: {
      "Key Ingredient": "Sea Buckthorn Water & Hyaluronic Acid",
      "Texture": "Cloud Cream"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-21",
    name: "Revitalizing Hair Growth Scalp Serum",
    slug: "revitalizing-hair-growth-scalp-serum",
    sku: "HAR-RS-60",
    brand: "The Ordinary",
    category: "Hair Care",
    subcategory: "Hair Serums",
    regularPrice: 2200,
    discountPrice: 1790,
    stockQuantity: 15,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 39,
    volumeOrSize: "60ml",
    countryOfOrigin: "Canada",
    shortDescription: "Concentrated peptide formula designed to support hair density and scalp health.",
    description: "Features multi-peptide complexes (REDENSYL™, Procapil™, CAPIXYL™, BAICAPIL™) to increase blood circulation, nourish follicles, and promote visibly fuller hair.",
    ingredients: "Aqua (Water), Propanediol, Butylene Glycol, Glycerin, Caffeine, Biotinoyl Tripeptide-1, Acetyl Tetrapeptide-3, Larix Europaea Wood Extract, Glycine Max Germ Extract, Camellia Sinensis Leaf Extract.",
    usageInstructions: "Apply a few drops daily to clean, dry scalp once daily, ideally at bedtime. Massage into scalp thoroughly.",
    specifications: {
      "Target Concern": "Thinning Hair, Hair Fall",
      "Formula": "Lightweight, Non-Oily Scalp Drops"
    },
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-22",
    name: "Glow Deep Serum : Rice + Alpha-Arbutin",
    slug: "beauty-of-joseon-glow-deep-serum-rice-alpha-arbutin",
    sku: "BOJ-GDS-30",
    brand: "Beauty of Joseon",
    category: "Skincare",
    subcategory: "Serums & Ampoules",
    regularPrice: 1650,
    discountPrice: 1350,
    stockQuantity: 20,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 61,
    volumeOrSize: "30ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Formulated with 68% Rice Bran Water and 2% Alpha-Arbutin to effectively treat dark spots and uneven pigmentation.",
    description: "Traditional Korean Hanbang formula enriched with natural brightening agents. Fades acne marks, sun spots, and melasma without stinging.",
    ingredients: "Oryza Sativa (Rice) Bran Water, Aqua, Glycerin, Butylene Glycol, 1,2-Hexanediol, Dipropylene Glycol, Alpha-Arbutin, Niacinamide, Methyl Gluceth-20, Panthenol, Polyglycerin-3.",
    usageInstructions: "Apply 2-3 drops to clean skin after toner. Gently pat across cheeks and forehead for full absorption.",
    specifications: {
      "Key Actives": "Rice Bran 68% + Alpha-Arbutin 2%",
      "Target": "Hyperpigmentation & Freckles"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-23",
    name: "Velvet Rose & Oud Luxury Eau De Parfum",
    slug: "velvet-rose-oud-luxury-edp",
    sku: "FRG-RO-100",
    brand: "COSRX",
    category: "Fragrance",
    subcategory: "Eau De Parfum",
    regularPrice: 3800,
    discountPrice: 2990,
    stockQuantity: 10,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 28,
    volumeOrSize: "100ml",
    countryOfOrigin: "France",
    shortDescription: "Deep Damascus rose wrapped with smoky agarwood, clove, and decadent praline.",
    description: "An intoxicating oriental floral fragrance with impressive 12-hour longevity and projection. Crafted with genuine French perfume oils.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua, Geraniol, Linalool, Citronellol, Eugenol, Benzyl Benzoate.",
    usageInstructions: "Spray on pulse points: wrists, inner elbows, and base of neck from a distance of 15cm.",
    specifications: {
      "Concentration": "Eau De Parfum (20% Oil)",
      "Longevity": "10-12 Hours"
    },
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-24",
    name: "Shea Butter Ultra Nourishing Body Cream",
    slug: "shea-butter-ultra-nourishing-body-cream",
    sku: "BDY-SB-250",
    brand: "Bioderma",
    category: "Body Care",
    subcategory: "Body Lotions",
    regularPrice: 1900,
    discountPrice: 1550,
    stockQuantity: 25,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 37,
    volumeOrSize: "250ml",
    countryOfOrigin: "France",
    shortDescription: "Velvety botanical body butter infused with raw African shea butter and sweet almond oil.",
    description: "Provides soothing 48-hour comfort for dry skin, cracked elbows, and legs. Absorbs cleanly without sticky residue.",
    ingredients: "Aqua, Butyrospermum Parkii (Shea) Butter, Caprylic/Capric Triglyceride, Prunus Amygdalus Dulcis Oil, Glycerin, Glyceryl Stearate.",
    usageInstructions: "Massage all over body post-shower while skin is slightly damp.",
    specifications: {
      "Skin Benefit": "48h Barrier Nourishment",
      "Scent": "Soft Vanilla Almond"
    },
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-25",
    name: "Heartleaf 70% Daily Relief Lotion",
    slug: "anua-heartleaf-70-daily-relief-lotion",
    sku: "ANU-RL-200",
    brand: "Anua",
    category: "Skincare",
    subcategory: "Moisturizers",
    regularPrice: 2350,
    discountPrice: 1950,
    stockQuantity: 16,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 44,
    volumeOrSize: "200ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Lightweight soothing moisturizer enriched with 70% Heartleaf and triple hyaluronic acids.",
    description: "Offers cooling relief and non-pore-clogging hydration tailored specifically for tropical climates and combination-oily skins.",
    ingredients: "Houttuynia Cordata Extract (70%), Glycerin, 1,2-Hexanediol, Butylene Glycol, Caprylic/Capric Triglyceride, Squalane, Glyceryl Stearate.",
    usageInstructions: "Apply appropriate quantity following toner or serum morning and night.",
    specifications: {
      "Texture": "Emulsion Lotion",
      "Pore Friendly": "Yes"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-26",
    name: "Caffeine Solution 5% + EGCG Eye Serum",
    slug: "the-ordinary-caffeine-solution-5-egcg",
    sku: "ORD-CF-30",
    brand: "The Ordinary",
    category: "Face Care",
    subcategory: "Eye Creams",
    regularPrice: 1450,
    discountPrice: 1190,
    stockQuantity: 28,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.7,
    reviewCount: 91,
    volumeOrSize: "30ml",
    countryOfOrigin: "Canada",
    shortDescription: "Targeted solution to reduce puffiness and dark circles in the eye contour.",
    description: "Contains extremely high 5% concentration of caffeine complemented by epigallocatechin gallatyl glucoside (EGCG) purified from green tea leaves.",
    ingredients: "Aqua (Water), Caffeine, Maltodextrin, Glycerin, Propanediol, Epigallocatechin Gallatyl Glucoside, Gallyl Glucoside, Hyaluronic Acid, Oxidized Glutathione.",
    usageInstructions: "Massage a small amount onto the eye contour morning and night.",
    specifications: {
      "Target": "Under-Eye Bags, Dark Circles",
      "Packaging": "UV-Protective Amber Bottle"
    },
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-27",
    name: "Centella Asiatica Calming Sheet Mask (Pack of 5)",
    slug: "centella-asiatica-calming-sheet-mask",
    sku: "CSX-CM-05",
    brand: "COSRX",
    category: "Face Care",
    subcategory: "Sheet Masks",
    regularPrice: 950,
    discountPrice: 750,
    stockQuantity: 42,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 52,
    volumeOrSize: "5 x 25ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Ultra-thin cellulose sheet infused with concentrated Centella extract to instantly pacify angry breakouts.",
    description: "Instantly drops skin temperature, soothes inflammation, and locks in cooling moisture in just 15 minutes of pampering.",
    ingredients: "Water, Centella Asiatica Extract, Dipropylene Glycol, Glycerin, 1,2-Hexanediol, Betaine, Madecassoside, Asiaticoside.",
    usageInstructions: "Cleanse face, place mask evenly on face for 15-20 minutes. Remove and pat remaining essence.",
    specifications: {
      "Sheet Material": "100% Bio-Cellulose",
      "Pack Count": "5 Sheets"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-28",
    name: "Revitalash Precision Slanted Tweezers & Brow Scissors",
    slug: "precision-slanted-tweezers-brow-scissors",
    sku: "TLS-TW-01",
    brand: "Beauty of Joseon",
    category: "Beauty Tools",
    subcategory: "Brushes",
    regularPrice: 650,
    discountPrice: 480,
    stockQuantity: 30,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 19,
    volumeOrSize: "Set of 2",
    countryOfOrigin: "South Korea",
    shortDescription: "Professional medical-grade stainless steel tweezers with hand-filed slanted tips for immaculate brow shaping.",
    description: "Picks up even the finest hair from the root without snapping. Durable, rust-resistant, and ergonomic grip.",
    ingredients: "100% Japanese Stainless Steel with Matte Pink Coating.",
    usageInstructions: "Pluck stray hairs in the direction of natural hair growth following warm shower.",
    specifications: {
      "Finish": "Rose Matte Grip",
      "Precision": "Hand-Filed Calibrated Tip"
    },
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-29",
    name: "Salicylic Acid Daily Gentle Cleanser 150ml",
    slug: "cosrx-salicylic-acid-daily-gentle-cleanser",
    sku: "CSX-SA-150",
    brand: "COSRX",
    category: "Skincare",
    subcategory: "Cleansers",
    regularPrice: 1350,
    discountPrice: 1050,
    stockQuantity: 27,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 88,
    volumeOrSize: "150ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Foaming botanical cleanser containing 0.5% Salicylic acid to dissolve stubborn sebum and prevent pimples.",
    description: "Creates dense micro-bubbles that penetrate pores, sweep away dirt, makeup residues, and dead surface skin cells.",
    ingredients: "Water, Glycerin, Myristic Acid, Stearic Acid, Potassium Hydroxide, Lauric Acid, Butylene Glycol, Glycol Distearate, Polysorbate 80, Salicylic Acid (0.5%), Melaleuca Alternifolia (Tea Tree) Leaf Oil.",
    usageInstructions: "Lather a pea-sized amount with water in hands. Massage onto damp face and rinse thoroughly.",
    specifications: {
      "Salicylic Acid": "0.5%",
      "Target": "Acne Prone & Oily Skin"
    },
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-30",
    name: "Rice 72 White Jade Glowing Face Cream",
    slug: "rice-72-white-jade-glowing-face-cream",
    sku: "BOJ-RC-50",
    brand: "Beauty of Joseon",
    category: "Skincare",
    subcategory: "Moisturizers",
    regularPrice: 1850,
    discountPrice: 1450,
    stockQuantity: 21,
    stockStatus: "in_stock",
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 42,
    volumeOrSize: "50ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Formulated with 72% Korean Rice Bran Water to replenish vital lipids and impart a dewy porcelain glow.",
    description: "Inspired by ancient Korean royal court beauty rituals. Deeply replenishes moisture barriers while restoring softness and luminous clarity.",
    ingredients: "Oryza Sativa (Rice) Bran Water (72%), Butylene Glycol, Glycerin, Niacinamide, Macadamia Seed Oil, Sodium Hyaluronate.",
    usageInstructions: "Take a dime-sized amount and gently press into skin until fully absorbed.",
    specifications: {
      "Skin Glow": "Porcelain Luminous Finish",
      "Origin": "South Korea"
    },
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-31",
    name: "Ginseng Cleansing Oil Hanbang Formula",
    slug: "beauty-of-joseon-ginseng-cleansing-oil",
    sku: "BOJ-GCO-210",
    brand: "Beauty of Joseon",
    category: "Skincare",
    subcategory: "Cleansers",
    regularPrice: 2150,
    discountPrice: 1790,
    stockQuantity: 19,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 35,
    volumeOrSize: "210ml",
    countryOfOrigin: "South Korea",
    shortDescription: "Lightweight cleansing oil with 50% soybean oil and 0.1% ginseng seed oil to purify skin and unclog pores.",
    description: "Glycine soja oil gently dissolves makeup, sebum, and pollutants while the subtle herbal scent of ginseng calms the senses.",
    ingredients: "Glycine Soja (Soybean) Oil, Cetyl Ethylhexanoate, Sorbeth-30 Tetraoleate, Olea Europaea (Olive) Fruit Oil, Sorbitan Sesquioleate, Panax Ginseng Seed Oil.",
    usageInstructions: "Pump 1-2 times onto dry hands and massage gently over dry face. Rinse with warm water.",
    specifications: {
      "Key Oil": "Soybean 50% & Ginseng Seed",
      "Aroma": "Relaxing Natural Ginseng"
    },
    images: [
      "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "prod-32",
    name: "Lash Sensational Sky High Waterproof Mascara",
    slug: "maybelline-lash-sensational-sky-high",
    sku: "MAY-SH-01",
    brand: "Maybelline New York",
    category: "Makeup",
    subcategory: "Mascaras & Eyeliners",
    regularPrice: 1250,
    discountPrice: 990,
    stockQuantity: 33,
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isActive: true,
    rating: 4.8,
    reviewCount: 114,
    volumeOrSize: "7.2ml",
    countryOfOrigin: "United States",
    shortDescription: "Viral Sky High mascara delivers full limitless volume and authentic length with flex tower brush.",
    description: "Infused with bamboo extract and fibers for long, full lashes that never get weighed down. 100% waterproof and smudge-proof all day.",
    ingredients: "Isododecane, Cera Alba / Beeswax, Copernicia Cerifera Cera, Disteardimonium Hectorite, Aqua, Bambusa Vulgaris Extract.",
    usageInstructions: "Hold the flexible brush against lashes and extend from root to tip repeatedly until desired volume is achieved.",
    specifications: {
      "Waterproof": "Yes, 24h Wear",
      "Brush": "Flex Tower Silicone Wand"
    },
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "GLOW10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 1500,
    maxDiscount: 500,
    expiryDate: "2026-12-31",
    usageLimit: 1000,
    usedCount: 142,
    isActive: true
  },
  {
    id: "coup-2",
    code: "BEAUTY500",
    discountType: "fixed",
    discountValue: 500,
    minOrderAmount: 3500,
    expiryDate: "2026-12-31",
    usageLimit: 500,
    usedCount: 89,
    isActive: true
  },
  {
    id: "coup-3",
    code: "EID2026",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 2000,
    maxDiscount: 800,
    expiryDate: "2026-11-30",
    usageLimit: 200,
    usedCount: 76,
    isActive: true
  },
  {
    id: "coup-4",
    code: "WELCOME100",
    discountType: "fixed",
    discountValue: 100,
    minOrderAmount: 1000,
    expiryDate: "2026-12-31",
    usageLimit: 5000,
    usedCount: 420,
    isActive: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "GLOW-BD-91823",
    date: "2026-09-27 14:32",
    customerName: "Maria Afrin",
    customerEmail: "mariaafrin1106@gmail.com",
    customerPhone: "01789123456",
    district: "Dhaka",
    cityArea: "Dhanmondi, Road 27",
    fullAddress: "House 42, Flat 4B, Road 27, Dhanmondi, Dhaka-1209",
    deliveryNote: "Please call before arriving, building has guard at gate.",
    items: [
      {
        productId: "prod-1",
        productName: "Advanced Snail 96 Mucin Power Essence",
        productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
        price: 1390,
        quantity: 1,
        total: 1390
      },
      {
        productId: "prod-2",
        productName: "Relief Sun : Rice + Probiotics SPF50+ PA++++",
        productImage: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80",
        price: 1250,
        quantity: 1,
        total: 1250
      }
    ],
    subtotal: 2640,
    discount: 264,
    deliveryCharge: 0,
    total: 2376,
    paymentMethod: "bkash",
    paymentStatus: "paid",
    transactionId: "BK9A82X90L",
    status: "processing",
    trackingHistory: [
      { status: "pending", date: "2026-09-27 14:32", note: "Order placed online via bKash." },
      { status: "confirmed", date: "2026-09-27 15:10", note: "Payment verified, order confirmed by store team." },
      { status: "processing", date: "2026-09-28 10:00", note: "Items packed in protective bubble wrap at Banani hub." }
    ]
  },
  {
    id: "ord-2",
    orderNumber: "GLOW-BD-89410",
    date: "2026-09-25 18:20",
    customerName: "Sadia Rahman",
    customerEmail: "sadia.rahman@example.com",
    customerPhone: "01812345678",
    district: "Chittagong",
    cityArea: "Nasirabad Housing Society",
    fullAddress: "Plot 12, Road 4, Nasirabad, Chattogram",
    items: [
      {
        productId: "prod-3",
        productName: "Niacinamide 10% + Zinc 1% Oil Control Serum",
        productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80",
        price: 1100,
        quantity: 2,
        total: 2200
      }
    ],
    subtotal: 2200,
    discount: 100,
    deliveryCharge: 120,
    total: 2220,
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    status: "shipped",
    trackingHistory: [
      { status: "pending", date: "2026-09-25 18:20", note: "Order created with Cash on Delivery." },
      { status: "confirmed", date: "2026-09-26 09:30", note: "Customer confirmed order over phone call." },
      { status: "processing", date: "2026-09-26 14:00", note: "Handed over to Steadfast Courier." },
      { status: "shipped", date: "2026-09-27 11:20", note: "Dispatched from Dhaka Hub towards Chattogram." }
    ]
  },
  {
    id: "ord-3",
    orderNumber: "GLOW-BD-88102",
    date: "2026-09-20 11:15",
    customerName: "Farhana Islam",
    customerEmail: "farhana.i@example.com",
    customerPhone: "01999887766",
    district: "Dhaka",
    cityArea: "Uttara Sector 7",
    fullAddress: "House 18, Road 12, Sector 7, Uttara, Dhaka",
    items: [
      {
        productId: "prod-4",
        productName: "Lip Sleeping Mask (Berry) Overnight Repair",
        productImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80",
        price: 1550,
        quantity: 1,
        total: 1550
      },
      {
        productId: "prod-5",
        productName: "Heartleaf 77% Soothing Toner Calming Solution",
        productImage: "https://images.unsplash.com/photo-1608248597359-3e3a479ff73a?auto=format&fit=crop&w=400&q=80",
        price: 1850,
        quantity: 1,
        total: 1850
      }
    ],
    subtotal: 3400,
    discount: 500,
    deliveryCharge: 0,
    total: 2900,
    paymentMethod: "nagad",
    paymentStatus: "paid",
    transactionId: "NG8820X71",
    status: "delivered",
    trackingHistory: [
      { status: "pending", date: "2026-09-20 11:15", note: "Order initiated via Nagad." },
      { status: "confirmed", date: "2026-09-20 12:00", note: "Verified." },
      { status: "processing", date: "2026-09-20 16:00", note: "Packed." },
      { status: "shipped", date: "2026-09-21 09:00", note: "Out for delivery with Pathao Courier." },
      { status: "delivered", date: "2026-09-21 16:30", note: "Successfully received by Farhana Islam." }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    productName: "Advanced Snail 96 Mucin Power Essence",
    customerName: "Maria Afrin",
    customerEmail: "mariaafrin1106@gmail.com",
    rating: 5,
    title: "100% Authentic Korean Mucin! Cleared my acne scars",
    comment: "I checked the barcode and packaging, it's 100% authentic COSRX. In Dhaka weather it doesn't feel heavy at all. My skin barrier has repaired noticeably within 2 weeks!",
    date: "2026-09-24",
    isApproved: true,
    verifiedPurchase: true
  },
  {
    id: "rev-2",
    productId: "prod-2",
    productName: "Relief Sun : Rice + Probiotics SPF50+ PA++++",
    customerName: "Tanha Chowdhury",
    customerEmail: "tanha.c@example.com",
    rating: 5,
    title: "Best sunscreen in Bangladesh without white cast",
    comment: "Usually sunscreens make me sweat like crazy in Bangladesh humidity, but Beauty of Joseon Relief Sun is like applying a light moisturizer. Leaves a natural healthy glow!",
    date: "2026-09-22",
    isApproved: true,
    verifiedPurchase: true
  },
  {
    id: "rev-3",
    productId: "prod-3",
    productName: "Niacinamide 10% + Zinc 1% Oil Control Serum",
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat@example.com",
    rating: 5,
    title: "Must have for T-zone oiliness",
    comment: "Controls shine throughout the workday in office. Pores on my cheeks look much tighter. Delivery was super fast via RedX!",
    date: "2026-09-20",
    isApproved: true,
    verifiedPurchase: true
  },
  {
    id: "rev-4",
    productId: "prod-4",
    productName: "Lip Sleeping Mask (Berry) Overnight Repair",
    customerName: "Ayesha Siddiqua",
    customerEmail: "ayesha.s@example.com",
    rating: 5,
    title: "Softest lips ever the next morning",
    comment: "Smells deliciously like berries and heals chapped lips overnight. A little goes a very long way!",
    date: "2026-09-18",
    isApproved: true,
    verifiedPurchase: true
  }
];

export const BANGLADESH_DISTRICTS = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Cumilla", "Bogura", "Cox's Bazar", "Jessore", "Feni", "Brahmanbaria",
  "Tangail", "Faridpur", "Jamalpur", "Pabna", "Sirajganj", "Dinajpur", "Kushtia", "Narsingdi"
];

export const INITIAL_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: "admin-super-1",
    name: "GlowAura Owner (Super Admin)",
    email: "admin@glowaurabd.com",
    password: "password123",
    role: "super_admin",
    phone: "01711234567",
    permissions: ["all"],
    createdAt: "2026-09-01",
    isActive: true
  },
  {
    id: "admin-sub-1",
    name: "Tariqul Islam (Order & Dispatch Manager)",
    email: "subadmin@glowaurabd.com",
    password: "password123",
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
