const mongoose = require('mongoose');

// Define the member schema
const memberSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        unique: true
    },
    member: {
        type: Map,
        of: Boolean,
        required: true
    }
});

// Create the model from the schema
const Group = mongoose.model('Group', memberSchema);

module.exports = Group;
