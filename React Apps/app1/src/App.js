import React from "react";
import ProductCard1 from "./Components/ProductCard1";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ProductCard1 
        image="https://th.bing.com/th/id/OIP.QBT7_lDtvo7bcXF-adTaBQHaHa?w=183&h=183&c=7&r=0&o=5&pid=1.7"
        title="Awesome Product"
        price="29.99"
      />
    </div>
  );
}

export default App;
