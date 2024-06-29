const { state } = require("./state");

module.exports = function stopTagging(chatId) {
    console.log(state);
    
    state.state = { ...state.state, [chatId]:true};
};
