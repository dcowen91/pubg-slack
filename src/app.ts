import Bot from './Models/Bot';
import UsersMap from './Models/UsersMap';
import CommandAdapter from './Models/CommandAdapter';
import SlackAdapter from './Models/SlackAdapter';
import {PubgAPI} from 'pubg-api-redis';
import {RtmClient} from '@slack/client';
import * as process from 'process';

const pubgApi = new PubgAPI({
	apikey: process.env.PUBG_BOT_TOKEN
});

const rtmSlackApi = new RtmClient(process.env.SLACK_BOT_TOKEN);

const usersMap = new UsersMap();
const commandAdapter = new CommandAdapter(pubgApi);
const slackAdapter = new SlackAdapter(rtmSlackApi, usersMap, commandAdapter);
const bot = new Bot(usersMap, commandAdapter, slackAdapter);

bot.start();

/* TODOs:
 * 1. project structure (folders)
 * 2. project structure (combine / split out classes)
 * 3. separate interfaces
 * 4. error handling (no stats for a region, no stats, etc)
 * 5. querying by username (summit1g)
 * 6. add username handling
 * 7. unify the command structure
 * 6. slackAdapter make better
 */
