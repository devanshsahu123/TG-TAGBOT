const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

module.exports = async function getChatPhotoUrl(chatInfo) {
    try {
        if (chatInfo.photo) {
            const fileResponse = await axios.get(`${botUrl}/getFile`, {
                params: {
                    file_id: chatInfo.photo.big_file_id,
                },
            });
            const filePath = fileResponse.data.result.file_path;
            return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
        } else {
            return null; // No photo available
        }
    } catch (error) {
        console.log("Error in getChatPhotoUrl:", error);
        return null;
    }
}