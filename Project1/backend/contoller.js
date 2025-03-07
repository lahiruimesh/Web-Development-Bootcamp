//const { response } = require('express');
const User = require('./model');

const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({message: error})
        });
};

const addUsers = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
    });
    user.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({message: error})
        });
};

const updateUsers = (req, res, next) => {
    const { id, name } = req.body;
    User.updateOne({id: id}, {$set: {name: name} })
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({message: error})
    });
};

const deleteUsers = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({id: id})
    .then(response => {
        res.json({response})
    })
    .catch(error => {
        res.json({message: error})
    });
};

module.exports = { getUsers, addUsers, updateUsers, deleteUsers};