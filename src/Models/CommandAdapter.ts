import {PubgAPI} from 'pubg-api-redis';
import {PlayerStats, StatName} from './pubgStats';
import PlayerStatsAdapter from './PlayerStatsAdapter';

class CommandAdapter
{
	api: PubgAPI;

	constructor(api: PubgAPI)
	{
		this.api = api;
	}

	handleCommand(userName: string, commandText: string): Promise<string>
	{
		// TODO ALL THIS

		// if is valid command {}
		console.log('henlo');
		return this.api.profile.byNickname(userName).then((playerStats: PlayerStats) => {
			console.log('henlo');
			const adapter = new PlayerStatsAdapter(playerStats);
			console.log('henlo');
			switch (commandText) {
				case 'stats':
				{
					return adapter.printStat(StatName.Rating,  StatName.RoundsPlayed);
				}
				case 'kd':
				case 'kdr':
				{
					return adapter.printStat(StatName.KillDeathRatio);
				}
				case 'wins':
				{
					return adapter.printStat(StatName.Wins, StatName.WinRatio);
				}
				case 'top10':
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