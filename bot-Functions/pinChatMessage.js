const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function pinChatMessage(messageObj, messageId) {
    try {
        console.log("Pin chat in process...");
        const response = await axios.get(`${botUrl}/pinChatMessage`, {
            params: {
                chat_id: messageObj.chat.id,
                message_id: messageId,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}