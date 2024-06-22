const { default: axios } = require("axios");
const FormData = require('form-data');
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const fs = require('fs');

module.exports = async function sendImage(messageObj, imagePath) {
    const formData = new FormData();
    formData.append('chat_id', messageObj.chat.id);
    formData.append('photo', fs.createReadStream(imagePath));

    try {
        console.log(formData);
        
        return await axios.post(`${botUrl}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    } catch (error) {
        console.log(error);
    }
}