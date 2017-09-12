import PubgStats from './PubgStats';

export default interface GameType
{
	Region: string;
	Season: string;
	Match: string;
	Stats: { [index: number]: PubgStats};
}