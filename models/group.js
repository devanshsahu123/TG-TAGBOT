const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: { type: String, required: true, unique: true },
    groupName: { type: String, required: true },
    members: { type: Map, of: Boolean, default: {} }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
