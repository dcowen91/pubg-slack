"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatName_1 = require("../Enums/StatName");
const PlayerStatsAdapter_1 = require("./PlayerStatsAdapter");
class CommandAdapter {
    constructor(api) {
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
    }
    isValidCommand(commandText) {
        return this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
    }
    handleCommand(userName, commandText) {
        return this.api.profile.byNickname(userName).then((playerStats) => {
            const adapter = new PlayerStatsAdapter_1.default(playerStats);
            return this.getCommandText(commandText.toLocaleLowerCase(), adapter);
        });
    }
    getCommandText(commandText, adapter) {
        switch (commandText) {
            case this.commandNames[0]:
                {
                    return adapter.printStat(StatName_1.StatName.Rating, StatName_1.StatName.RoundsPlayed);
                }
            case this.commandNames[1]:
                {
                    return adapter.printStat(StatName_1.StatName.KillDeathRatio, StatName_1.StatName.DamagePg);
                }
            case this.commandNames[2]:
                {
                    return adapter.printStat(StatName_1.StatName.Wins, StatName_1.StatName.WinRatio);
                }
            case this.commandNames[3]:
                {
                    return adapter.printStat(StatName_1.StatName.Top10s, StatName_1.StatName.Top10Ratio);
                }
            case this.commandNames[4]:
                {
                    return adapter.printStat(StatName_1.StatName.BestRating, StatName_1.StatName.BestRank);
                }
            case this.commandNames[5]:
                {
                    return adapter.printStat(StatName_1.StatName.TeamKills, StatName_1.StatName.Suicides);
                }
            case this.commandNames[6]:
                {
                    return adapter.printStat(StatName_1.StatName.RoadKills, StatName_1.StatName.VehicleDestroys);
                }
            case this.commandNames[7]:
                {
                    return adapter.printStat(StatName_1.StatName.RoundMostKills, StatName_1.StatName.LongestKill);
                }
            case this.commandNames[8]:
                {
                    return adapter.printStat(StatName_1.StatName.LongestTimeSurvived, StatName_1.StatName.AvgSurvivalTime);
                }
            case this.commandNames[9]:
                {
                    return adapter.printStat(StatName_1.StatName.MoveDistancePg, StatName_1.StatName.AvgRideDistance);
                }
            case this.commandNames[10]:
                {
                    return adapter.printStat(StatName_1.StatName.HeadshotKillRatio, StatName_1.StatName.HeadshotKillsPg);
                }
            case this.commandNames[11]:
                {
                    return adapter.printStat(StatName_1.StatName.RevivesPg, StatName_1.StatName.HealsPg);
                }
            case this.commandNames[12]:
                {
                    const randomStat = Math.floor(Math.random() * 12);
                    return this.getCommandText(this.commandNames[randomStat], adapter);
                }
            case this.commandNames[13]:
                {
                    return this.getCommandText(this.commandNames[0], adapter)
                        + this.getCommandText(this.commandNames[4], adapter)
                        + this.getCommandText(this.commandNames[2], adapter)
                        + this.getCommandText(this.commandNames[3], adapter)
                        + this.getCommandText(this.commandNames[1], adapter);
                }
            default:
                break;
        }
        return 'not supported ' + commandText;
    }
}
exports.default = CommandAdapter;
//# sourceMappingURL=CommandAdapter.js.map