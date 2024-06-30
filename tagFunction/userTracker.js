const path = require('path');
const Group = require('../models/group.js'); // Adjust the path as necessary
const sendImage = require('../bot-Functions/sendImage.js');
const GroupJob = require('../models/groupJob.js');
const sendMsg = require('../bot-Functions/sendMsg.js');

module.exports = async function userTracker(update) {
    try {
        const { chat, from, left_chat_member, new_chat_member } = update.message;
        const groupId = chat.id.toString();
        const username = from.username;
        const leftChatMember = left_chat_member ? left_chat_member.username : null;
        const newChatMember = new_chat_member?.username;
        // Handle new chat member
        const memberData = { [username]: true };
        let isActive = true;
        if (newChatMember) {
            const botImagePath = path.join(__dirname, '../image/png/bot-image.jpg');
            const caption = `
            🎉 *Welcome to Creator Academy 🍪, @${newChatMember}! 🎉*
            
            We're glad to have you here. Feel free to ask questions, share your thoughts, and engage with the community.
            
            📢 *Useful Commands*:
            - /help: Get a list of available commands.
            
            Let's have a great time together! 😊`;
            await sendImage(update.message, botImagePath, caption);
        };
        if (leftChatMember){ 
            try {
               await sendMsg(update.message,`**Goodbye!** 👋  
Sad to see you go, but it was nice knowing you!  
Take care and have a great day! 🌟`);
            } catch (error) {
                console.log(error);
            }
            console.log("member left the Group...");
            isActive = false;
            memberData[leftChatMember] = false;
        };

        let group = await Group.findOne({ groupId });
        let groupJob = await GroupJob.findOne({ groupId });
console.log({chat});
if(!chat){
    console.log("chat missing break..");
    return 
}
        if (group) {
            // Update existing group
            group.members.set(username, isActive);
            groupJob.activeAt = new Date();
            console.log('Group and GroupJob updated successfully...');
        } else {
            // Create new group
            group = new Group({
                groupId,
                members: memberData,
                groupName: chat.username
            });

            groupJob = new GroupJob({
                groupId,
                groupName: chat.username,
            });

            console.log('Group and GroupJob created successfully...');
        }
        console.log({ groupJob });
        
        await groupJob.save()
        await group.save();
    } catch (error) {
        console.error('Error:', error);
    }
};
