const { checkAfkHandler } = require("../bot-Functions/afkHandler");
const userTracker = require("../tagFunction/userTracker");
const handleMsg = require("./bot-comaand");


module.exports = async function handler(update) {
   checkAfkHandler(update.message)
   await handleMsg(update.message);
   if (update.message && update.message?.chat?.type !='private') userTracker(update);
}