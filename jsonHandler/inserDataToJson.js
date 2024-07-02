const fs = require('fs');
const path = require('path');
const readJsonFile = require('./readJsonFile.js');

// Write to JSON file
function writeJsonFile(filePath, data) {
    try {
        const resolvedPath = path.resolve(__dirname, filePath);
        const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON with 2 spaces
        fs.writeFileSync(resolvedPath, jsonData, 'utf-8');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

// Insert data into JSON file
module.exports  = function insertDataToJson(filePath, newData) {
    try {
    const data = readJsonFile(filePath);
    if (data) {
        const updatedData = { ...data, ...newData };
        writeJsonFile(filePath, updatedData);
    }
    } catch (error) {
        console.log(error);
        
    }
}

