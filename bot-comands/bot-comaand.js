const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const JSON_FILE_PATH = path.resolve(__dirname, './chatInfo.json');
const CHAT_MEMBERS_FILE_PATH = path.resolve(__dirname, '../DB/chatMemberInfo.json');

const botUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
console.log({ botUrl });

async function getChatMemberCount(messageObj) {
    console.log("getChatMember Count...");
    try {
        let response = await axios.get(`${botUrl}/getChatMemberCount`, {
            params: {
                chat_id: messageObj.chat.id,
            },
        });
        return response.data.result
    } catch (error) {
        console.log("Error in sendMsg:", error);
    }
}


async function sendMsg(messageObj, msg) {
    console.log("Sending message...");
    try {
        return await axios.get(`${botUrl}/sendMessage`, {
            params: {
                chat_id: messageObj.chat.id,
                text: msg,
            },
        });
    } catch (error) {
        console.log(error);
    }
}

async function sendImage(messageObj, imagePath) {
    const formData = new FormData();
    formData.append('chat_id', messageObj.chat.id);
    formData.append('photo', fs.createReadStream(imagePath));

    try {
        return await axios.post(`${botUrl}/sendPhoto`, formData, {
            headers: formData.getHeaders(),
        });
    } catch (error) {
        console.log(error);
    }
}

