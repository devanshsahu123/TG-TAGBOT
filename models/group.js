const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: { type: String, required: true, unique: true },
    groupName: { type: String, required: false, unique: true},
    members: { type: Map, of: Boolean, default: new Map() }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
