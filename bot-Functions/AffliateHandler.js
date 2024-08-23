const ProductAffiliate = require("../models/productAffliate");
const sendMsg = require("./sendMsg");

async function AffliateHandler(messageObj) {
    try {
        const count = await ProductAffiliate.countDocuments();

        if (count === 0) {
            throw new Error("No products available in the database.");
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomProduct = await ProductAffiliate.findOne({type:"yt"}).skip(randomIndex).exec();

        const { text, affiliateLink } = randomProduct;

        sendMsg(messageObj, `<b>✨ Taking care of our health is so important! 🌟\n\n🎉 ${text}! 🎉\n\n🛒 Check out this video:\n ${affiliateLink} 🚀\n\n</b>`);
    } catch (error) {
        console.log(error);
    }
}


async function registerProduct(messageObj,text, affiliateLink, imageLink){
    try {
        await ProductAffiliate.create({
            text, affiliateLink, imageLink,type:'yt'
        });
        sendMsg(messageObj,"video Updated Successfully")

        // sendMsg(messageObj, `<b>✨ Check out this awesome product on Amazon:\n\n🎉 ${text}! 🎉\n\n🛒 Grab yours now using this link: ${affiliateLink} 🚀\n\n🌐 Site: Amazon</b>`);

    } catch (error) {
        sendMsg(messageObj, "video Updating Issue:"+error.message)
        console.log(error);
    }
}

module.exports = { registerProduct, AffliateHandler }