const handleMsg = require("./bot-comaand");

module.exports = async function handler(req){
    if(req.body){
        console.log("case 2");
       await handleMsg(req.body.message);
    };
       return;
}