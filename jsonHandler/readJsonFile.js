const fs = require('fs');
const path = require('path');

// Read JSON file
function readJsonFile(filePath) {
    try {
        const resolvedPath = path.resolve(__dirname, filePath);
        if (!fs.existsSync(resolvedPath)) {
            fs.writeFileSync(resolvedPath, JSON.stringify({}), 'utf-8');
        }
        const data = fs.readFileSync(resolvedPath, 'utf-8');
        if (data.trim() === '') {
            return {};
        }
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

module.exports = readJsonFile;
