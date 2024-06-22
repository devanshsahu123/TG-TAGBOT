const https = require('https');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const deleteWebhookUrl = `https://api.telegram.org/bot${token}/deleteWebhook`;

async function deleteWebhook() {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = https.request(deleteWebhookUrl, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

(async () => {
    try {
        const result = await deleteWebhook();
        console.log(result);
        console.log('Webhook deleted successfully.');
    } catch (error) {
        console.error('Error deleting webhook:', error);
    }
})();
