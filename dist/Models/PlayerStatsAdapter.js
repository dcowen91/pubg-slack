"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsAdapter {
    constructor(stats) {
        this.statsCollection = stats;
    }
    printStat(stat, secondaryStat) {
        let str = '';
        for (const i in this.statsCollection.Stats) {
            const gameType = this.statsCollection.Stats[i];
            if (gameType.Region === 'na') {
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