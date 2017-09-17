import PlayerStats from '../InterFaces/PlayerStats';
import StatName from '../Enums/StatName';
import PubgStats from '../InterFaces/PubgStats';
import {REGION, SEASON} from 'pubg-api-redis';

class PlayerStatsWrapper
{
	statsCollection: PlayerStats;

	constructor(stats: PlayerStats)
	{
		this.statsCollection = stats;
	}

	printStats(stats: [StatName]): string
	{
		let str = '';
		for (const i in this.statsCollection.stats)
		{
			const gameType = this.statsCollection.stats[i];
			if (gameType.Region === REGION.NA && gameType.Season === SEASON.EA2017pre4)
			{
				str += '*' + gameType.Match + '*:\n';
				for (const j in stats)
				{
					const commandDisplayString = this.formatDisplayValue(gameType.Stats[stats[j]]);
					const divider = '\n';
					str += commandDisplayString + divider;
				}
			}
		}
		if (str === '')
		{
			str += `no stats found for ${SEASON.EA2017pre4} season`;
		}
		return str;
	}

	formatDisplayValue(statObject: PubgStats): string
	{
		return statObject.displayValue + ' ' + statObject.label;
	}

}

export default PlayerStatsWrapper;