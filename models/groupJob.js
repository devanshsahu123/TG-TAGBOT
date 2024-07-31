const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupJobSchema = new Schema({
    groupId: { type: String, required: true, unique: true },
    groupName: { type: String, required: false },
    activeAt: { type: Date, default: Date.now },
    lastSyncAt: { type: Date, default:null}
});

const GroupJob = mongoose.model('GroupJob', groupJobSchema);

module.exports = GroupJob;
