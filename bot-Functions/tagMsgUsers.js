const sleep = require("../cron/sleep.js");
const { state } = require("../cron/state.js");
const sendMsg = require("./sendMsg");

module.exports = async function tagMsgUsers(messageObj, txtMsg, data, limit) {
    let taggedUsers = [];
    let tagCount = 0;

    state.state[messageObj.chat.id] = false;
    for (let [userId, isActive] of data.entries()) {
        if (state.state[messageObj.chat.id]) {
            state.state[messageObj.chat.id] = false;
            break
        };
        if (isActive) {
            taggedUsers.push(`@${userId.replace(/^"(.*)"$/, '$1')}`);
            if (taggedUsers.length === limit) {
                await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
                await sleep(1000)
                taggedUsers = [];
            }
            tagCount++;
        }
    }

    if (taggedUsers.length > 0) {
        await sendMsg(messageObj, txtMsg + taggedUsers.join(' '));
    }

    let startMsg = `
✅ Process Completed ! 
👥 Number of tagged users: ${tagCount} 
🗣 Tag operation is started by: @${messageObj.from.username}. 
You can use /help to see more Commands. Have a nice chat.
You can use /cancel to stop the Commands.
`;

    await sendMsg(messageObj, startMsg);
};
