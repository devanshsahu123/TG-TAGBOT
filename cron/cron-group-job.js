require('dotenv').config();
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram/tl');
const GroupJob = require('../models/groupJob.js');
const Group = require('../models/group.js');
const getChatMemberCount = require('../bot-Functions/getChatMemberCount.js'); // Adjust path as necessary
const { sleep } = require('telegram/Helpers.js');

const TELEGRAM_API_ID = parseInt(process.env.TELEGRAM_API_ID); // Parse as integer
const TELEGRAM_API_HASH = process.env.TELEGRAM_API_HASH;
const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new TelegramClient(new StringSession(''), TELEGRAM_API_ID, TELEGRAM_API_HASH, { connectionRetries: 5 });

async function groupJobUpdater() {
    await client.start({ botAuthToken: BOT_TOKEN });

    while (true) {
        try {
            console.log('Checking for group jobs...');
            const now = new Date();
            const twoDaysAgo = new Date(now);
            twoDaysAgo.setDate(now.getDate() - 2);

            // Find a GroupJob that meets the criteria for syncing
            const groupJob = await GroupJob.findOne({
                $or: [
                    { lastSyncAt: { $lt: twoDaysAgo }, activeAt: { $gt: twoDaysAgo } },
                    { lastSyncAt: null }
                ]
            }).sort({ lastSyncAt: 1 });

            if (groupJob) {
                console.log(`Found group job for group ID ${groupJob.groupId}`);

                // Fetch the Group associated with the GroupJob
                const group = await Group.findOne({ groupId: groupJob.groupId });
                if (group) {
                    console.log(`Found group for group ID ${groupJob.groupId}`);

                    // Fetch member count using getChatMemberCount function
                    const messageObj = { chat: { id: groupJob.groupId } };
                    console.log(messageObj);
                    
                    let memberCount = await getChatMemberCount(messageObj);

                    // Fetch participants from Telegram channel in batches
                    let offset = 0;
                    const limit = 100; // Telegram API limit per request
                    const fetchedUsernames = [];
                    console.log(`Fetching members for group ID ${groupJob.groupId} in batches...`);
                    while (offset <= memberCount) {
                        const chat = await client.getEntity(groupJob.groupId);
                        // console.log(chat);
                        const participants = await client.invoke(
                            new Api.channels.GetParticipants({
                                channel: chat,
                                filter: new Api.ChannelParticipantsRecent(),
                                offset: offset,
                                limit: Math.min(limit, memberCount - offset),
                                hash: 0,
                            })
                        );
                        
                        const usernames = participants.users.filter(user => !user.bot && user.username).map(user => `${user.username}`);

                        if (usernames==0) {
                            console.log("no Update Found Breaked the loop...");
                            break;
                        }

                        fetchedUsernames.push(...usernames);

                        if (offset == 200) memberCount = 200;
                        console.log({ offset });
                        console.log("upating members...");
                        await updateGroupMembers(group, fetchedUsernames);
                        offset += limit;
                        console.log(`Fetched ${usernames.length} usernames. Total fetched: ${fetchedUsernames.length}`);
                        await sleep(60000 * 1.5); // Sleep for 1 minute between batches
                    }
                    // Update Group model with fetched members
                } else {
                    console.log(`Group not found for group ID ${groupJob.groupId}`);
                }

                // Update the group job with the current time
                groupJob.lastSyncAt = new Date();
                await groupJob.save();
                console.log(`Updated lastSyncAt for group job with group ID ${groupJob.groupId}`);
            } else {
                console.log('No group job requires syncing or no group matches the criteria.');
                await sleep(300000); // Sleep for 5 minutes if no job requires syncing
            }

            console.log('Waiting for next check...');
            await sleep(60000 * 3); // Sleep for 1 minute between checks
        } catch (error) {
            console.error('Error in groupJobUpdater:', error);
            console.log('Waiting before retrying...');
            await sleep(60000 * 10); // Wait 1 minute before retrying in case of an error
        }
    }
}

// Function to update Group model with fetched members
async function updateGroupMembers(group, usernames) {
    console.log(usernames);

    // Ensure usernames are unique
    const uniqueUsernames = Array.from(new Set(usernames));
    console.log("member updating in db..");

    // Update or create members in the group
    uniqueUsernames.forEach(username => {
        if (username) group.members.set(username, true); // Assuming username is used as key, adjust as per your data structure
    });
    console.log("member about to save..");

    // Save updated group model
    await group.save();
    console.log(`Updated members for group ID ${group.groupId}`);
}

module.exports = groupJobUpdater;
