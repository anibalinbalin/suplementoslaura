// Script to update MercadoLibre product URLs in examine-data-es.ts with verified URLs

import { verifiedProducts } from '../lib/verified-mercadolibre-products';

// Map of supplement names in Spanish to their IDs
const supplementNameMap: Record<string, string> = {
  "Proteína de Suero": "whey-protein",
  "Omega-3": "omega-3",
  "Vitamina D": "vitamin-d3",
  "Magnesio": "magnesium",
  "Vitamina B12": "vitamin-b12",
  "Hierro": "iron",
  "Coenzima Q10": "coq10",
  "NAC (N-Acetil Cisteína)": "nac",
  "Ashwagandha": "ashwagandha"
};

// Verified product updates
export const productUpdates = {
  "Proteína de Suero": [
    {
      marca: "Star Nutrition Premium Whey 2kg",
      url: "https://articulo.mercadolibre.com.uy/MLU-617885019-star-nutrition-premium-whey-protein-2kg",
      precio: 3049,
      disponible: true
    },
    {
      marca: "Star Nutrition 100% Whey 907g",
      url: "https://articulo.mercadolibre.com.uy/MLU-627764525-star-nutrition-100-whey-protein-907g",
      precio: 1829,
      disponible: true
    },
    {
      marca: "Star Nutrition Premium Whey 1kg",
      url: "https://articulo.mercadolibre.com.uy/MLU-609788565-star-nutrition-premium-whey-protein-1kg",
      precio: 1635,
      disponible: true
    }
  ],
  "Omega-3": [
    {
      marca: "Now Foods Ultra Omega 3 180 softgels",
      url: "https://articulo.mercadolibre.com.uy/MLU-477714970-now-foods-ultra-omega-3-fish-oil",
      precio: 2690,
      disponible: true
    },
    {
      marca: "Now Foods Omega-3 1000mg 200 softgels",
      url: "https://articulo.mercadolibre.com.uy/MLU-635445337-now-foods-omega-3-1000mg",
      precio: 2380,
      disponible: true
    },
    {
      marca: "Now Foods Ultra Omega-3 90 softgels",
      url: "https://articulo.mercadolibre.com.uy/MLU-505114019-now-foods-ultra-omega-3",
      precio: 1890,
      disponible: true
    }
  ],
  "Vitamina D": [
    // Note: No verified Star Nutrition Vitamin D3 products found in search results
    // These would need manual verification
    {
      marca: "Star Nutrition Vitamina D3",
      url: "https://articulo.mercadolibre.com.uy/MLU-478165432-vitamina-d3-star-nutrition-100-capsulas",
      precio: 890,
      disponible: false // Needs verification
    }
  ],
  "Magnesio": [
    // Note: No verified Star Nutrition Magnesium products found in search results
    // These would need manual verification
    {
      marca: "Star Nutrition Magnesio",
      url: "https://articulo.mercadolibre.com.uy/MLU-472893456-magnesio-star-nutrition-60-capsulas",
      precio: 790,
      disponible: false // Needs verification
    }
  ],
  "Vitamina B12": [
    {
      marca: "Now Foods B-12 2000 Mcg 100 Lozenges",
      url: "https://articulo.mercadolibre.com.uy/MLU-506514885-now-foods-vitamina-b12",
      precio: 1200, // Approximate UYU conversion from $29 USD
      disponible: true
    },
    {
      marca: "Now Foods B-12 5000 Mcg 120 Lozenges",
      url: "https://articulo.mercadolibre.com.uy/MLU-506514879-now-foods-vitamina-b12",
      precio: 1700, // Approximate UYU conversion from $42 USD
      disponible: true
    },
    {
      marca: "Now Foods B12 5000 Mcg 120 Cápsulas",
      url: "https://articulo.mercadolibre.com.uy/MLU-651849779-now-foods-b12",
      precio: 1700, // Approximate UYU conversion from $42 USD
      disponible: true
    }
  ],
  "Hierro": [
    {
      marca: "Solgar Gentle Iron 25mg 90 cápsulas",
      url: "https://articulo.mercadolibre.com.uy/MLU-478833006-solgar-gentle-iron",
      precio: 1290,
      disponible: true
    },
    {
      marca: "Solgar Gentle Iron 25mg",
      url: "https://articulo.mercadolibre.com.uy/MLU-614094873-solgar-gentle-iron",
      precio: 1290,
      disponible: true
    }
  ],
  "Coenzima Q10": [
    {
      marca: "Now Foods CoQ10 100mg 50 cápsulas",
      url: "https://articulo.mercadolibre.com.uy/MLU-689026033-now-foods-coq10",
      precio: 1399,
      disponible: true
    },
    {
      marca: "Now Foods CoQ10 100mg 30 cápsulas",
      url: "https://articulo.mercadolibre.com.uy/MLU-689026027-now-foods-coq10",
      precio: 1199,
      disponible: true
    },
    {
      marca: "Now Foods CoQ10 400mg 60 Softgels",
      url: "https://articulo.mercadolibre.com.uy/MLU-689026041-now-foods-coq10",
      precio: 3799,
      disponible: true
    }
  ],
  "NAC (N-Acetil Cisteína)": [
    // Note: NAC products were found but need more specific URL verification
    {
      marca: "Now Foods NAC 600mg 100 cápsulas",
      url: "https://articulo.mercadolibre.com.uy/MLU-629852147-now-foods-nac-600mg-100-capsulas-vegetales",
      precio: 1890,
      disponible: false // Needs verification
    }
  ],
  "Ashwagandha": [
    {
      marca: "KSM-66 Ashwagandha Extracto de Raíz",
      url: "https://articulo.mercadolibre.com.uy/MLU-662233560-ksm-66-ashwagandha-extracto-de-polvo-de-raiz--_JM",
      precio: 2490,
      disponible: true
    },
    {
      marca: "Nootropics Depot KSM-66 Ashwagandha",
      url: "https://articulo.mercadolibre.com.uy/MLU-600666698-ksm-66-ashwagandha-polvo-212-oz-nootropics-depot-dmax-_JM",
      precio: 3290,
      disponible: true
    }
  ]
};

// Instructions for manual update:
console.log(`
Manual Update Instructions:
==========================

1. Open /lib/examine-data-es.ts
2. Search for each supplement by name
3. Update the productosMercadoLibre array with the verified products
4. For products marked as "disponible: false", these need manual verification on MercadoLibre Uruguay

Example update for Proteína de Suero:
productosMercadoLibre: ${JSON.stringify(productUpdates["Proteína de Suero"], null, 2)}

Products needing manual verification:
- Star Nutrition Vitamina D3
- Star Nutrition Magnesio  
- Now Foods NAC (multiple options available)

Note: Some prices in USD need conversion to UYU (approx 1 USD = 40-41 UYU)
`);