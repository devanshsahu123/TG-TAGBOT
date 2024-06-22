const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function getChatInfo(chatId) {
    try {
        console.log("Getting chat info...");
        const response = await axios.get(`${botUrl}/getChat`, {
            params: {
                chat_id: chatId,
            },
        });

        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}