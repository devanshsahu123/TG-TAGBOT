require('dotenv').config();
const express = require('express');
const handler = require('./bot-comands/handler');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;


async function fetchUpdates(offset, limit) {
    try {
        const response = await fetch(`${botUrl}/getUpdates?offset=${offset, 11}`);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching updates:', error);
        return [];
    }
}

async function main() {
    let offset = 0;
    let limit = 100
    while (true) {
        // const updates = await fetchUpdates(offset, limit);
        // if (updates.length > 0) {
        //     // Process each update as needed
        //     updates.forEach(update => {
        //         console.log('Received update:', update);
        //         // Extract relevant information like chat IDs, user IDs, etc.
        //         // Handle logic based on update type (message, callback_query, etc.)
        //     });
        //     // Update offset to fetch only new updates in the next iteration
        //     offset = updates[updates.length - 1].update_id + 1;
        // }
        // Add a delay to avoid hitting API limits
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
}

main();


<<<<<<< Updated upstream

app.get('*', (req, res) => {
    return res.send("hellow get");
})
=======
>>>>>>> Stashed changes

app.listen(port, () => {
    console.log(`http//localhost:${port}`);
})