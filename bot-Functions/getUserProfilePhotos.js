const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
module.exports =  async (userId) => {
    try {
        const url = `${botUrl}/getUserProfilePhotos?user_id=${userId}&limit=1`;
        const response = await axios.get(url);
        return response.data.result.photos;
    } catch (error) {
        console.log(error);
    }
};
