"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("./Models/Bot");
const UsersMap_1 = require("./Models/UsersMap");
const CommandAdapter_1 = require("./Models/CommandAdapter");
const SlackAdapter_1 = require("./Models/SlackAdapter");
const pubg_api_redis_1 = require("pubg-api-redis");
const client_1 = require("@slack/client");
const process = require("process");
const pubgApi = new pubg_api_redis_1.PubgAPI({
    apikey: process.env.PUBG_BOT_TOKEN
});
const rtmSlackApi = new client_1.RtmClient(process.env.SLACK_BOT_TOKEN);
const usersMap = new UsersMap_1.default();
const commandAdapter = new CommandAdapter_1.default(pubgApi);
const slackAdapter = new SlackAdapter_1.default(rtmSlackApi, usersMap, commandAdapter);
const bot = new Bot_1.default(usersMap, commandAdapter, slackAdapter);
bot.start();
//# sourceMappingURL=app.js.map