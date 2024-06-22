const createGroupImage = require('../bot-Functions/createGroupImage.js');
const getChatAdministrators = require('../bot-Functions/getChatAdministrators.js');
const getChatInfo = require('../bot-Functions/getChatInfo.js');
const getChatMemberCount = require('../bot-Functions/getChatMemberCount.js');
const getChatMemberInfo = require('../bot-Functions/getChatMemberInfo.js');
const getUserProfilePhotos = require('../bot-Functions/getUserProfilePhotos.js');
const pinChatMessage = require('../bot-Functions/pinChatMessage.js'); 
const sendGame = require('../bot-Functions/sendGame.js');
const sendImage = require('../bot-Functions/sendImage.js');
const sendMsg = require('../bot-Functions/sendMsg.js');
const sendPhoto = require('../bot-Functions/sendPhoto.js'); 
const unPinChatMessage = require('../bot-Functions/unPinChatMessage.js');


async function handleMsg(messageObj) {


    if (!messageObj || !messageObj.text) return;

    const messageText = messageObj.text.trim();
    
    if (messageText.startsWith('/')){
        const spliting = messageText.substr(1)
        const splitParts = spliting.split(' ');
        const command = splitParts.shift().toLowerCase().split('@')[0];
        const txtMsg = splitParts.join(' ');
        
    if (messageObj.chat.type === 'private') {

        switch (command) {
            case "start":
                await sendMsg(messageObj, "Welcome to Music Bot");
                break;
        }
    } else { // Handle group chat commands
        switch (command) {
            case "say":
                await sendMsg(messageObj, "Welcome Everyone 🫰");
                break;
            case "atag": {
                try {
                const administrators = await getChatAdministrators(messageObj);
                if (administrators.length > 0) {
                    let tagMessage = "Tagging admins and owner:\n";
                    administrators.forEach(admin => {
                        if (admin.user.username) {
                            tagMessage += `@${admin.user.username} `;
                        }
                    });
                    if (txtMsg) tagMessage += `\n\n ${txtMsg}`;
                    await sendMsg(messageObj, tagMessage);
                } else {
                    await sendMsg(messageObj, "No administrators found or unable to retrieve administrators.");
                }
                } catch (error) {
                    console.log(error);
                    
                }
            }

            break;
            case "admins": {
                try {
                const administrators = await getChatAdministrators(messageObj);
                if (administrators.length > 0) {
                    let tagMessage = `ɢʀᴏᴜᴘ sᴛᴀғғ - ${messageObj.chat.title}  \n \n 👑 ᴏᴡɴᴇʀ\n`;
                    let adminTagMessage = "👮🏻 ᴀᴅᴍɪɴs\n";
                    let count = 0;
                    administrators.forEach(admin => {
                        if (admin.user.username) {
                            const tag = `@${admin.user.username} `;
                            if (admin.status === 'creator') {
                                tagMessage += `└ ${tag}\n\n`;
                            } else if (admin.status === 'administrator') {
                                adminTagMessage += `├ ${tag}\n`;
                            }
                            count++;
                        }
                    });

                    await sendMsg(messageObj, tagMessage + adminTagMessage + `\n✅ | ᴛᴏᴛᴀʟ ɴᴜᴍʙᴇʀ ᴏғ ᴀᴅᴍɪɴs : ${count}`);
                }
                } catch (error) {
                    console.log(error);
                }
            }
                break;
            case 'pin': {
                if (messageObj.reply_to_message) {
                    await pinChatMessage(messageObj, messageObj.reply_to_message.message_id);
                    await sendMsg(messageObj, "ɪ ᴘɪɴ ɪᴛ !");
                } else {
                    await sendMsg(messageObj, "ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ᴘɪɴ ɪᴛ !");
                }
            }
                break;
            case 'unpin': {
                if (messageObj.reply_to_message) {
                    await unPinChatMessage(messageObj, messageObj.reply_to_message.message_id);
                    await sendMsg(messageObj, "ɪ un Pinned It !");
                } else {
                    await sendMsg(messageObj, "ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ᴘɪɴ ɪᴛ !");
                }
            }
                break;
            case "ginfo": {
                try {
                const gInfo = await getChatInfo(messageObj.chat.id);
                let memberCount = await getChatMemberCount(messageObj)
                if (gInfo) {
                    const imagePath = await createGroupImage(gInfo, memberCount);
                    const formattedMsg = `*${gInfo.title}*\n\n${gInfo.description || 'No description available.'}\n\nMembers: ${memberCount}`;

                    // await sendMsg(messageObj, formattedMsg);
                    await sendImage(messageObj, imagePath);
                } else {
                    await sendMsg(messageObj, "Unable to retrieve group information.");
                }
                } catch (error) {
                    console.log(error);
                    
                }
            }
                break;
            case "info" :{
                let photos ;

               let getInfo;
                if (!messageObj.reply_to_message){
                    getInfo = await getChatMemberInfo(messageObj, messageObj.from.id);
                    photos = await getUserProfilePhotos(messageObj.from.id);
                }else{
                    getInfo = await getChatMemberInfo(messageObj, messageObj.reply_to_message.from.id);
                    photos = await getUserProfilePhotos(messageObj.reply_to_message.from.id);
                }
                const photoFileId = photos.length > 0 ? photos[0][0].file_id : null;
                
                const infoString = `
❅─────✧❅✦❅✧─────❅
✦ ᴜsᴇʀ ɪɴғᴏ ✦

➻ ᴜsᴇʀ ɪᴅ ‣ ${getInfo.user.id}
➻ ғɪʀsᴛ ɴᴀᴍᴇ ‣ ${getInfo.user.first_name}
➻ ʟᴀsᴛ ɴᴀᴍᴇ ‣ ${getInfo.user.last_name || 'No last name'}
➻ ᴜsᴇʀɴᴀᴍᴇ ‣ ${getInfo.user.username || 'No username'}
➻ ᴍᴇɴᴛɪᴏɴ ‣ ${getInfo.user.username ? `@${getInfo.user.username}` : 'No mention available'}
➻ ᴘᴏsɪᴛɪᴏɴ ‣ ${getInfo.status}
➻ ᴄᴜsᴛᴏᴍ ᴛɪᴛʟᴇ ‣ ${getInfo.custom_title || 'No custom title'}
➻ ʟᴀɴɢᴜᴀɢᴇ ‣ ${getInfo.user.language_code || 'Not specified'}
➻ ᴄᴀɴ ᴘʀᴏᴍᴏᴛᴇ ᴍᴇᴍʙᴇʀs ‣ ${getInfo.can_promote_members ? 'Yes' : 'No'}
➻ ᴄᴀɴ ᴍᴀɴᴀɢᴇ ᴠɪᴅᴇᴏ ᴄʜᴀᴛs ‣ ${getInfo.can_manage_video_chats ? 'Yes' : 'No'}

❅─────✧❅✦❅✧─────❅`;
                if (photoFileId) {
                    await sendPhoto( messageObj, photoFileId, infoString);
                } else {
                await sendMsg(messageObj,infoString);
                }
            }
            break;
            case "glist": {
                const gameTypes = `
                Hiro Segawa Games -
                    '/dice': '🎲',
                    '/darts': '🎯',
                    '/basketball': '🏀',
                    '/slot': '🎰',
                    '/bowling': '🎳',
                    '/football': '⚽'
                `;
                await sendMsg(messageObj, gameTypes);

            }
            break
            case "dice": await sendGame(messageObj.chat.id, '🎲');
            break;
            case "dart": await sendGame(messageObj.chat.id, '🎯');
            break;
            case "basketball": await sendGame(messageObj.chat.id, '🏀');
            break;
            case "slot": await sendGame(messageObj.chat.id, '🎰');
            break;
            case "bowling": await sendGame(messageObj.chat.id, '🎳');
            break;
            case "football": await sendGame(messageObj.chat.id, '⚽');
            break;
            case "utag1" : {
               
            }
        }
    }
}
}

module.exports = handleMsg;
