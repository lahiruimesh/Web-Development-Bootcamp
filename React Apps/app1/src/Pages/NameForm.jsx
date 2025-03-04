import React from 'react';

function Form(){
    return(
        
        <div className="mb-4">
            <Form>
            <h2>Data Form</h2>
            <div className="form-group">
                <label for="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" required/>
            </div>
            </Form>
            </div>
    );
}

export default Form;