const randomMsgs = require("../DB/msgs/randomMsgs");
const sendMsg = require("./sendMsg");

module.exports = async function tagRandomMsgUsers(messageObj, data) {
    try {
        let tagCount = 0;

        for (let [userId, isActive] of data.entries()) {
            if (isActive) {
                tagCount++;
                await sendMsg(messageObj, `@${userId} ` + await randomMsgs());
            }
        }

        let startMsg = `
✅<b> Process Completed ! </b>
👥 Number of tagged users: ${tagCount} 
🗣 Tag operation is started by: @${messageObj.from.username}.
You can use /help to see more Commands. Have a nice chat.`;

        await sendMsg(messageObj, startMsg);
    } catch (error) {
        console.log(error);
    }
};
