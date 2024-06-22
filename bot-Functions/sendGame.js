const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async (chatId, gameType) => {
    const url = `${botUrl}/sendDice`;
    await axios.post(url, {
        chat_id: chatId,
        emoji: gameType
    });
};