const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function sendMsg(messageObj, msg) {
    console.log(messageObj.chat.id);
    
    console.log("Sending message...");
    try {
        return await axios.get(`${botUrl}/sendMessage`, {
            params: {
                chat_id: messageObj.chat.id,
                text: msg,
                parse_mode: 'HTML'
            },
        });
    } catch (error) {
        console.log(error);
    }
}