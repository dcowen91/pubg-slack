import GameType from './GameType';

export default interface PlayerStats
{
	selectedRegion: string;
	seasonDisplay: string;
	LastUpdated: Date;
	stats: { [index: number]: GameType};
	PlayerName: string;
}