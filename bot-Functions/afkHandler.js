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
                let timeFrom = Math.floor(((Date.now() - checkMember.startDate) / (1000 * 60)) % 60);
                if (timeFrom < 2) timeFrom = 'some minutes ago. yes some'
                await sendMsg(messageObj, toUnicodeBold(`${messageObj?.reply_to_message?.from?.first_name} is Away!\n reasion : ${checkMember.resion}\n away from : ${timeFrom} min 💜`), true);
            }
        }

        if (data[messageObj?.from?.id]?.isAfk){
            let timeFrom = Math.floor(((Date.now() - data[messageObj?.from?.id]?.startDate) / (1000 * 60)) % 60);
            if (timeFrom < 2) timeFrom = 'some minutes ago. yes some'
            await sendMsg(messageObj, toUnicodeBold(`${messageObj?.from?.first_name} is Now Available !\n Away reasion : ${data[messageObj?.from?.id]?.resion}\n Away time : ${timeFrom} min 💜`), true);
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




module.exports = { createAfkHandler, checkAfkHandler }