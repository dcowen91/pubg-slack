import {PubgStats} from './PubgStats';

export interface GameType
{
	Region: string;
	Season: string;
	Match: string;
	Stats: { [index: number]: PubgStats};
}