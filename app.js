require('dotenv').config();
require('./DB/db.js');
const express = require('express');
const handler = require('./bot-comands/handler');
const groupJobUpdater = require('./cron/cron-group-job.js');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

(async () => {
    await groupJobUpdater();
})();

//tesiting routes
app.post('*', (req, res) => {
    console.log("request...");
    handler(req.body)
    return res.send("hellow post ");
})

app.get('*', (req, res) => {
    return res.send("hellow get");
})

app.listen(port, () => {
    console.log(`http//localhost:${port}`);
})