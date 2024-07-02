const { state } = require("./state");

module.exports = function stopTagging(chatId) {
    state.state = { ...state.state, [chatId]:true};
};
