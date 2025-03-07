const express = require('express');
const cors = require('cors');
const app = require('./app');
const app = express();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const uri = ;

const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('Connected to mongoDB');
    }catch(error){
        console.log('mongoDB error:', error);
    }
};

connect();


const server = app.listen(5000, 'localhost', () => {
    console.log('Server is running on http://localhost:5000');
});