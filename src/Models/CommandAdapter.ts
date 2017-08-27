import {PubgAPI} from 'pubg-api-redis';
import {PlayerStats} from '../Interfaces/PlayerStats';
import {StatName} from '../Enums/StatName';
import PlayerStatsCache from './PlayerStatsCache';
import PlayerStatsAdapter from './PlayerStatsAdapter';

class CommandAdapter
{
	private commandNames: string[] = [
		'rating',
		'kdr',
		'wins',
		'top10s',
		'bestrating',
		'teamwork',
		'vehicle',
		'records',
		'timealive',
		'distance',
		'headshot',
		'health',
		'random',
		'details',
		'adduser',
		'help'
	];

	private api: PubgAPI;
	private playerCache: PlayerStatsCache;

	constructor(api: PubgAPI, playerCache: PlayerStatsCache)
	{
		this.api = api;
		this.playerCache = playerCache;
	}

	isValidCommand(commandText: string): Boolean
	{
		return this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
	}

	handleCommand(userName: string, commandText: string): Promise<string>
	{
		return this.getPlayerStats(userName).then((playerStats: PlayerStats) => {
			const adapter = new PlayerStatsAdapter(playerStats);
			return this.getCommandText(commandText.toLocaleLowerCase(), adapter);
		});
	}

	private getPlayerStats(userName): Promise<PlayerStats>
	{
		const cachedValue = this.playerCache.getPlayer(userName).stats;
		if (!!cachedValue)
		{
			return Promise.resolve(cachedValue);
		}
		else
		{
			return this.api.profile.byNickname(userName).then((playerStats: PlayerStats) => {
				this.playerCache.addPlayer(userName, playerStats);
				return playerStats;
			});
		}
	}

	private getCommandText(commandText: string, adapter: PlayerStatsAdapter)
	{
		switch (commandText) {
			// TODO separate function for child stat vs two important stats
			case this.commandNames[0]:
			{
				return adapter.printStat(StatName.Rating,  StatName.RoundsPlayed);
			}
			case this.commandNames[1]:
			{
				return adapter.printStat(StatName.KillDeathRatio, StatName.DamagePg);
			}
			case this.commandNames[2]:
			{
				return adapter.printStat(StatName.Wins, StatName.WinRatio);
			}
			case this.commandNames[3]:
			{
				return adapter.printStat(StatName.Top10s, StatName.Top10Ratio);
			}
			case this.commandNames[4]:
			{
				return adapter.printStat(StatName. BestRating, StatName.BestRank);
			}
			case this.commandNames[5]:
			{
				return adapter.printStat(StatName.TeamKills, StatName.Suicides);
			}
			case this.commandNames[6]:
			{
				return adapter.printStat(StatName.RoadKills, StatName.VehicleDestroys);
			}
			case this.commandNames[7]:
			{
				return adapter.printStat(StatName.RoundMostKills, StatName.LongestKill);
			}
			case this.commandNames[8]:
			{
				return adapter.printStat(StatName.LongestTimeSurvived, StatName.AvgSurvivalTime);
			}
			case this.commandNames[9]:
			{
				return adapter.printStat(StatName.MoveDistancePg, StatName.AvgRideDistance);
			}
			case this.commandNames[10]:
			{
				return adapter.printStat(StatName.HeadshotKillRatio, StatName.HeadshotKillsPg);
			}
			case this.commandNames[11]:
			{
				return adapter.printStat(StatName.RevivesPg, StatName.HealsPg);
			}
			case this.commandNames[12]:
			{
				// 12 is the # of valid individual commands (index of the previous case)
				const randomStat = Math.floor(Math.random() * 12);
				return this.getCommandText(this.commandNames[randomStat], adapter);
			}
			case this.commandNames[13]:
			{
				// TODO figure out how to group these by playmode- pass region to adapter.printStat?
				return  adapter.printStats([StatName.Rating, StatName.RoundsPlayed, StatName.KillDeathRatio, StatName.DamagePg, StatName.Wins, StatName.WinRatio, StatName.Top10s, StatName.Top10Ratio, StatName. BestRating, StatName.BestRank]);
				// return this.getCommandText(this.commandNames[0], adapter)
				// + this.getCommandText(this.commandNames[4], adapter)
				// + this.getCommandText(this.commandNames[2], adapter)
				// + this.getCommandText(this.commandNames[3], adapter)
				// + this.getCommandText(this.commandNames[1], adapter);
			}
			default:
				break;
		}
		return 'not supported ' + commandText;
	}
}

export default CommandAdapter;