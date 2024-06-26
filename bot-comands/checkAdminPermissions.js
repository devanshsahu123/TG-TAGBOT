const getChatMemberInfo = require("../bot-Functions/getChatMemberInfo");

module.exports = async function checkAdminPermissions(messageObj) {
    try {
        let info =  await getChatMemberInfo(messageObj, messageObj.from.id);
        return info.status == 'creator' || info.status =='administrator'
    } catch (error) {
        console.log(error);
    }
}