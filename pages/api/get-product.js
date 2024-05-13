import FormData from 'form-data';
import axios from 'axios';

export default async function handler(req, res) {
  const { sku } = req.body;

  const formData = new FormData();
  formData.append('searchText', sku);

  try {
    const searchResponse = await axios.post(
      "https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/search-items-ajax",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'apikey': "Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=",
          'lang': "en",
          'currency': "SAR",
          'country': "SA",
        },
      }
    );

    if (searchResponse.data && searchResponse.data.data && searchResponse.data.data.items && searchResponse.data.data.items.length > 0) {
      const product = searchResponse.data.data.items[0];
      const { slug, item_category_slug: category, uuid } = product;
      res.status(200).json({ slug, category, uuid });
    } else {
      res.status(500).json({ message: "Failed to fetch data from external API", details: searchResponse.data });
    }
  } catch (error) {
    console.error("Error in get-product:", error.message, error.stack);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
