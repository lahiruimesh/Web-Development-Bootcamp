import React from 'react';
import { useState } from 'react';

const New = () => {

    const [count, setCount] = useState(0);


    function increase(){
        setCount(count + 1);
    }
    function descreate(){
        setCount(count - 1);
    }
    

    return(
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increase}>+</button>
            <button onClick={descreate}>-</button>
        </div>
    );
};

export default New;