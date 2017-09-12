import {PubgAPI} from 'pubg-api-redis';
import PlayerStats from '../Interfaces/PlayerStats';
import StatName from '../Enums/StatName';
import PlayerStatsCache from './PlayerStatsCache';
import PlayerStatsWrapper from './PlayerStatsWrapper';

class CommandHandler
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
		return !!commandText && this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
	}

	handleCommand(userName: string, commandText: string): Promise<string>
	{
		return this.getPlayerStats(userName).then((playerStats: PlayerStats) => {
			const wrapper = new PlayerStatsWrapper(playerStats);
			return this.getCommandText(commandText.toLocaleLowerCase(), wrapper);
		}, () => {
			return 'failed to find user ' + userName;
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
			return this.api.getProfileByNickname(userName).then((playerStats: PlayerStats) => {
				this.playerCache.addPlayer(userName, playerStats);
				return playerStats;
			});
		}
	}

	private getCommandText(commandText: string, wrapper: PlayerStatsWrapper)
	{
		switch (commandText) {
			case this.commandNames[0]:
			{
				return wrapper.printStats([StatName.Rating,  StatName.RoundsPlayed]);
			}
			case this.commandNames[1]:
			{
				return wrapper.printStats([StatName.KillDeathRatio, StatName.DamagePg]);
			}
			case this.commandNames[2]:
			{
				return wrapper.printStats([StatName.Wins, StatName.WinRatio]);
			}
			case this.commandNames[3]:
			{
				return wrapper.printStats([StatName.Top10s, StatName.Top10Ratio]);
			}
			case this.commandNames[4]:
			{
				return wrapper.printStats([StatName. BestRating, StatName.BestRank]);
			}
			case this.commandNames[5]:
			{
				return wrapper.printStats([StatName.TeamKills, StatName.Suicides]);
			}
			case this.commandNames[6]:
			{
				return wrapper.printStats([StatName.RoadKills, StatName.VehicleDestroys]);
			}
			case this.commandNames[7]:
			{
				return wrapper.printStats([StatName.RoundMostKills, StatName.LongestKill]);
			}
			case this.commandNames[8]:
			{
				return wrapper.printStats([StatName.LongestTimeSurvived, StatName.AvgSurvivalTime]);
			}
			case this.commandNames[9]:
			{
				return wrapper.printStats([StatName.MoveDistancePg, StatName.AvgRideDistance]);
			}
			case this.commandNames[10]:
			{
				return wrapper.printStats([StatName.HeadshotKillRatio, StatName.HeadshotKillsPg]);
			}
			case this.commandNames[11]:
			{
				return wrapper.printStats([StatName.RevivesPg, StatName.HealsPg]);
			}
			case this.commandNames[12]:
			{
				// 12 is the # of valid individual commands (index of the previous case)
				const randomStat = Math.floor(Math.random() * 12);
				return this.getCommandText(this.commandNames[randomStat], wrapper);
			}
			case this.commandNames[13]:
			{
				return  wrapper.printStats([StatName.Rating, StatName.RoundsPlayed, StatName.Wins, StatName.Top10s, StatName.KillDeathRatio]);
			}
			default:
				break;
		}
		return 'not supported ' + commandText;
	}
}

export default CommandHandler;