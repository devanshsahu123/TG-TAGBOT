const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupJobSchema = new Schema({
    groupId: { type: String, required: true, unique: true },
    groupName: { type: String, required: false, default: null },
    activeAt: { type: Date, default: Date.now },
    affliateTime: { type: Date, default: null },
    lastSyncAt: { type: Date, default:null}
});

const GroupJob = mongoose.model('GroupJob', groupJobSchema);

module.exports = GroupJob;
