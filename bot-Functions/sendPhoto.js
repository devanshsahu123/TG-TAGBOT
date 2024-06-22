const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports =  async (messageObj, photoFileId, caption) => {
    try {
        const url = `${botUrl}/sendPhoto`;
        await axios.post(url, {
            chat_id: messageObj.chat.id,
            photo: photoFileId,
            caption: caption,
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.log(error);
    }
};