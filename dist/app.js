"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersMap_1 = require("./Controllers/UsersMap");
const CommandHandler_1 = require("./Controllers/CommandHandler");
const PlayerStatsCache_1 = require("./Controllers/PlayerStatsCache");
const SlackAdapter_1 = require("./Controllers/SlackAdapter");
const pubg_api_redis_1 = require("pubg-api-redis");
const client_1 = require("@slack/client");
const process = require("process");
const dotenv = require("dotenv");
dotenv.config();
const pubgApi = new pubg_api_redis_1.PubgAPI({
    apikey: process.env.PUBG_BOT_TOKEN
});
const slacRtmApi = new client_1.RtmClient(process.env.SLACK_BOT_TOKEN);
const usersMap = new UsersMap_1.default();
const playerCache = new PlayerStatsCache_1.default();
const commandHandler = new CommandHandler_1.default(pubgApi, playerCache);
const slackAdapter = new SlackAdapter_1.default(slacRtmApi, usersMap, commandHandler);
slackAdapter.start();
//# sourceMappingURL=app.js.map