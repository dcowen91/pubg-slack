import UsersMap from './Controllers/UsersMap';
import CommandHandler from './Controllers/CommandHandler';
import PlayerStatsCache from './Controllers/PlayerStatsCache';
import SlackAdapter from './Controllers/SlackAdapter';
import {PubgAPI} from 'pubg-api-redis';
import {RtmClient} from '@slack/client';
import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

const pubgApi = new PubgAPI({
	apikey: process.env.PUBG_BOT_TOKEN
});

const rtmSlackApi = new RtmClient(process.env.SLACK_BOT_TOKEN);

const usersMap = new UsersMap();
const playerCache = new PlayerStatsCache();
const commandHandler = new CommandHandler(pubgApi, playerCache);
const slackAdapter = new SlackAdapter(rtmSlackApi, usersMap, commandHandler);

slackAdapter.start();