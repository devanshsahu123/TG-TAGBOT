const path = require('path')
const Group = require('../models/group.js'); // Adjust the path as necessary
const sendImage = require('../bot-Functions/sendImage.js');

module.exports = async function userTracker(update) {
    try {
        const groupId = update.message.chat.id.toString();
        const username = update.message.from.username;
        const leftChatMember = update.message.left_chat_member ? update.message.left_chat_member.username : null;
        const newChatMember =  update.message.new_chat_member?.username;

        if (newChatMember){
            const botImagePath = path.resolve(__dirname, '../image/png/bot-image.jpg');
            const caption = `
🎉 *Welcome to Creator Academy 🍪, @Chizuru_iichinose! 🎉*

We're glad to have you here. Feel free to ask questions, share your thoughts, and engage with the community.

📢 *Useful Commands*:
- /help: Get a list of available commands.

Let's have a great time together! 😊`;
            await sendImage(update.message, botImagePath, caption);
        }
        

        const data = { [username]: true };
        if (leftChatMember){ data[leftChatMember] = false; console.log("check");
        }

        // Check if the group document exists
        let group = await Group.findOne({ groupId: groupId });

        if (group) {
            // Update existing group
            group.member.set(username, true);

            if (leftChatMember) {
                group.member.set(leftChatMember, false);
                console.log("check 2");
            }
            console.log("check 3");
            
            await group.save();
            
            console.log('Group updated successfully.');
        } else {
            // Create new group
            group = new Group({
                groupId: groupId,
                member: data
            });
            await group.save();
            console.log('Group created successfully.');
        }
    } catch (error) {
        console.log('Error:', error);
    }
};
