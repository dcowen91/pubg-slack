"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsAdapter {
    constructor(stats) {
        this.currentSeason = '2017-pre3';
        this.currentRegion = 'na';
        this.statsCollection = stats;
    }
    printStats(stats) {
        let str = '';
        for (const i in this.statsCollection.Stats) {
            const gameType = this.statsCollection.Stats[i];
            if (gameType.Region === this.currentRegion && gameType.Season === this.currentSeason) {
                str += '*' + gameType.Match + '*:\n';
                for (const j in stats) {
                    const commandDisplayString = this.formatDisplayValue(gameType.Stats[stats[j]]);
                    const divider = '\n';
                    str += commandDisplayString + divider;
                }
            }
        }
        return str;
    }
    formatDisplayValue(statObject) {
        return statObject.displayValue + ' ' + statObject.label;
    }
}
exports.default = PlayerStatsAdapter;
//# sourceMappingURL=PlayerStatsAdapter.js.map