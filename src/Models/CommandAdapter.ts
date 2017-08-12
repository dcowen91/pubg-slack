import {PubgAPI} from 'pubg-api-redis';
import {PlayerStats} from '../Interfaces/PlayerStats';
import {StatName} from '../Enums/StatName';
// import {CommandName} from '../Enums/CommandName';
import PlayerStatsAdapter from './PlayerStatsAdapter';

class CommandAdapter
{
	commandNames = [
		'stats',
		'kdr',
		'wins',
		'top10',
		'adduser',
		'help'
	];

	api: PubgAPI;

	constructor(api: PubgAPI)
	{
		this.api = api;
	}

	isValidCommand(commandText: string): Boolean
	{
		return this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
	}

	handleCommand(userName: string, commandText: string): Promise<string>
	{
		// TODO add more cases
		// TODO add check if it is valid command
		// TODO refactor to support printing solostats or stats grouped by region
		return this.api.profile.byNickname(userName).then((playerStats: PlayerStats) => {
			const adapter = new PlayerStatsAdapter(playerStats);
			switch (commandText.toLocaleLowerCase()) {
				case this.commandNames[0]:
				{
					return adapter.printStat(StatName.Rating,  StatName.RoundsPlayed)
					+ adapter.printStat(StatName.KillDeathRatio)
					+ adapter.printStat(StatName.Wins, StatName.WinRatio)
					+ adapter.printStat(StatName.Top10s, StatName.Top10Ratio);
				}
				case this.commandNames[1]:
				{
					return adapter.printStat(StatName.KillDeathRatio);
				}
				case this.commandNames[2]:
				{
					return adapter.printStat(StatName.Wins, StatName.WinRatio);
				}
				case this.commandNames[3]:
				{
					return adapter.printStat(StatName.Top10s, StatName.Top10Ratio);
				}
				default:
					break;
			}
			return Promise.reject('not supported ' + userName);
		});
	}
}

export default CommandAdapter;