import axios from 'axios';

export default async function handler(req, res) {
    const { sku } = req.body;

    try {
        const searchResponse = await axios.post(
            'https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/search-items-ajax',
            { searchText: sku },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'Ujf4ZHdP3zHrmfsvAETpUmvK7BPS/jU/YKCp+VXaF1A=',
                    'lang': 'en',
                    'currency': 'SAR',
                    'country': 'SA'
                }
            }
        );
        console.log("Search Response:", searchResponse.data);

        if (searchResponse.data && searchResponse.data.data && searchResponse.data.data.items && searchResponse.data.data.items[0]) {
            const product = searchResponse.data.data.items[0];
            const { slug, item_category_slug: category } = product;

            // Directly return the product data
            res.status(200).json({ slug, category });
        } else {
            throw new Error("Product not found");
        }

    } catch (error) {
      console.error("Error in get-product-detail:", error.message);
      res.status(500).json({ error: 'Error fetching product detail' });
  }
  
}
