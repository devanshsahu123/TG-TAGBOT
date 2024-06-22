require('dotenv').config();
const express = require('express');
const handler = require('./bot-comands/handler');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;


async function fetchUpdates(offset) {
    try {
        const response = await fetch(`${botUrl}/getUpdates?offset=${offset}`);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching updates:', error);
        return [];
    }
}

async function main() {
    let chatId;
    let offset = 0;
        while (true) {
        const updates = await fetchUpdates(offset);
console.log(offset);

        // if(updates.length == 1){ 
            // };
            
            if (updates.length > 0) {
                // console.log(updates[0]);
                // console.log(first);
                
            handler(updates[0])
                console.log({updates});
            
            // Process each update as needed
            updates.forEach(update => {
                // console.log('Received update:', update);
            });
            // Update offset to fetch only new updates in the next iteration
            offset = updates[updates.length - 1].update_id + 1;
            console.log({offset});
        }
        // Add a delay to avoid hitting API limits
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
}

main();


app.get('*', (req, res) => {
    return res.send("hellow get");
})

app.listen(port, () => {
    console.log(`http//localhost:${port}`);
})