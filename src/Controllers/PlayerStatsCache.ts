import PlayerStatsCacheValue from '../InterFaces/PlayerStatsCacheValue';
import PlayerStats from '../InterFaces/PlayerStats';

class PlayerStatsCache
{
	private innerCache: {[userName: string]: PlayerStatsCacheValue};

	// 5 minutes
	private invalidationTime = 1000 * 60 * 5;

	constructor()
	{
		this.innerCache = {};
	}

	getPlayer(name: string): PlayerStatsCacheValue
	{
		const value = this.innerCache[name];
		const calculatedDateTime = new Date(Date.now() - this.invalidationTime);
		if (!!value && !!(value.stats as PlayerStats) && (calculatedDateTime) < value.timeStamp)
		{
			return this.innerCache[name];
		}
		return {} as PlayerStatsCacheValue;
	}

	addPlayer(userName: string, stats: PlayerStats)
	{
		const timeStamp: Date = new Date();
		this.innerCache[userName] = {stats, timeStamp};
	}
}

export default PlayerStatsCache;