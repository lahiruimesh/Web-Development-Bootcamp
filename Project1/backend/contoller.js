const userDetails = [
    {id : 1 , name : 'Saman'},
    {id : 2 , name : 'Kamal'},
    {id : 3 , name : 'Nimal'},
];

const getUserDetails = (cb) => {
    cb(userDetails);
};

const getUserById = (id, cb) => {
    const user = userDetails.find(user => user.id == id);
    cb(user);
};

module.exports = { getUserDetails, getUserById };