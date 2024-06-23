require('dotenv').config();
const express = require('express');
const handler = require('./bot-comands/handler');
const userTracker = require('./tagFunction/userTracker');
const sendImage = require('./bot-Functions/sendImage');
const sendMsg = require('./bot-Functions/sendMsg');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;



async function fetchUpdates(offset) {
    try {
        const response = await fetch(`${botUrl}/getUpdates?offset=${offset}`);
        const data = await response.json();

        if (!data.ok) {
            throw new Error(`Error fetching updates: ${data.description}`);
        }

        return data.result;
    } catch (error) {
        console.error('Error fetching updates:', error);
        return [];
    }
}

async function main() {
    let offset = 0;
    while (true) {
        const updates = await fetchUpdates(offset);
// console.log(updates);

        console.log(offset);
        if (updates && updates.length > 0) {
            if (updates.length == 1) {
                handler(updates[0])
            }
            
            // Process each update as needed
            updates.forEach(update => {
                if (update.message && update.message.chat.type != 'private') userTracker(update);
            });
            limit = 1;
            // Update offset to fetch only new updates in the next iteration
            offset = updates[updates.length - 1].update_id + 1;
            console.log({ offset });
        }
        // Add a delay to avoid hitting API limits
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
}

main();

app.listen(port, () => {
    console.log(`http//localhost:${port}`);
})