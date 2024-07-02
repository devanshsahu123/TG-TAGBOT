const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function sendMsg(messageObj, msg,reply) {
    console.log("Sending message...");
    try {
        let params ={
            chat_id: messageObj.chat.id,
            text: msg,
            parse_mode: 'HTML'
        }

        if (reply) params.reply_to_message_id = messageObj.message_id;
        return await axios.get(`${botUrl}/sendMessage`, {
            params
        });
    } catch (error) {
        console.log(error);
    }
}