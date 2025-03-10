import React from 'react';
import { useNavigate } from "react-router-dom";

const Card = () =>{
    const navigate = useNavigate();

    const Data = [
        {
            id: 1,
            title: "Title 01",
            price: "$12",
            image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain",
            description: "This is 1st description"
        },
    
        {
            id: 2,
            title: "Title 02",
            price: "$56",
            image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain",
            description: "This is 2nd description"
        },
    
        {
            id: 3,
            title: "Title 03",
            price: "$34",
            image: "https://th.bing.com/th/id/OIP.kcpUQ1-yUtQcxsKDHM7WegAAAA?rs=1&pid=ImgDetMain",
            description: "This is 1st description"
        },
    ];
    
    return(
        <div className='cards'>
            
            {Data.map((item) => (
                <div key={item.id} className="product-card">
                <img src={item.image} alt={item.title} className="product-image" />
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">${item.price}</p>
                <button className="product-button" onClick={() => navigate(`/product/${item.id}`)}>
                     View Description
                </button>
                </div>
            ))};
           
        </div>
    );
};

export default Card;