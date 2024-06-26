const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function getChatMemberInfo(messageObj, user_id) {
    try {
        console.log("Getting member info...");
        const response = await axios.get(`${botUrl}/getChatMember`, {
            params: {
                chat_id: messageObj.chat.id,
                user_id
            },
        });
        return response.data.result;
    } catch (error) {
        console.log(error);

    }
}