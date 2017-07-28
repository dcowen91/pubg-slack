"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@slack/client");
class SlackAdapter {
    constructor(client, usersMap, commandAdapter) {
        this.botUserid = '<@U5Z8ER1DG>';
        this.client = client;
        this.usersMap = usersMap;
        this.commandAdapter = commandAdapter;
    }
    start(func) {
        this.client.on(client_1.RTM_EVENTS.MESSAGE, (message) => {
            const messageText = !!message.text ? message.text.split(' ') : [];
            console.log(messageText);
            if (messageText[0] === this.botUserid && messageText.length <= 3) {
                const command = messageText[1];
                const target = messageText[2] || '<@' + message.user + '>';
                console.log('command: ' + command);
                console.log('user: ' + target);
                if (!command || command.toLowerCase() === 'help') {
                    this.client.sendMessage('USAGE:\n@pubgstatsbot help\n@pubgstatsbot adduser [your_pubg_nickName]\n@pubgstatsbot [stats|kdr|rating|wins|top10] [@SlackUser]', message.channel);
                }
                else if (command.toLowerCase() === 'adduser') {
                    if (!messageText[2]) {
                        this.client.sendMessage('USAGE:\n@pubgstatsbot adduser [your_pubg_nickName]', message.channel);
                    }
                    this.usersMap.addUser('<@' + message.user + '>', target);
                    this.client.sendMessage('user added!', message.channel);
                    return;
                }
                else {
                    const userName = this.usersMap.getUser(target);
                    if (!userName) {
                        this.client.sendMessage('pubg user not found for ' + target + '. Please have the user call the addUser command', message.channel);
                    }
                    else {
                        console.log('querying for ' + userName);
                        this.commandAdapter.handleCommand(userName, command).then((result) => {
                            console.log(result);
                            this.client.sendMessage(result, message.channel);
                        });
                    }
                }
            }
            else {
                console.log(func);
            }
        });
        this.client.start();
        console.log('now running');
    }
    promptForUserName() {
        return 'gettingName';
    }
}
exports.default = SlackAdapter;
//# sourceMappingURL=SlackAdapter.js.map