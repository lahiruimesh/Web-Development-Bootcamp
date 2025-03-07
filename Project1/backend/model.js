const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema({
    id: Number,
    name: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;