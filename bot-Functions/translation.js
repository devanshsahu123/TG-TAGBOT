const axios = require('axios');
const { detect } = require('langdetect');
const sendMsg = require('./sendMsg');

const translateAndSendMessage = async (messageObj, message, targetLanguage) => {
    try {
        // Detect the language of the message
        const [sourceLanguage] = detect(message);

        // Translate using MyMemory Translation API
        const response = await axios.get('http://api.mymemory.translated.net/get', {
            params: {
                q: message,
                langpair: `${sourceLanguage.lang}|${targetLanguage}`
            }
        });

        if (response.status === 200 && response.data.responseData) {
            if (response.data.responseStatus !== 200) return sendMsg(messageObj, `<b>This is already in ${targetLanguage} language. bchaa</b>
<strong>Support All languages:</strong>\n 
Just reply on any txt by this way
syntax => /tr languageCode 
example => 'hi','en' etc. 
command => /tr hi
command => /tr en`);
            
            const translatedText = response.data.responseData.translatedText;
            const chatId = messageObj.chat.id;

            const sendMessageResponse = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
                chat_id: chatId,
                text: translatedText,
                parse_mode: 'HTML',
                reply_to_message_id: messageObj?.reply_to_message?.message_id
            });

            return sendMessageResponse.data;
        } else {
            throw new Error('Translation request failed');
        }
    } catch (error) {
        console.error('Error translating and sending message:', error);
        throw error;
    }
};

module.exports = translateAndSendMessage;
