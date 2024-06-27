const axios = require('axios');
const sendMsg = require('./sendMsg');
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function manageVoiceChat(messageObj, action) {
    console.log(`Managing voice chat action: ${action}...`);
    try {
        let endpoint;
        switch (action) {
            case 'startvc':
                endpoint = 'startVoiceChat';
                break;
            case 'stopvc':
                endpoint = 'stopVoiceChat';
                break;
            default:
                throw new Error('Invalid action specified.');
        }

        const url = `${botUrl}/${endpoint}`;
        const payload = {
            chat_id: messageObj.chat.id,
        };

        const response = await axios.post(url, payload);

        console.log(`Voice chat ${endpoint} successful.`);
        return response.data;
    } catch (error) {
        await sendMsg(messageObj, "Oops! I am not able to manage voice chats in this group.");
        console.error(`Error while ${action}ing voice chat:`, error);
        // throw error; // Ensure error is propagated if necessary
    }
};
