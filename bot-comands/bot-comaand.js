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
const fs = require('fs');
const path = require('path');
const tagMsgUsers = require('../bot-Functions/tagMsgUsers.js');
const tagRandomMsgUsers = require('../bot-Functions/tagRandomMsgUsers.js');
const checkAdminPermissions = require('./checkAdminPermissions.js');

async function handleMsg(messageObj) {


    if (!messageObj || !messageObj.text) return;

    const messageText = messageObj.text.trim();

    if (messageText.startsWith('/')) {
        const spliting = messageText.substr(1)
        const splitParts = spliting.split(' ');   
        const command = splitParts.shift().toLowerCase().split('@')[0];
        let txtMsg = splitParts.join(' ');
        console.log({ s: splitParts[0] });

        if (messageObj.chat.type === 'private') {

            switch (command) {
                case "start":
                    await sendMsg(messageObj, "Welcome to Hiro Tagger \n use /help to get all the commands which you can use in the group");
                    break;
            }
        } else { // Handle group chat commands
            switch (command) {
                case "say":{
                    await sendMsg(messageObj, "Welcome Everyone 🫰");
                }
                    break;
                case "atag": {
                    try {
                        if (!txtMsg) return await sendMsg(messageObj, `
  <b>Please @${messageObj.from.username} provide Message for admin</b>
 <i>Example</i> - /utag yourMsg`);

                        let adminAuth = await checkAdminPermissions(messageObj);
                        if (!adminAuth) return await sendMsg(messageObj, `<b> Only Admin Can Perform This Action ( /${command} ) </b>`);

                        const administrators = await getChatAdministrators(messageObj);
                        if (administrators.length > 0) {
                            let tagMessage = "<b>Tagging admins and owner</b> :\n\n";
                            administrators.forEach(admin => {
                                if (admin.user.username) {
                                    tagMessage += `@${admin.user.username} `;
                                }
                            });
                            if (txtMsg) tagMessage += `\n\n <b> ${txtMsg} <b/>`;

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
                    let adminAuth = await checkAdminPermissions(messageObj);
                    if (!adminAuth) return await sendMsg(messageObj, `<b> Only Admin Can Perform This Action ( /${command} ) </b>`);
                    if (messageObj.reply_to_message) {
                        await pinChatMessage(messageObj, messageObj.reply_to_message.message_id);
                        await sendMsg(messageObj, "ɪ have pinned that message for you !");
                    } else {
                        await sendMsg(messageObj, "ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ᴘɪɴ ɪᴛ !");
                    }
                }
                    break;
                case 'unpin': {
                    let adminAuth = await checkAdminPermissions(messageObj);
                    if (!adminAuth) return await sendMsg(messageObj, `<b> Only Admin Can Perform This Action ( /${command} ) </b>`);
                    if (messageObj.reply_to_message) {
                        await unPinChatMessage(messageObj, messageObj.reply_to_message.message_id);
                        await sendMsg(messageObj, "ɪ un Pinned It !");
                    } else {
                        await sendMsg(messageObj, "ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ unᴘɪɴ ɪᴛ !");
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

                            await sendMsg(messageObj, formattedMsg);
                            await sendImage(messageObj, imagePath);
                        } else {
                            await sendMsg(messageObj, "Unable to retrieve group information.");
                        }
                    } catch (error) {
                        console.log(error);

                    }
                }
                    break;
                case "info": {
                    let photos;

                    let getInfo;
                    if (!messageObj.reply_to_message) {
                        getInfo = await getChatMemberInfo(messageObj, messageObj.from.id);
                        photos = await getUserProfilePhotos(messageObj.from.id);
                    } else {
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
                        await sendPhoto(messageObj, photoFileId, infoString);
                    } else {
                        await sendMsg(messageObj, infoString);
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
                case "utag": {
                    try {
                        let adminAuth = await checkAdminPermissions(messageObj);
                        if (!adminAuth) return await sendMsg(messageObj, `<b> Only Admin Can Perform This Action ( /${command} ) </b>`);

                        let startMsg = `𝐓𝐚𝐠 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐢𝐬 𝐬𝐭𝐚𝐫𝐭𝐞𝐝 𝐛𝐲  : @${messageObj.from.username}.\n
/utag - tag group members on rendom MSg's.
/utag yourMsg - tag group members on yourMsg.
Have a nice chat`
                     
                        await sendMsg(messageObj, startMsg);

                        const JSON_FILE = path.resolve(__dirname, `../DB/chatinfo/${messageObj.chat.id}.json`);
                        const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
                        if (txtMsg){
                            txtMsg = `<b>${txtMsg}</b>` + '\n \n';
                            await tagMsgUsers(messageObj, txtMsg, data, 10);
                        }else{
                            await tagRandomMsgUsers(messageObj,data)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                    break;
                case "help":{
                    let helpCommands = `
<b> HiroTagger => Bot Commands </b> \n
- /say        - welcome command.

- /atag       - Tag all the admins and send a message to them.
- /admins     - Get chat admins.
- /utag       - Tag user and send a message or a random message.

- /ginfo      - Get chat information.
- /info       - Get user or own information.

- /pin        - 📍 Used to pin a message.
- /unpin      - 📍 Used to unpin the pinned message.


- /glist      - Get games list.
- /dice       - Play dice game 🎲.
- /dart       - Play dart game 🎯.
- /basketball - Play basketball 🏀.
- /slot       - Play slot game 🎰.
- /bowling    - Play bowling 🎳.
- /football   - Play football ⚽️.

- /help       - Get all the commands of the HiroTagger Bot.
`

                   await sendMsg(messageObj, helpCommands)
                }
            }
        }
    }
}

module.exports = handleMsg;
