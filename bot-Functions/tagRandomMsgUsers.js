const sleep = require("../cron/sleep.js");
const { state } = require("../cron/state.js");
const randomMsgs = require("../DB/msgs/randomMsgs");
const sendMsg = require("./sendMsg");

module.exports = async function tagRandomMsgUsers(messageObj, data) {
    try {
        let tagCount = 0;
        state.state[messageObj.chat.id] = false;
        for (let [userId, isActive] of data.entries()) {
            if (state.state[messageObj.chat.id]){
                state.state[messageObj.chat.id] = false;
                 break
                };
            if (isActive) {
                await sendMsg(messageObj, `@${userId.replace(/^"(.*)"$/, '$1')} ` + await randomMsgs());
                tagCount++;
                await sleep(1000)
            }
        }

        let startMsg = `
✅<b> Process Completed ! </b>
👥 Number of tagged users: ${tagCount} 
🗣 Tag operation is started by: @${messageObj.from.username}.
You can use /help to see more Commands. Have a nice chat.
You can use /cancel to stop the Commands.
`;

        await sendMsg(messageObj, startMsg);
    } catch (error) {
        console.log(error);
    }
};
