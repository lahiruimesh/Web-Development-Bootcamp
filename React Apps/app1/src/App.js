import React from "react";
import ProductCard1 from "./Components/ProductCard1";
import ProductCard2 from "./Components/ProductCard2";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <ProductCard1 
        image="https://th.bing.com/th/id/OIP.QBT7_lDtvo7bcXF-adTaBQHaHa?w=183&h=183&c=7&r=0&o=5&pid=1.7"
        title="Product Card 1 "
        price="29.99"
      />

      
      <ProductCard2
       image="https://th.bing.com/th/id/OIP.QBT7_lDtvo7bcXF-adTaBQHaHa?w=183&h=183&c=7&r=0&o=5&pid=1.7"
       title="Product Card 2"
       price="29.99"
      />
    </div>
  );
}

export default App;
