const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function getChatAdministrators(messageObj) {
    try {
        console.log("Getting chat member info...");
        const response = await axios.get(`${botUrl}/getChatAdministrators`, {
            params: {
                chat_id: messageObj.chat.id,
            },
        });
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}