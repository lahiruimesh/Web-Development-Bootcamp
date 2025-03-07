import React from 'react';
import Form from '../Components/form';
import Table from '../Components/table';

const userDetails = [
    {id : 1 , name : 'Saman'},
    {id : 2 , name : 'Kamal'},
    {id : 3 , name : 'Nimal'},
    {id : 4 , name : 'Sirimal'},
];
 

const User = () => {
    return(
        <div>
            <Form />
            <Table users={userDetails} />
        </div>
    );
};

export default User;