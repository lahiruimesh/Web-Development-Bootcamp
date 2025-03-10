import React from 'react';

function Card ({data}){
    return(
        <div className='cards'>
            {data.map((item) => (
                <div key={item.id} className="product-card">
                <img src={item.image} alt={item.title} className="product-image" />
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">${item.price}</p>
                <button className="product-button">Add to Cart</button>
              </div>
            ))};
           
        </div>
    );
};

export default Card;