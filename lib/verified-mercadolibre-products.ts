// Verified Mercado Libre Uruguay Product URLs
// Last updated: 2025-01-13

export interface MercadoLibreProduct {
  supplementId: string;
  brand: string;
  productName: string;
  url: string;
  mluId: string;
  price?: number; // in UYU
  currency?: string;
  verified: boolean;
  lastChecked: string;
}

export const verifiedProducts: MercadoLibreProduct[] = [
  // PROTEÍNA DE SUERO / WHEY PROTEIN
  {
    supplementId: "whey-protein",
    brand: "Star Nutrition",
    productName: "Premium Whey Protein 2kg",
    url: "https://articulo.mercadolibre.com.uy/MLU-617885019",
    mluId: "MLU-617885019",
    price: 3049,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "whey-protein",
    brand: "Star Nutrition",
    productName: "100% Whey Protein 907g",
    url: "https://articulo.mercadolibre.com.uy/MLU-627764525",
    mluId: "MLU-627764525",
    price: 1829,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "whey-protein",
    brand: "Star Nutrition",
    productName: "Whey Protein 2lbs (907g)",
    url: "https://articulo.mercadolibre.com.uy/MLU-478039206",
    mluId: "MLU-478039206",
    price: 1640,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "whey-protein",
    brand: "Star Nutrition",
    productName: "Premium Whey Protein 1kg",
    url: "https://articulo.mercadolibre.com.uy/MLU-609788565",
    mluId: "MLU-609788565",
    price: 1635,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // OMEGA 3
  {
    supplementId: "omega-3",
    brand: "Now Foods",
    productName: "Ultra Omega 3 Fish Oil 180 softgels",
    url: "https://articulo.mercadolibre.com.uy/MLU-477714970",
    mluId: "MLU-477714970",
    price: 2690,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "omega-3",
    brand: "Now Foods",
    productName: "Ultra Omega-3 500 EPA / 250 DHA 90 softgels",
    url: "https://articulo.mercadolibre.com.uy/MLU-505114019",
    mluId: "MLU-505114019",
    price: 1890,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "omega-3",
    brand: "Now Foods",
    productName: "Omega-3 1000mg 200 softgels",
    url: "https://articulo.mercadolibre.com.uy/MLU-635445337",
    mluId: "MLU-635445337",
    price: 2380,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // VITAMINA B12
  {
    supplementId: "vitamin-b12",
    brand: "Now Foods",
    productName: "Vitamina B-12 2000 Mcg 100 Lozenges",
    url: "https://articulo.mercadolibre.com.uy/MLU-506514885",
    mluId: "MLU-506514885",
    price: 29,
    currency: "USD",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "vitamin-b12",
    brand: "Now Foods",
    productName: "Vitamina B-12 5000 Mcg 120 Lozenges",
    url: "https://articulo.mercadolibre.com.uy/MLU-506514879",
    mluId: "MLU-506514879",
    price: 42,
    currency: "USD",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "vitamin-b12",
    brand: "Now Foods",
    productName: "B12 5000 Mcg 120 Cápsulas",
    url: "https://articulo.mercadolibre.com.uy/MLU-651849779",
    mluId: "MLU-651849779",
    price: 42,
    currency: "USD",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // HIERRO / IRON
  {
    supplementId: "iron",
    brand: "Solgar",
    productName: "Gentle Iron 25mg 90 vegetable capsules",
    url: "https://articulo.mercadolibre.com.uy/MLU-478833006",
    mluId: "MLU-478833006",
    price: 1290,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "iron",
    brand: "Solgar",
    productName: "Gentle Iron 25mg",
    url: "https://articulo.mercadolibre.com.uy/MLU-614094873",
    mluId: "MLU-614094873",
    price: 1290,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // COENZIMA Q10 / COQ10
  {
    supplementId: "coq10",
    brand: "Now Foods",
    productName: "CoQ10 100mg 50 Veggie Capsules",
    url: "https://articulo.mercadolibre.com.uy/MLU-689026033",
    mluId: "MLU-689026033",
    price: 1399,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "coq10",
    brand: "Now Foods",
    productName: "CoQ10 100mg 30 Veggie Capsules",
    url: "https://articulo.mercadolibre.com.uy/MLU-689026027",
    mluId: "MLU-689026027",
    price: 1199,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "coq10",
    brand: "Now Foods",
    productName: "CoQ10 400mg 60 Softgels",
    url: "https://articulo.mercadolibre.com.uy/MLU-689026041",
    mluId: "MLU-689026041",
    price: 3799,
    currency: "UYU",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // ASHWAGANDHA
  {
    supplementId: "ashwagandha",
    brand: "KSM-66",
    productName: "KSM-66 Ashwagandha Root Extract Powder",
    url: "https://articulo.mercadolibre.com.uy/MLU-662233560-ksm-66-ashwagandha-extracto-de-polvo-de-raiz--_JM",
    mluId: "MLU-662233560",
    verified: true,
    lastChecked: "2025-01-13"
  },
  {
    supplementId: "ashwagandha",
    brand: "Nootropics Depot",
    productName: "KSM-66 Ashwagandha Powder 2.12 oz",
    url: "https://articulo.mercadolibre.com.uy/MLU-600666698-ksm-66-ashwagandha-polvo-212-oz-nootropics-depot-dmax-_JM",
    mluId: "MLU-600666698",
    verified: true,
    lastChecked: "2025-01-13"
  },

  // Note: Some products like Vitamina D3, Magnesio, and NAC from specific brands 
  // were not found with verified MLU codes in the search results.
  // These would need manual verification on the MercadoLibre Uruguay website.
];

// Helper function to get products by supplement ID
export function getProductsBySupplement(supplementId: string): MercadoLibreProduct[] {
  return verifiedProducts.filter(product => product.supplementId === supplementId);
}

// Helper function to get products by brand
export function getProductsByBrand(brand: string): MercadoLibreProduct[] {
  return verifiedProducts.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  );
}

// Helper function to build full URL from MLU ID
export function buildMercadoLibreUrl(mluId: string): string {
  return `https://articulo.mercadolibre.com.uy/${mluId}`;
}