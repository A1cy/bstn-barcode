import axios from "axios";

const API_ENDPOINT = `https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/related_products_categories/`;

const apiConfig = {
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.API_KEY,
    lang: "en",
    currency: "SAR",
    country: "SA",
  },
};

export default async function handler(req, res) {
  const { uuid } = req.query;

  // Check if UUID is provided
  if (!uuid) {
    return res.status(400).json({ error: "UUID is required" });
  }

  try {
    const { data: { data: relatedProducts = [] } = {} } = await axios.get(
      `${API_ENDPOINT}${uuid}`,
      apiConfig
    );

    // Extract the SKU from the first variant of each product
    relatedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variant = product.variants[0];
      }
    });

    console.log("Processed Related Products:", relatedProducts); // Logging to check the data

    res.status(200).json({ data: relatedProducts });
  } catch (error) {
    console.error("Error fetching related products:", error.message);
    res.status(500).json({ error: "Failed to fetch related products" });
  }
}
