import {PlayerStats} from '../InterFaces/PlayerStats';
import {StatName} from '../Enums/StatName';
import {PubgStats} from '../InterFaces/PubgStats';

class PlayerStatsAdapter
{
	statsCollection: PlayerStats;

	constructor(stats: PlayerStats)
	{
		this.statsCollection = stats;
	}

	printStat(stat: StatName, secondaryStat?: StatName): string
	{
		let str = '';
		for (const i in this.statsCollection.Stats)
		{
			const gameType = this.statsCollection.Stats[i];
			if (gameType.Region === 'na')
			{
				const detail = secondaryStat ? ' (' + this.formatDisplayValue(gameType.Stats[secondaryStat]) + ')' : '';
				// TODO format string
				str += '*' + gameType.Match + '*: ' + this.formatDisplayValue(gameType.Stats[stat]) + detail + '\n';
			}
		}
		return str;
	}

	formatDisplayValue(statObject: PubgStats): string
	{
		return statObject.displayValue + ' ' + statObject.label;
	}

}

export default PlayerStatsAdapter;