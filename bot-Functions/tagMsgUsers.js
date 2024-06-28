const sleep = require("../cron/sleep");
const sendMsg = require("./sendMsg");

module.exports = async function tagMsgUsers(messageObj, txtMsg, data, limit) {
    let taggedUsers = [];
    let tagCount = 0;

    for (let [userId, isActive] of data.entries()) {
        if (isActive) {
            tagCount++;
            taggedUsers.push(`@${userId.replace(/^"(.*)"$/, '$1') }`);
            if (taggedUsers.length === limit) {
                await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
                await sleep(1000)
                taggedUsers = [];
            }
        }
    }

    if (taggedUsers.length > 0) {
        await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
    }

    let startMsg = `
✅ Process Completed ! 
👥 Number of tagged users: ${tagCount} 
🗣 Tag operation is started by: @${messageObj.from.username}. 
You can use /help to see more Commands. Have a nice chat.`;

    await sendMsg(messageObj, startMsg);
};
