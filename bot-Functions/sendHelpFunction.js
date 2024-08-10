const sendMsg = require("./sendMsg")

module.exports = async function sendHelpFunction(messageObj){
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

- /promo      - Get PromoCommands
- /promogroup - This command help you to mention group Members and tell them to promote Group.
- /promobot   - This command help us to promote Bot.

- /help        - Get all the commands of the HiroTagger Bot.
- /cancel      - Stop the Hiro Tagging process.

- /tr languageCode - translate any msg on your language
- /afk AwayReasion - Away From Keyword.give resion and away time to others.

- /product - get Awsome product suggestion.
`
    await sendMsg(messageObj, helpCommands)
}