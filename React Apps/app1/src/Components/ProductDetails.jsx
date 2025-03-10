import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const Data = [
    { id: 1, title: "Title 01", price: "$12", image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain", description: "This is 1st description" },
    { id: 2, title: "Title 02", price: "$56", image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain", description: "This is 2nd description" },
    { id: 3, title: "Title 03", price: "$34", image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain", description: "This is 3rd description" },
  ];

  const product = Data.find((item) => item.id === parseInt(id));

  return product ? (
    <div className="product-details">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2>{product.title}</h2>
      <p className="product-price">{product.price}</p>
      <p className="product-description">{product.description}</p>
    </div>
  ) : (
    <h2>Product Not Found</h2>
  );
};

export default ProductDetails;
