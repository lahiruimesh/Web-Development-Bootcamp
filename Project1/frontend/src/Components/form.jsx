import React, { useState, useEffect } from 'react';

const Form = ({ addUsers, submitted }) => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        if(!submitted){
            setId(0);
            setName('');
        }
    }, [submitted]);

    return(
        <div>
            <h3>Details Form ...</h3>
            <form>
                <label For="id">id</label>
                <input type="number" id="id" name="id" value={id} onChange={e => setId(e.target.value)} />
                <label For="name">name</label>
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => addUsers({id:id, name:name})}>Add</button>
            </form>
        </div>
    );
};
 
export default Form;