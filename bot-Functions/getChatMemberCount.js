const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function getChatMemberCount(messageObj) {
    console.log("getChatMember Count...");
    try {
        let response = await axios.get(`${botUrl}/getChatMemberCount`, {
            params: {
                chat_id: messageObj.chat.id,
            },
        });
        return response.data.result
    } catch (error) {
        console.log("Error in sendMsg:", error);
    }
}
