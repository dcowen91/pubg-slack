export interface PlayerStats
{
	selectedRegion: string;
	seasonDisplay: string;
	LastUpdated: Date;
	Stats: { [index: number]: GameType};
	PlayerName: string;
}

export interface GameType
{
	Region: string;
	Season: string;
	Match: string;
	Stats: { [index: number]: PubgStats};
}

export interface PubgStats
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

export enum StatName
{
	KillDeathRatio = 0,
	WinRatio,
	TimeSurvived,
	RoundsPlayed,
	Wins,
	WinTop10Ratio,
	Top10s,
	Top10Ratio,
	Losses,
	Rating,
	BestRating,
	DamagePg,
	HeadshotKillsPg,
	HealsPg,
	KillsPg,
	MoveDistancePg,
	RevivesPg,
	RoadKillsPg,
	TeamKillsPg,
	TimeSurvivedPg,
	Top10sPg,
	Kills,
	Assists,
	Suicides,
	TeamKills,
	HeadshotKills,
	HeadshotKillRatio,
	VehicleDestroys,
	RoadKills,
	DailyKills,
	WeeklyKills,
	RoundMostKills,
	MaxKillStreaks,
	WeaponsAcquired,
	Days,
	LongestTimeSurvived,
	MostSurvivalTime,
	AvgSurvivalTime,
	WinPoints,
	WalkDistance,
	RideDistance,
	MoveDistance,
	AvgWalkDistance,
	AvgRideDistance,
	LongestKill,
	Heals,
	Revives,
	Boosts,
	DamageDealt,
	DBNOs
}