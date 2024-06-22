const fs = require('fs');
const path = require('path');

//write json File;
function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = async function userTracker(update){
    try {
        let data = { [update.message.from.id]: true };
        const JSON_FILE = path.resolve(__dirname, `../DB/chatinfo/${update.message.chat.id}.json`);

        if (fs.existsSync(JSON_FILE)) {
            const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
            let = isExist = data[update.message.from.id.toString()];

            if (!isExist) {
                data[update.message.from.id] = true;
                writeJsonFile(JSON_FILE, data)
            };
        } else {
            writeJsonFile(JSON_FILE, data);
            console.log('File created successfully.');
        }
    } catch (error) {
        console.log(error);
        
    }
}