const { AffliateHandler } = require("../bot-Functions/AffliateHandler");
const GroupJob = require("../models/groupJob");
const sleep = require("./sleep");

module.exports = async function alliateJob(){
while(true){
try {
   await Affiliate()
} catch (error) {
    console.log(error);
}
}
async function Affiliate() {
    try {
        console.log("Checking affiliate codes...");

        const now = new Date();
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(now.getDate() - 1);

        // Find all relevant documents
        const groupJobs = await GroupJob.find({
            $or: [
                { affliateTime: { $lt: oneDayAgo } },
                { affliateTime: null }
            ]
        }).sort({ affliateTime: 1, groupId: 1 });

        // If there are any documents to process
        if (groupJobs.length > 0) {
            for (const groupJob of groupJobs) {
                groupJob.affliateTime = now;
                await groupJob.save();

                // Call the AffiliateHandler for each groupJob
                await AffliateHandler({ chat: { id: groupJob.groupId } });
            }
            console.log("Processed all groupJobs for affiliate codes.");
        } else {
            console.log("No groupJobs found for processing.");
        }
       await sleep(60*60*1000);
    } catch (error) {
        console.log(error);
    }
}}