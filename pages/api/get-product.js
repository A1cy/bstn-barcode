import axios from 'axios';

export default async function handler(req, res) {
  const { sku } = req.body;
  const url = "https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/search-items-ajax";

  try {
    const response = await axios.post(url, { searchText: sku }, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=',
        'lang': 'en',
        'currency': 'SAR',
        'country': 'SA'
      }
    });

    // Check if the API returned any items
    if (
      response.data &&
      response.data.data &&
      response.data.data.items &&
      response.data.data.items.length > 0
    ) {
      const product = response.data.data.items[0];
      const { slug, item_category_slug: category, uuid } = product; // Include uuid

      // Directly return the product data
      res.status(200).json({ slug, category, uuid }); // Include uuid in the response
    } else {
      // Throw error if no items found
      throw new Error("Product not found");
    }
  } catch (error) {
    // Log detailed error information
    console.error("Error in get-product:", error.response ? error.response.data : error.message);
    
    // Respond with the specific error details
    res.status(500).json({
      error: "Error fetching product detail",
      details: error.response ? error.response.data : error.message
    });
  }
}
