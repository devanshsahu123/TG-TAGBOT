const sleep = require("../cron/sleep.js");
const { state } = require("../cron/state.js");
const Group = require("../models/group");
const sendMsg = require("./sendMsg");

module.exports = async function promoMsgs(messageObj, command) {
    try {
        const groupData = await Group.findOne({ groupId: messageObj.chat.id });
        let botMessages
        if (command == 'promobot') {
            botMessages = [
                "Me aachi bot hu na please aapne group me add kro n.", "Aare kya kr rhe hoo meri help kroo na. Support kro.",
                "Mujhe koi nhi janta, aapne group me add kr ke introduction kraoo please.", "Hey! Me tumhari madad kr skti hu, bas mujhe apne group me add kro.", "Kya tumhe meri zaroorat hai? Mujhe apne group me add kr lo.", "Mujhe aapke group me join krna hai, please add kro na.", "Me aachi aur helpful bot hu, mujhe apne group me add kro.", "Aapke group me aake me sbki madad krungi, please add me.", "Hey! Add me to your group, me sab kuch manage kr lungi.", "Mujhe apne group ka hissa banao, me sabke kaam aungi.", "Kya me tumhare group me aa skti hu? Please add me.", "Me tumhare group me aa kr sabki madad kr skti hu.", "Aare please mujhe apne group me add kro, me helpful hu.", "Mujhe aapke group me join krne do, please add me.", "Hey! Mujhe apne group me add kro, me sb manage kr lungi.", "Aapke group me aake me sbki madad krungi, please add kro na.", "Me tumhari group me aa kr sbki madad kr skti hu.", "Mujhe apne group me add kro, me helpful hu na.", "Aapne group me mujhe add kro, me sb manage kr lungi.", "Hey! Mujhe apne group me add kro, me helpful hu.", "Mujhe aapke group ka hissa banao, me sbki madad krungi.", "Aare kya tum mujhe apne group me add kr skte ho?", "Me tumhare group me aa kr sbki madad kr skti hu.", "Mujhe apne group me add kro, me sbka kaam aungi.", "Hey! Mujhe apne group me add kro, me sbki madad krungi.", "Aapke group me mujhe join krne do, please add me.", "Mujhe aapke group ka hissa banao, me sabka kaam aungi.", "Me tumhare group me aa skti hu? Please add me.", "Aare please mujhe apne group me add kro na.", "Mujhe apne group me join krne do, me helpful hu.", "Aapke group me mujhe add kro, me sab kuch manage kr lungi.", "Me tumhare group me aa kr sbka kaam aungi.", "Aapne group me mujhe add kro, me sabki madad krungi.", "Mujhe apne group me add kro, me helpful hu.", "Aapke group me mujhe join krne do, me sabka kaam aungi.", "Mujhe aapke group ka hissa banao, me helpful hu.", "Mujhe koi nhi janta aapne group me addd kr ke introduction kraoo please.", "Hey! Mujhe apne group me add kro, me sabka kaam aungi.", "Me aapke group ke member ko tag kr skti hu use krke deekho aapne group me.", "Me aapke group me sabka kaam aungi, mujhe add kro.", "Mujhe apne group me add kro, me sab kuch manage kr lungi.", "Hey! Mujhe apne group me add kro, me sbka kaam aungi.", "Me tumhare group me aa kr sabka kaam aungi.", "Hey! Mujhe apne group me add kro, me sab manage kr lungi.", "Aap ne group me mujhe add kro, me sabki madad krungi."];
        } else if (command == 'promogroup') {
            botMessages = ["Chalo guys, ab members add kar do, GC active nahi lag raha.",
                "GC down ho raha, members add karo yaar.", "Arey, new logo ki zarurat hai.", "Hamari family badhao, new members ko invite karo.", "Group thoda quiet lag raha hai, new members join karvao.", "Kuch naye chehre chahiye, members add karo.", "Family ko bada karo, aur members ko join karne bolo.", "New members ko welcome karo, group ko lively banao.", "GC ko active karne ke liye, naye logon ko invite karo.", "Group mein thoda maza lao, members ko join karne bolo.", "New members ki zarurat hai, chalo add karo sabko.", "Group ko aur interesting banao, new members join karvao.", "Hamara group thoda thanda hai, naye members chahiye.", "Friends ko invite karo, GC ko live karo.", "Group ko grow karne do, new members ko join karne bolo.", "Naye log chahiye group mein, invite karo sabko.", "Family ko aur bada karo, new members ko welcome karo.", "GC ko lively banane ke liye, new members add karo.", "Hamara group quiet hai, new members ki zarurat hai.", "Group mein naye members ko add karo, fun badhao.", "Chalo guys, naye members ko join karne bolo.", "Naye members ki zarurat hai, invite karo sabko.", "Hamara group down ho raha hai, new members chahiye.", "Family ko aur badhao, naye members ko join karvao.", "Group ko interesting banao, new members ko invite karo.", "GC ko active karo, naye logon ko join karvao.", "Group mein naye chehre chahiye, members ko add karo.", "Hamara group quiet lag raha hai, naye members ki zarurat hai.", "New members ko join karvao, group ko lively banao.", "GC ko live karne ke liye, naye members ko add karo.", "Friends ko invite karo, group ko grow karo.", "Family ko aur bada karo, naye members ko welcome karo.", "Group ko active banane ke liye, naye logon ko add karo.", "Hamara group thanda hai, naye members chahiye.", "Naye members ko join karne bolo, group ko lively karo.", "Chalo guys, naye members ko invite karo.", "Group ko aur interesting banao, naye log chahiye.", "Hamara group quiet hai, naye members ki zarurat hai.", "GC ko active karne ke liye, naye logon ko add karo.", "Group ko lively banane ke liye, naye members ko join karvao.", "Hamara group thanda lag raha hai, naye members chahiye.", "New members ko invite karo, group ko interesting banao.", "Group ko grow karne ke liye, naye logon ko add karo.", "Naye members ko join karvao, group ko lively banao.", "GC ko active karo, naye logon ko invite karo.", "Group ko aur interesting banao, naye members chahiye.", "Hamara group thanda hai, naye members ki zarurat hai."]
        }

        let tagCount = 0;
        state.state[messageObj.chat.id] = false;
        for (let [userId, isActive] of groupData.members.entries()) {
            if (state.state[messageObj.chat.id]) {
                state.state[messageObj.chat.id] = false;
                break
            };
            if (isActive) {
                tagCount++;
                await sendMsg(messageObj, `@${userId.replace(/^"(.*)"$/, '$1')} ` + ` <b>${botMessages[Math.floor(Math.random() * botMessages.length)]} \n\n 🤖 Bot: @HiroTaggerBot- Use Me - Support. \n 🩶 Owner Is @Chizuru_iichinose DM for Help</b>`);
                await sleep(2000);
            }
        }

        let startMsg = `
✅<b> Process Completed ! </b>
👥 Number of tagged users: ${tagCount} 
🗣 Tag operation is started by: @${messageObj.from.username}.
You can use /help to see more Commands. Have a nice chat.
You can use /cancel to stop the Commands.
.
`;

        await sendMsg(messageObj, startMsg);
    } catch (error) {
        console.log(error);
    }
}