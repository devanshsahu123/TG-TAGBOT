const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productAffiliateSchema = new Schema({
    text: { type: String, required: true },
    affiliateLink: { type: String, required: true },
    imageLink: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const ProductAffiliate = mongoose.model('ProductAffiliate', productAffiliateSchema);

module.exports = ProductAffiliate;
