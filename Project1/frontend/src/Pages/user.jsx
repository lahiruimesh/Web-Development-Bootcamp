import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react'
import Form from '../Components/form';
import Table from '../Components/table';
import New from '../Components/new';

const User = () => {

    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
       getUsers();
    }, []);

    /*-------------- get users -----------------*/ 

    const getUsers = () => {
        axios.get('http://localhost:5000/api/getuser')
        .then(response => {
            setUsers(response?.data?.response || []);
        })
        .catch(error => {
            console.error('Error fetching users: ', error);
        });
    }

    /*-------------- set user -----------------*/

    const addUsers = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
        }
        axios.post('http://localhost:5000/api/createuser', payload)
        .then(response => {
            getUsers();
            setSubmitted(false);
        })
        .catch(error => {
            console.error('Error fetching users: ', error);
        });
    }

    /*---------------------- update users --------------------------*/

    return(
        <div>
            <Form 
            addUsers = {addUsers}
            submitted={submitted}
            />
            <Table users={users} />
            <a href="/new">New</a>
        </div>
    );
};

export default User;