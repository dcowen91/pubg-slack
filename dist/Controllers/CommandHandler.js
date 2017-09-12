"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatName_1 = require("../Enums/StatName");
const PlayerStatsWrapper_1 = require("./PlayerStatsWrapper");
class CommandHandler {
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
            const wrapper = new PlayerStatsWrapper_1.default(playerStats);
            return this.getCommandText(commandText.toLocaleLowerCase(), wrapper);
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
            return this.api.getProfileByNickname(userName).then((playerStats) => {
                this.playerCache.addPlayer(userName, playerStats);
                return playerStats;
            });
        }
    }
    getCommandText(commandText, wrapper) {
        switch (commandText) {
            case this.commandNames[0]:
                {
                    return wrapper.printStats([StatName_1.default.Rating, StatName_1.default.RoundsPlayed]);
                }
            case this.commandNames[1]:
                {
                    return wrapper.printStats([StatName_1.default.KillDeathRatio, StatName_1.default.DamagePg]);
                }
            case this.commandNames[2]:
                {
                    return wrapper.printStats([StatName_1.default.Wins, StatName_1.default.WinRatio]);
                }
            case this.commandNames[3]:
                {
                    return wrapper.printStats([StatName_1.default.Top10s, StatName_1.default.Top10Ratio]);
                }
            case this.commandNames[4]:
                {
                    return wrapper.printStats([StatName_1.default.BestRating, StatName_1.default.BestRank]);
                }
            case this.commandNames[5]:
                {
                    return wrapper.printStats([StatName_1.default.TeamKills, StatName_1.default.Suicides]);
                }
            case this.commandNames[6]:
                {
                    return wrapper.printStats([StatName_1.default.RoadKills, StatName_1.default.VehicleDestroys]);
                }
            case this.commandNames[7]:
                {
                    return wrapper.printStats([StatName_1.default.RoundMostKills, StatName_1.default.LongestKill]);
                }
            case this.commandNames[8]:
                {
                    return wrapper.printStats([StatName_1.default.LongestTimeSurvived, StatName_1.default.AvgSurvivalTime]);
                }
            case this.commandNames[9]:
                {
                    return wrapper.printStats([StatName_1.default.MoveDistancePg, StatName_1.default.AvgRideDistance]);
                }
            case this.commandNames[10]:
                {
                    return wrapper.printStats([StatName_1.default.HeadshotKillRatio, StatName_1.default.HeadshotKillsPg]);
                }
            case this.commandNames[11]:
                {
                    return wrapper.printStats([StatName_1.default.RevivesPg, StatName_1.default.HealsPg]);
                }
            case this.commandNames[12]:
                {
                    const randomStat = Math.floor(Math.random() * 12);
                    return this.getCommandText(this.commandNames[randomStat], wrapper);
                }
            case this.commandNames[13]:
                {
                    return wrapper.printStats([StatName_1.default.Rating, StatName_1.default.RoundsPlayed, StatName_1.default.Wins, StatName_1.default.Top10s, StatName_1.default.KillDeathRatio]);
                }
            default:
                break;
        }
        return 'not supported ' + commandText;
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map