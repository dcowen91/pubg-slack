"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubgStats_1 = require("./pubgStats");
const PlayerStatsAdapter_1 = require("./PlayerStatsAdapter");
class CommandAdapter {
    constructor(api) {
        this.api = api;
    }
    handleCommand(userName, commandText) {
        console.log('henlo');
        return this.api.profile.byNickname(userName).then((playerStats) => {
            console.log('henlo');
            const adapter = new PlayerStatsAdapter_1.default(playerStats);
            console.log('henlo');
            switch (commandText) {
                case 'stats':
                    {
                        return adapter.printStat(pubgStats_1.StatName.Rating, pubgStats_1.StatName.RoundsPlayed);
                    }
                case 'kd':
                case 'kdr':
                    {
                        return adapter.printStat(pubgStats_1.StatName.KillDeathRatio);
                    }
                case 'wins':
                    {
                        return adapter.printStat(pubgStats_1.StatName.Wins, pubgStats_1.StatName.WinRatio);
                    }
                case 'top10':
                    {
                        return adapter.printStat(pubgStats_1.StatName.Top10s, pubgStats_1.StatName.Top10Ratio);
                    }
                default:
                    break;
            }
            return Promise.reject('not supported ' + userName);
        });
    }
}
exports.default = CommandAdapter;
//# sourceMappingURL=CommandAdapter.js.map