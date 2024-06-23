const sendMsg = require("./sendMsg");

module.exports = async function tagMsgUsers(messageObj, txtMsg,data, limit) {
    let taggedUsers = [];
    let tagCount=0;
    for (let userId in data) {
        if (data[userId] === true) {
            tagCount++
            taggedUsers.push(`@${userId}`);
            if (taggedUsers.length == limit) {
                // setTimeout(async()=>{
                    await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
                // },1000);
                taggedUsers = [];
            }
        }
    }
    await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
    let startMsg = `
✅ Process Completed ! 
👥 Number of tagged users : ${tagCount} 
🗣 Tag operation is started by :  @${messageObj.from.username}. 
You can use /help to see more Commands. Have a nice chat.`;

    await sendMsg(messageObj, startMsg);
}