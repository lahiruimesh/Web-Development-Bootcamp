const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./Models/Employee'); // Correct import

const app = express();
app.use(express.json());
app.use(cors()); // Corrected usage

mongoose.connect('mongodb+srv://Lahiru:x4i2d4D3Y3g8tVyA@myform.6zktm.mongodb.net/myform?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request:', req.body); // Debugging

    EmployeeModel.findOne({ email })
    .then(user => {
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.password !== password) {
            return res.json({ success: false, message: 'Invalid password' });
        }
        console.log('Login Success:', user); // Debugging
        res.json({ success: true, user });
    })
    .catch(error => {
        console.error('Login Error:', error);
        res.json({ success: false, error });
    });
});


// Signup Route
app.post('/signup', (req, res) => {
    console.log('Received Signup Data:', req.body); // Debugging

    EmployeeModel.create(req.body)
    .then(employees => {
        console.log('User Registered:', employees); // Debugging
        res.json({ success: true, employees });
    })
    .catch(error => {
        console.error('Signup Error:', error);
        res.json({ success: false, error });
    });
});


// Start Server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
