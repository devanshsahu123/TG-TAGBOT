const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl,{
    serverSelectionTimeoutMS: 50000, // Increase timeout to 50 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds    
})
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

module.exports = mongoose.connection;
