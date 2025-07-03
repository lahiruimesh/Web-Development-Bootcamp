import react from 'react';

const Greeting = () => {

    const date = new Date();
    const hours = date.getHours();
    
    
    return (
        <div>
            <h1>{ date + " " +hours }</h1>
        </div>
    )
}

export default Greeting;