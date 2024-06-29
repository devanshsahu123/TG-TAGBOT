const axios = require("axios");
const { URLSearchParams } = require('url');
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const translateEndpoint = 'https://api.mymemory.translated.net/get';

module.exports = async function translateAndSendMessage(messageObj, message, targetLanguage) {
    console.log("Translating and sending message...");
    try {
        const params = new URLSearchParams();
        params.append('q', message);
        params.append('langpair', `hi|${targetLanguage}`);
// console.log(params);

        const response = await axios.post(translateEndpoint, params);

        if (response.status === 200) {
            const translatedText = response.data.responseData.translatedText;
            const chatId = messageObj.chat.id;
            console.log(response);

            // console.log(sendMessageResponse.data);

            const sendMessageResponse = await axios.post(`${botUrl}/sendMessage`, {
                chat_id: chatId,
                text: translatedText,
                parse_mode: 'HTML'
            });

            return sendMessageResponse.data;
        } else {
            throw new Error('Translation request failed');
        }
    } catch (error) {
        console.error('Error translating and sending message:', error);
        throw error; // Propagate the error back to the caller or handle it accordingly
    }
};
