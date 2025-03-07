import React, { useState } from 'react';

const Form = ({ props }) => {

    const [id, setId] = useState(0);
    const [name, setName] = useState('');

    return(
        <div>
            <h3>Details Form ...</h3>
            <form action="">
                <label For="id">id</label>
                <input type="number" id="id" name="id" value={id} onChange={e => setId(e.target.value)} />
                <label For="name">name</label>
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                <button>Add</button>
            </form>
        </div>
    );
};
 
export default Form;