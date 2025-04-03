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





app.get('/getuser', (req, res) => {
    controller.getUsers((req, res, next) => {
        res.send();
    });
});

app.post('/createuser', (req, res) => {
    controller.addUsers(req.body, (callback) => {
        res.send();
    });
});

app.post('/updateuser', (req, res) => {
    controller.updateUsers(req.body, (callback) => {
        res.send(callback);
    });
});

app.post('/deleteuser', (req, res) => {
    controller.deleteUsers(req.body, (callback) => {
        res.send(callback);
    });
});



module.exports = app;