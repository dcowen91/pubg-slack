import {PlayerStats} from '../InterFaces/PlayerStats';
import {StatName} from '../Enums/StatName';
import {PubgStats} from '../InterFaces/PubgStats';

// TODO this is not really an adapter, rename
class PlayerStatsAdapter
{
	currentSeason = '2017-pre3';
	currentRegion = 'na';
	statsCollection: PlayerStats;

	constructor(stats: PlayerStats)
	{
		this.statsCollection = stats;
	}

	printStats(stats: [StatName]): string
	{
		let str = '';
		const lineLength = 25;
		for (const i in this.statsCollection.Stats)
		{
			const gameType = this.statsCollection.Stats[i];
			if (gameType.Region === this.currentRegion && gameType.Season === this.currentSeason)
			{
				str += '*' + gameType.Match + '*:\n';
				for (const j in stats)
				{
					const commandDisplayString = this.formatDisplayValue(gameType.Stats[stats[j]]);
					const currentLength = commandDisplayString.length;
					let divider = '\n';
					if ((j as any) % 2 === 0)
					{
						const count = Math.ceil((lineLength - currentLength) / 2);
						console.log(gameType.Stats[stats[j]].label + ' length: ' + currentLength);
						console.log('tab count: ' + count);
						console.log('total length for line:' + (count * 2 + currentLength));
						divider = '\t'.repeat(count);
					}
					str += commandDisplayString + divider;
				}
			}

		}
		return str;
	}

	printStat(stat: StatName, secondaryStat?: StatName): string
	{
		let str = '';
		for (const i in this.statsCollection.Stats)
		{
			const gameType = this.statsCollection.Stats[i];
			if (gameType.Region === this.currentRegion && gameType.Season === this.currentSeason)
			{
				const detail = secondaryStat ? ' (' + this.formatDisplayValue(gameType.Stats[secondaryStat]) + ')' : '';
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