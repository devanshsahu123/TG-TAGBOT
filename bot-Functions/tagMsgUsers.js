const sendMsg = require("./sendMsg");

module.exports = async function tagMsgUsers(messageObj, txtMsg, data, limit) {
    let taggedUsers = [];
    let tagCount = 0;

    for (let [userId, isActive] of data.entries()) {
        if (isActive) {
            tagCount++;
            taggedUsers.push(`@${userId}`);
            if (taggedUsers.length === limit) {
                await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
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