async function getChatAdministrators(messageObj) {
    try {
        console.log("Getting chat member info...");
        const response = await axios.get(`${botUrl}/getChatAdministrators`, {
            params: {
                chat_id: messageObj.chat.id,
            },
        });
        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}

async function pinChatMessage(messageObj, messageId) {
    try {
        console.log("Pin chat in process...");
        const response = await axios.get(`${botUrl}/pinChatMessage`, {
            params: {
                chat_id: messageObj.chat.id,
                message_id: messageId,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getChatInfo(chatId) {
    try {
        console.log("Getting chat info...");
        const response = await axios.get(`${botUrl}/getChat`, {
            params: {
                chat_id: chatId,
            },
        });

        return response.data.result;
    } catch (error) {
        console.log(error);
    }
}

async function getChatPhotoUrl(chatInfo) {
    try {
        if (chatInfo.photo) {
            const fileResponse = await axios.get(`${botUrl}/getFile`, {
                params: {
                    file_id: chatInfo.photo.big_file_id,
                },
            });
            const filePath = fileResponse.data.result.file_path;
            return `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${filePath}`;
        } else {
            return null; // No photo available
        }
    } catch (error) {
        console.log("Error in getChatPhotoUrl:", error);
        return null;
    }
}

function unicodeToChar(text) {
    const normalizedText = text.normalize('NFKC');

    // Remove special Unicode characters
    const normalText = normalizedText.replace(/[\u200B-\u200D\uFEFF]/g, '');

    return normalText;
}

const createGroupImage = async (chatInfo, memberCount) => {
    try {
        chatInfo.title = unicodeToChar(chatInfo.title);
        
        const canvas = createCanvas(800, 400);
        const ctx = canvas.getContext('2d');

        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Load a background image
        console.log("Loading background image...");
        const background = await loadImage('image/canva/background/group-background.jpg'); // Update this path
        console.log("Background image loaded.");

        // Draw the background image
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        // Add chat details with improved formatting
        ctx.font = 'bold 36px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;


        // Add chat details
        ctx.fillText(chatInfo.title, 50, 70);
        ctx.font = '20px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 2;

        // Description
        ctx.font = '25px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;

        const description = chatInfo.description || 'N/A';
        const maxWidth = 550; // Maximum width for the description text box
        const lineHeight = 25; // Line height for each line of text
        const x = 50; // X-coordinate of the top-left corner of the text box
        let y = 130; // Y-coordinate of the top-left corner of the text box

        // Wrap text into lines that fit within the maxWidth
        const words = description.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);

        // Members
        ctx.fillText(`- Members: ${memberCount}`, 60, 250);

        // Get the group's profile photo URL
        const photoUrl = await getChatPhotoUrl(chatInfo);
        if (photoUrl) {
            const profilePhoto = await loadImage(photoUrl);
            // Draw rounded image
            const imageSize = 180; // Size of the rounded image
            let x = 580;
            let y = 100;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + imageSize / 2, y + imageSize / 2, imageSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(profilePhoto, x, y, imageSize, imageSize);
            ctx.restore();
        }

        // Save the image to a file
        console.log("Saving the image...");
        const buffer = canvas.toBuffer('image/png');
        const imagePath = 'group-info.png';
        fs.writeFileSync(imagePath, buffer);

        console.log("Image saved at:", imagePath);
        return imagePath;
    } catch (error) {
        console.log("Error in createGroupImage:", error);
    }
};

async function getChatMemberInfo(messageObj, user_id) {
    try {
        console.log("Getting member info...");
        const response = await axios.get(`${botUrl}/getChatMember`, {
            params: {
                chat_id: messageObj.chat.id,
                user_id
            },
        });

        return response.data.result;
    } catch (error) {
        console.log(error);
        
    }
}

const getUserProfilePhotos = async ( userId) => {
    const url = `${botUrl}/getUserProfilePhotos?user_id=${userId}&limit=1`;
    const response = await axios.get(url);
    return response.data.result.photos;
};

const sendPhoto = async (messageObj, photoFileId, caption) => {
    const url = `${botUrl}/sendPhoto`;
    await axios.post(url, {
        chat_id: messageObj.chat.id,
        photo: photoFileId,
        caption: caption,
        parse_mode: 'Markdown'
    });
};

const sendGame = async (chatId, gameType) => {
    const url = `${botUrl}/sendDice`;
    await axios.post(url, {
        chat_id: chatId,
        emoji: gameType
    });
};

const getChatMembersInfo = async (messageObj) => {
    try {
        const membersCount = await getChatMemberCount(messageObj);
        let allMembers = [];

        let offset = 0;
        const limit = 100; // Number of members per request

        while (offset < membersCount) {
            console.log(offset);
            
            for (let offset = 0; offset < membersCount; offset += limit) {
                console.log(offset);
                
                const membersBatchResponse = await Promise.all(
                    Array.from({ length: limit }, (_, i) =>
                        axios.get(`${botUrl}/getChatMember`, {
                            params: {
                                chat_id: messageObj.chat.id,
                                user_id: i + offset,
                            },
                        })
                    )
                );

                const members = membersBatchResponse.map(response => response.data.result);
                allMembers.push(...members);
            }
        }
        return allMembers;
    } catch (error) {
        console.error('Error getting chat members:', error);
        return [];
    }
};

const saveJsonFile = (filePath, data) => {
    console.log("storing Chat membersInfo...");
    console.log(data);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("store chat membersInfo... :Done");
    
};

async function handleMsg(messageObj) {
    console.log(messageObj);

    if (!messageObj || !messageObj.text) return;

    const messageText = messageObj.text.trim();
    const spliting = messageText.startsWith('/') ? messageText.substr(1) : messageText;
    const splitParts = spliting.split(' ');
    const command = splitParts.shift().toLowerCase();
    const txtMsg = splitParts.join(' ');

    if (messageObj.chat.type === 'private') {
        switch (command) {
            case "start":
                await sendMsg(messageObj, "Welcome to Music Bot");
                break;
        }
    } else { // Handle group chat commands
        switch (command) {
            case "say1":
                await sendMsg(messageObj, "Hello Everyone 🫰");
                break;
            case "tagadmin1": {
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
            }

            break;
            case "admins1": {
                const administrators = await getChatAdministrators(messageObj);
                if (administrators.length > 0) {
                    let tagMessage = `ɢʀᴏᴜᴘ sᴛᴀғғ - ${messageObj.chat.title}  \n \n 👑 ᴏᴡɴᴇʀ\n`;
                    let adminTagMessage = "👮🏻 ᴀᴅᴍɪɴs\n";
                    let count = 0;
                    administrators.forEach(admin => {
                        console.log(admin.status);

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

            }
                break;
            case 'pin1': {
                if (messageObj.reply_to_message) {
                    console.log(messageObj.reply_to_message);

                    await pinChatMessage(messageObj, messageObj.reply_to_message.message_id);
                } else {
                    await sendMsg(messageObj, "ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇssᴀɢᴇ ᴛᴏ ᴘɪɴ ɪᴛ !");
                }
            }
                break;
            case "ginfo": {
                console.log("gInfo 1");

                const gInfo = await getChatInfo(messageObj.chat.id);
                let memberCount = await getChatMemberCount(messageObj)
                console.log({ gInfo });

                if (gInfo) {
                    console.log("casing1");

                    const imagePath = await createGroupImage(gInfo, memberCount);
                    console.log("casing2");

                    const formattedMsg = `*${gInfo.title}*\n\n${gInfo.description || 'No description available.'}\n\nMembers: ${memberCount}`;

                    // await sendMsg(messageObj, formattedMsg);
                    await sendImage(messageObj, imagePath);
                } else {
                    await sendMsg(messageObj, "Unable to retrieve group information.");
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
            case "gameinfo": {
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
            case "darts": await sendGame(messageObj.chat.id, '🎯');
            break;
            case "basketball": await sendGame(messageObj.chat.id, '🏀');
            break;
            case "slot": await sendGame(messageObj.chat.id, '🎰');
            break;
            case "bowling": await sendGame(messageObj.chat.id, '🎳');
            break;
            case "football": await sendGame(messageObj.chat.id, '⚽');
            break;
            case "utag1":{
                console.log({ CHAT_MEMBERS_FILE_PATH });
                const chatMembersInfo = await getChatMembersInfo(messageObj);
                await saveJsonFile(CHAT_MEMBERS_FILE_PATH, chatMembersInfo);
                
            }

        }
    }
}

module.exports = handleMsg;
