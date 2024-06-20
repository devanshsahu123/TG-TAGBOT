require('dotenv').config();
const express = require('express');
const handler = require('./bot-comands/handler');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

//tesiting routes
app.post('*', (req, res) => {
    handler(req);
    return res.send("hellow post ");
})

app.get('*', (req, res) => {
    return res.send("hellow get");
})

app.listen(port, () => {
    console.log(`http//localhost:${port}`);
})