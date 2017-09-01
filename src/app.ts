import UsersMap from './Models/UsersMap';
import CommandAdapter from './Models/CommandAdapter';
import PlayerStatsCache from './Models/PlayerStatsCache';
import SlackAdapter from './Models/SlackAdapter';
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
const commandAdapter = new CommandAdapter(pubgApi, playerCache);
const slackAdapter = new SlackAdapter(rtmSlackApi, usersMap, commandAdapter);

slackAdapter.start();

/* TODOs:
 * 1. project structure (folders)
 * 2. project structure (combine / split out classes)
 * 3. error handling (no stats for a region, no stats, etc)
 * 4. fix adduser username handling
 * 5. unify the command structure
 * 6. slackAdapter make better
 */
