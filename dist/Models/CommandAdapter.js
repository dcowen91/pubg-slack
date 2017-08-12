"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatName_1 = require("../Enums/StatName");
const PlayerStatsAdapter_1 = require("./PlayerStatsAdapter");
class CommandAdapter {
    constructor(api) {
        this.commandNames = [
            'stats',
            'kdr',
            'wins',
            'top10',
            'adduser'
        ];
        this.api = api;
    }
    isValidCommand(commandText) {
        return this.commandNames.indexOf(commandText.toLocaleLowerCase()) >= 0;
    }
    handleCommand(userName, commandText) {
        return this.api.profile.byNickname(userName).then((playerStats) => {
            const adapter = new PlayerStatsAdapter_1.default(playerStats);
            switch (commandText.toLocaleLowerCase()) {
                case this.commandNames[0]:
                    {
                        return adapter.printStat(StatName_1.StatName.Rating, StatName_1.StatName.RoundsPlayed)
                            + adapter.printStat(StatName_1.StatName.KillDeathRatio)
                            + adapter.printStat(StatName_1.StatName.Wins, StatName_1.StatName.WinRatio)
                            + adapter.printStat(StatName_1.StatName.Top10s, StatName_1.StatName.Top10Ratio);
                    }
                case this.commandNames[1]:
                    {
                        return adapter.printStat(StatName_1.StatName.KillDeathRatio);
                    }
                case this.commandNames[2]:
                    {
                        return adapter.printStat(StatName_1.StatName.Wins, StatName_1.StatName.WinRatio);
                    }
                case this.commandNames[3]:
                    {
                        return adapter.printStat(StatName_1.StatName.Top10s, StatName_1.StatName.Top10Ratio);
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