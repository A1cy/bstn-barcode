import axios from 'axios';

export default async function handler(req, res) {
    const { slug, category } = req.query;

    try {
        const detailResponse = await axios.get(
            `https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/${slug}?category=${category}`,
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

        console.log("Detail Response:", detailResponse.data);

        // Sending the entire data structure to ensure we have the uuid.
        res.status(200).json(detailResponse.data.data);
    } catch (error) {
      console.error("Error in get-product-detail:", error.message);
      res.status(500).json({ error: 'Error fetching product details' });
    }
}
