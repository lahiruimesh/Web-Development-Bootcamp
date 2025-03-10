import React from 'react';

function Card1 (props){
    return(
        <div>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </div>
    );
};

function Card2 (props){
    return(
        <div>
            <img src={props.image} alt={props.title} />
        </div>
    );
};

export { Card1, Card2 };