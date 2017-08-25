import {PlayerStatsCacheValue} from '../InterFaces/PlayerStatsCacheValue';
import {PlayerStats} from '../InterFaces/PlayerStats';

class PlayerStatsCache
{
	private innerCache: {[userName: string]: PlayerStatsCacheValue};
	private invalidationTime;

	// Key {username: string}
	// Value {stats: PlayerStats, timeStamp: dateTime}
	// TODO: Make singleton?
	constructor(time: number)
	{
		this.innerCache = {};
		this.invalidationTime = time;
	}

	getPlayer(name: string): PlayerStatsCacheValue
	{
		const value = this.innerCache[name];
		const calculatedDateTime = new Date(Date.now() - this.invalidationTime);
		if (!!value && !!(value.stats as PlayerStats) && (calculatedDateTime.toUTCString()) < value.timeStamp.toUTCString())
		{
			return this.innerCache[name];
		}
		else return {} as PlayerStatsCacheValue;
	}
}

export default PlayerStatsCache;