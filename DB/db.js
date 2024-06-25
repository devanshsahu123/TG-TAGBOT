const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoose.connection;
