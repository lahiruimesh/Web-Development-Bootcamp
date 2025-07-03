import react from 'react';

const Person = (props) => {
    return(
        <div>
            <h1>{ props.name }</h1>
            <p>Age : { props.age }</p>
            <p>Gender : { props.gender }</p>
            <p>Telephone No : { props.phone }</p>
        </div>
    );
}

export default Person;