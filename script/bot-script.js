const https = require('https');
require('dotenv').config(); 
const token = process.env.BOT_TOKEN ; 
const webhookUrl = process.env.WEBHOOK_URL ; 
const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`;


async function setWebhook() {
  return new Promise((resolve, reject) => {
    https.get(setWebhookUrl, (res) => {
      let data = '';

      // A chunk of data has been received.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        resolve(JSON.parse(data));
      });

    }).on('error', (e) => {
      reject(e);
    });
  });
}

(async () => {
  try {
    const result = await setWebhook();
    console.log(result);
    console.log('ngrok webhook setup successfully...');
  } catch (error) {
    console.log('Error setting webhook:', error);
  }
})();
