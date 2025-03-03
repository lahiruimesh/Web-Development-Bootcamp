import react from 'react';

function ProductCard2(props){
    return (
        <div className="max-w-xs bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 p-4">
          <img src={props.image} alt={props.title} className="w-full h-40 object-cover rounded-lg" />
          <div className="mt-3">
            <h3 className="text-lg font-semibold">{props.title}</h3>
            <p className="text-gray-600 text-sm mt-1">${props.price}</p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      );
};

export default ProductCard2;