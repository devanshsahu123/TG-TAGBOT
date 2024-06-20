const handleMsg = require("./bot-comaand");

module.exports = async function handler(req){
    if(req.body){
       await handleMsg(req.body.message);
    };
       return;
}