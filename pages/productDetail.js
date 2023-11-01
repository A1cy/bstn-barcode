import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

import HeaderContentContainer from "../components/HeaderContentContainer";
import ProductDetail from "../components/ProductDetail";
import AvailabilityStock from "../components/AvailabilityStock";
import DescriptionSpecification from "../components/DescriptionSpecification";
import ProductSlider from "../components/ProductSlider";
import Footer from "../components/Footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetailPage() {
  const router = useRouter();
  const { sku, title } = router.query;
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [uuid, setUUID] = useState(null); // Define a state to store uuid
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sku) {
      axios
        .post("/api/get-product", { sku })
        .then((response) => {
          const { slug, category, uuid } = response.data;
          setUUID(uuid); // Store the uuid in the state
          if (response.data && response.data.slug && response.data.category) {
            return axios.get(
              `/api/get-product-detail?slug=${response.data.slug}&category=${response.data.category}`
            );
          } else {
            throw new Error("Product not found");
          }
        })
        .then((detailResponse) => {
          setProductData(detailResponse.data);

          // Fetch related products once we have the product data
          if (detailResponse.data && detailResponse.data.uuid) {
            return axios.get(
              `/api/get-related-products?uuid=${detailResponse.data.uuid}`
            );
          }
        })
        .then((relatedResponse) => {
          if (relatedResponse && relatedResponse.data) {
            setRelatedProducts(relatedResponse.data);
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch product details");
        });
    }
  }, [sku]);

  useEffect(() => {
    if (productData && productData.uuid) {
      // Fetch related products using the product UUID
      axios
        .get(`/api/get-related-product?uuid=${productData.uuid}`)
        .then((response) => {
          setRelatedProducts(response.data.data || []);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [productData]);

  if (error) {
    return (
      <div className="container-home">
        <header className="home-header">
          <Image
            src="/pics/BuildStation-logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="logo"
            layout="responsive"
          />
        </header>
        <div id="welcome">
          <main className="home-main">

            <i className="barcode-icon-error"></i>
            <br />
            <p className="error-message">{error}</p>
            <button
              type="button"
              className="scan-button"
              onClick={(e) => {
                e.preventDefault();
                router.push("/home");
              }}
            >
              Try Again
            </button>
          </main>
        </div>
      </div>
     
    );
  }

  if (!productData) {
    return (
     
       <div className="container-home">
       <header className="home-header">
         <Image
           src="/pics/BuildStation-logo.png"
           alt="Logo"
           width={150}
           height={150}
           className="logo"
           layout="responsive"
         />
       </header>
       <div id="welcome">
         <main className="home-main">
       

           <i className="barcode-icon"></i>
           <br />
           <div className="spinner"></div>
          {/* <p>Loading product Details: {title}...</p> */}
          <p>{title ? title : "Loading Product Details..."} | <b> SKU: {sku} </b> </p>
         
         </main>
       </div>
     </div>
    );
  }

  return (
    <div>
      <HeaderContentContainer />
      {/* <h1>Product Page for SKU: {sku}</h1>   */}
      <div className="header-content-container">
        <ProductDetail data={productData} />
        <AvailabilityStock data={productData} />
        <DescriptionSpecification data={productData} />
      </div>
      <ProductSlider title="Related Products" uuid={uuid} />
      {/* <ProductSlider title="Cross Selling Products" uuid={uuid} /> */}
      <Footer />
    </div>
  );
}
