import axios from 'axios';

export default async function handler(req, res) {
    const { uuid } = req.query;
    console.log('Received UUID:', uuid);

    try {
        const relatedResponse = await axios.get(
            `https://staging-ksa-v2.build-station.com/build-station-apis-v2/api/items/related_products_categories/${uuid}`,
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

        console.log('Related Response:', relatedResponse.data);

        const relatedProducts = relatedResponse.data.data;
        if (!relatedProducts) {
            throw new Error("No related products found");
        }
        res.status(200).json(relatedProducts);
    } catch (error) {
        console.error("Error in get-related-products:", error.message);
        res.status(500).json({ error: 'Error fetching related products' });
    }
}
