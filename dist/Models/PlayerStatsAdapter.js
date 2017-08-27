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
                str += '*' + gameType.Match + '*: ';
                for (const j in stats) {
                    console.log(j);
                    str += this.formatDisplayValue(gameType.Stats[stats[j]]) + '\n';
                }
            }
        }
        return str;
    }
    printStat(stat, secondaryStat) {
        let str = '';
        for (const i in this.statsCollection.Stats) {
            const gameType = this.statsCollection.Stats[i];
            if (gameType.Region === this.currentRegion && gameType.Season === this.currentSeason) {
                const detail = secondaryStat ? ' (' + this.formatDisplayValue(gameType.Stats[secondaryStat]) + ')' : '';
                str += '*' + gameType.Match + '*: ' + this.formatDisplayValue(gameType.Stats[stat]) + detail + '\n';
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