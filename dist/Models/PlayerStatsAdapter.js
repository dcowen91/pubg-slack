"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsAdapter {
    constructor(stats) {
        this.currentSeason = '2017-pre3';
        this.currentRegion = 'na';
        this.statsCollection = stats;
    }
    printStats(stats) {
        console.log('printing stats');
        console.log(this.statsCollection);
        console.log(this.statsCollection.stats);
        console.log(this);
        let str = '';
        for (const i in this.statsCollection.stats) {
            const gameType = this.statsCollection.stats[i];
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