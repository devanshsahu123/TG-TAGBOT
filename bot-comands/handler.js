const userTracker = require("../tagFunction/userTracker");
const handleMsg = require("./bot-comaand");


module.exports = async function handler(update) {
console.log(update);

   await handleMsg(update.message);
   if (update.message && update.message.chat.type !='private') userTracker(update);

}