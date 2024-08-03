const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: { type: String, required: true, unique: true },
    groupName: { type: String, required: false, default: null },
    members: { type: Map, of: Boolean, default: new Map() },
    inviteURL: { type: String, required: false, default: null }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
