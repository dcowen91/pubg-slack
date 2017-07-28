import {PubgAPI} from 'pubg-api-redis';
import {PlayerStats, StatName} from './pubgStats';

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
		const result = 'not supported ' + userName;
		switch (commandText) {
			case 'stats':
			{
				return this.api.profile.byNickname(userName).then((playerStats: PlayerStats) => {
					let str = '';
					for (const i in playerStats.Stats)
					{
						const gameType = playerStats.Stats[i];
						if (gameType.Region === 'na')
						{
							// TODO format string
							str += '*' + gameType.Match + '*: ' + gameType.Stats[StatName.Rating].displayValue + ' ' + gameType.Stats[StatName.Rating].label + ' (' + gameType.Stats[StatName.RoundsPlayed].displayValue + ' ' + gameType.Stats[StatName.RoundsPlayed].label + ')\n';
						}
					}
					return str;
				});
			}
			case 'kd':
			case 'kdr':
			{
				return this.api.profile.byNickname(userName).then((data) => {
					console.log(data.Stats);
					console.log(data.Stats[0].Stats);
					return data.Stats[0].Match + ': ' + data.Stats[0].Stats[0].label + ' : ' + data.Stats[0].Stats[0].displayValue + '(top ' + data.Stats[0].Stats[0].percentile +  ')';
				});
			}
			case 'rating':
			{
				console.log('rating');
				break;
			}
			case 'wins':
			{
				console.log('wins');
				break;
			}
			case 'top10':
			{
				console.log('top10');
				break;
			}
			default:
				break;
		}
		return Promise.reject(result);
	}
}

export default CommandAdapter;