import {GameType} from './GameType';

export interface PlayerStats
{
	selectedRegion: string;
	seasonDisplay: string;
	LastUpdated: Date;
	Stats: { [index: number]: GameType};
	PlayerName: string;
}