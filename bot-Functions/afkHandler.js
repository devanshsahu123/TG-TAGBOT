const insertDataToJson = require('../jsonHandler/inserDataToJson.js');
const path = require('path');
const readJsonFile = require('../jsonHandler/readJsonFile.js');
const sendMsg = require('./sendMsg.js');
const { toUnicodeBold } = require('../textDecorator/boldCreator.js');
const filePath = path.resolve(__dirname,'../DB/afk/afk.json');

const createAfkHandler = async (messageObj, txtMsg)=>{
    try {
       let newData = {
         [messageObj?.from?.id] :{
            startDate: Date.now(),
            isAfk:true,
            resion:txtMsg
         }
        }
        
        insertDataToJson(filePath, newData);
    } catch (error) {
        console.log(error);
    }
}

const checkAfkHandler = async (messageObj) => {
    try {
       let data = readJsonFile(filePath);
       if (messageObj?.reply_to_message?.from?.id) {            
           let checkMember =  data[messageObj?.reply_to_message?.from?.id];
            if (checkMember && checkMember?.isAfk){
                await sendMsg(messageObj, toUnicodeBold(`${messageObj?.reply_to_message?.from?.first_name} is Away!\n reasion : ${checkMember.resion}\n away from : ${timeAway(checkMember.startDate) } 💜`), true);
            }
        }

        if (data[messageObj?.from?.id]?.isAfk){
            await sendMsg(messageObj, toUnicodeBold(`${messageObj?.from?.first_name} is Now Available !\n Away reasion : ${data[messageObj?.from?.id]?.resion}\n Away time : ${timeAway(data[messageObj?.from?.id]?.startDate) } 💜`), true);
            let newData = {
                [messageObj?.from?.id]: {
                    startDate: Date.now(),
                    isAfk: false
                }
            }
            insertDataToJson(filePath, newData);
        }
    } catch (error) {
        console.log(error);
    }
}

function timeAway(startDate) {
    const now = new Date();
    const start = new Date(startDate);

    const diffInSeconds = Math.floor((now - start) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30.4375); // Approximate average month length
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInYears > 0) {
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''}`;
    } else if (diffInMonths > 0) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
    } else if (diffInDays > 0) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else {
        return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''}`;
    }
}



module.exports = { createAfkHandler, checkAfkHandler }