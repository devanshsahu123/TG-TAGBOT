const Group =require("../models/group");

const { default: axios } = require("axios");
const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const gcInviteGenerater = async(messageObj)=>{
try {
    const getGroupIds = await Group.find({}).select(['groupId','-_id']);
    getGroupIds.forEach(async(data)=>{
        try {
        const checkGroup = await axios.get(`${botUrl}/exportChatInviteLink`, {
            params: {
                chat_id: data.groupId,
            },
        });
        await Group.updateOne({
            groupId:data.groupId
           },{
               inviteURL: checkGroup?.data?.result || null
           });
           console.log('InviteUrl Updated');
           
        } catch (error) {
            // console.log(error);
            console.count("Bot can't generate Invite Link");
        }
    })
} catch (error) {
    console.log(error);
}
}

module.exports = { gcInviteGenerater };