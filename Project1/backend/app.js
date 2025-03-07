const express = require('express');
const cors = require('cors');
const controller = require('./contoller');

const app = express();

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());


app.get('/users', (req, res) => {
    controller.getUserDetails(
        userDetails => {
            res.send(userDetails);
        });
});

app.get('/user', (req, res) => {
    const id = req.query.id;
    controller.getUserById(
        id, user => {res.send(user);
        });
});

module.exports = app;