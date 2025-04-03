const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://lahiru:x4i2d4D3Y3g8tVyA@myform.6zktm.mongodb.net/?retryWrites=true&w=majority&appName=myform';

const connect = async () => {
    try{
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to mongoDB');
    }catch(error){
        console.log('mongoDB error:', error);
    }
};

connect();


const server = app.listen(5000, 'localhost', () => {
    console.log('Server is running on http://localhost:5000');
});

app.use('/api', router);