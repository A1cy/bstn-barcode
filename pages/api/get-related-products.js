import axios from 'axios';

export default async function handler(req, res) {
    const { uuid } = req.query;
    console.log('Received UUID:', uuid);

    try {
        const relatedProductsResponse = await axios.get(
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
        const relatedProducts = relatedProductsResponse.data.data;

        // Extract the SKU from the first variant of each product
        relatedProducts.forEach(product => {
            if (product.variants && product.variants.length > 0) {
                product.variant = product.variants[0];
            }
        });

        console.log("Processed Related Products:", relatedProducts);  // Logging to check the data

        res.status(200).json({ data: relatedProducts });
    } catch (error) {
        console.error("Error fetching related products in API Handler:", error);
        res.status(500).json({ error: 'Error fetching related products in API Handler' });
    }
}
