"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatName_1 = require("../Enums/StatName");
const PlayerStatsAdapter_1 = require("./PlayerStatsAdapter");
class CommandAdapter {
    constructor(api, playerCache) {
        this.commandNames = [
            'rating',
            'kdr',
            'wins',
            'top10s',
            'bestrating',
            'teamwork',
            'vehicle',
            'records',
            'timealive',
            'distance',
            'headshot',
            'health',
            'random',
            'details',
            'adduser',
            'help'
        ];
        this.api = api;
        this.playerCache = playerCache;
    }
    isValidCommand(commandText) {
        return !!commandText && this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
    }
    handleCommand(userName, commandText) {
        return this.getPlayerStats(userName).then((playerStats) => {
            console.log('making wrapper');
            const adapter = new PlayerStatsAdapter_1.default(playerStats);
            console.log('getting command response');
            return this.getCommandText(commandText.toLocaleLowerCase(), adapter);
        }, () => {
            return 'failed to find user ' + userName;
        });
    }
    getPlayerStats(userName) {
        const cachedValue = this.playerCache.getPlayer(userName).stats;
        if (!!cachedValue) {
            return Promise.resolve(cachedValue);
        }
        else {
            console.log('querying');
            return this.api.getProfileByNickname(userName).then((playerStats) => {
                console.log('profile');
                console.log(playerStats);
                this.playerCache.addPlayer(userName, playerStats);
                console.log('stored to cache');
                return playerStats;
            });
        }
    }
    getCommandText(commandText, adapter) {
        switch (commandText) {
            case this.commandNames[0]:
                {
                    return adapter.printStats([StatName_1.default.Rating, StatName_1.default.RoundsPlayed]);
                }
            case this.commandNames[1]:
                {
                    return adapter.printStats([StatName_1.default.KillDeathRatio, StatName_1.default.DamagePg]);
                }
            case this.commandNames[2]:
                {
                    return adapter.printStats([StatName_1.default.Wins, StatName_1.default.WinRatio]);
                }
            case this.commandNames[3]:
                {
                    return adapter.printStats([StatName_1.default.Top10s, StatName_1.default.Top10Ratio]);
                }
            case this.commandNames[4]:
                {
                    return adapter.printStats([StatName_1.default.BestRating, StatName_1.default.BestRank]);
                }
            case this.commandNames[5]:
                {
                    return adapter.printStats([StatName_1.default.TeamKills, StatName_1.default.Suicides]);
                }
            case this.commandNames[6]:
                {
                    return adapter.printStats([StatName_1.default.RoadKills, StatName_1.default.VehicleDestroys]);
                }
            case this.commandNames[7]:
                {
                    return adapter.printStats([StatName_1.default.RoundMostKills, StatName_1.default.LongestKill]);
                }
            case this.commandNames[8]:
                {
                    return adapter.printStats([StatName_1.default.LongestTimeSurvived, StatName_1.default.AvgSurvivalTime]);
                }
            case this.commandNames[9]:
                {
                    return adapter.printStats([StatName_1.default.MoveDistancePg, StatName_1.default.AvgRideDistance]);
                }
            case this.commandNames[10]:
                {
                    return adapter.printStats([StatName_1.default.HeadshotKillRatio, StatName_1.default.HeadshotKillsPg]);
                }
            case this.commandNames[11]:
                {
                    return adapter.printStats([StatName_1.default.RevivesPg, StatName_1.default.HealsPg]);
                }
            case this.commandNames[12]:
                {
                    const randomStat = Math.floor(Math.random() * 12);
                    return this.getCommandText(this.commandNames[randomStat], adapter);
                }
            case this.commandNames[13]:
                {
                    return adapter.printStats([StatName_1.default.Rating, StatName_1.default.RoundsPlayed, StatName_1.default.Wins, StatName_1.default.Top10s, StatName_1.default.KillDeathRatio]);
                }
            default:
                break;
        }
        return 'not supported ' + commandText;
    }
}
exports.default = CommandAdapter;
//# sourceMappingURL=CommandAdapter.js.map