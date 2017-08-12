"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bot {
    constructor(map, commandAdapter, slackAdapter) {
        this.usersMap = map;
        this.commandAdapter = commandAdapter;
        this.slackAdapter = slackAdapter;
    }
    start() {
    }
    handleInput(userId, command) {
        console.log('sup');
        console.log(this);
        let userName = this.usersMap.getUser(userId);
        if (!userName) {
            console.log('no match');
            userName = this.slackAdapter.promptForUserName();
        }
        else {
            const result = this.commandAdapter.handleCommand(userName, command);
            console.log(result);
        }
    }
}
exports.default = Bot;
//# sourceMappingURL=Bot.js.map