export default interface PubgStats
{
	label: string;
	subLabel?: string;
	field: string;
	category: string;
	valueInt?: number;
	valueDec?: number;
	value: string;
	rank?: number;
	percentile: number;
	displayValue: string;
}