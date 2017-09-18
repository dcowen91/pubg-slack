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
		// TODO pass season into query from caller to simplify this
		const validSeasons = [SEASON.EA2017pre4, SEASON.EA2017pre3];
		for (const i in this.statsCollection.stats)
		{
			const gameType = this.statsCollection.stats[i];
			if (gameType.Region === REGION.NA && gameType.Season === validSeasons[0])
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
			let foundStats = false;
			for (const i in this.statsCollection.stats)
			{
				const gameType = this.statsCollection.stats[i];
				if (gameType.Region === REGION.NA && gameType.Season === validSeasons[1])
				{
					if (!foundStats)
					{
						str += 'no stats found for' +  SEASON.EA2017pre4 + ' season. Stats from ' + SEASON.EA2017pre3 + ' Season:\n';
						foundStats = true;
					}
					str += '*' + gameType.Match + '*:\n';
					for (const j in stats)
					{
						const commandDisplayString = this.formatDisplayValue(gameType.Stats[stats[j]]);
						const divider = '\n';
						str += commandDisplayString + divider;
					}
				}
			}
		}
		if (str === '')
		{
			str += 'no stats found for past two seasons.';
		}
		return str;
	}

	formatDisplayValue(statObject: PubgStats): string
	{
		return statObject.displayValue + ' ' + statObject.label;
	}

}

export default PlayerStatsWrapper;