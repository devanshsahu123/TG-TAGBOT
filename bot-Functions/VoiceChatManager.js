const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram');

const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;
const botToken = process.env.BOT_TOKEN;
const chatId = '-1002058406009'; // Your chat ID

async function manageVoiceChat(action) {
    const client = new TelegramClient(new StringSession(''), apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        botAuthToken: botToken,
    });

    console.log('Bot is connected.');

    try {
        if (action === 'startvc') {
            // Start Voice Chat
            const result = await client.invoke(
                new Api.phone.CreateGroupCall({
                    peer: await client.getEntity(chatId),
                    randomId: Math.floor(Math.random() * 100000),
                    title: 'Group Voice Chat',
                })
            );

            console.log('Voice Chat started:', result);
            return result;
        } else if (action === 'stopvc') {
            // Note: Replace with actual callId and accessHash values
            const callId = 'your_call_id'; // You need to replace this with the actual call ID
            const accessHash = 'your_access_hash'; // You need to replace this with the actual access hash

            // Stop Voice Chat
            const result = await client.invoke(
                new Api.phone.DiscardGroupCall({
                    call: new Api.InputGroupCall({
                        id: callId,
                        accessHash: accessHash,
                    }),
                })
            );

            console.log('Voice Chat stopped:', result);
            return result;
        } else {
            throw new Error('Invalid action specified.');
        }
    } catch (error) {
        console.error(`Error while ${action === 'startvc' ? 'starting' : 'stopping'} voice chat:`, error);
        throw error;
    }
}

module.exports = manageVoiceChat;
