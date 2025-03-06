import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return(
        <div>
            <h1>This is the HomePage</h1>
            <button onClick={() => navigate('/user')}>Use</button>
        </div>
    );
};

export default HomePage;