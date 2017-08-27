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
        const lineLength = 25;
        for (const i in this.statsCollection.Stats) {
            const gameType = this.statsCollection.Stats[i];
            if (gameType.Region === this.currentRegion && gameType.Season === this.currentSeason) {
                str += '*' + gameType.Match + '*:\n';
                for (const j in stats) {
                    const commandDisplayString = this.formatDisplayValue(gameType.Stats[stats[j]]);
                    const currentLength = commandDisplayString.length;
                    let divider = '\n';
                    if (j % 2 === 0) {
                        const count = Math.floor((lineLength - currentLength) / 2) + 1;
                        console.log(gameType.Stats[stats[j]].label + ' length: ' + currentLength);
                        console.log('tab count: ' + count);
                        console.log('total length for line:' + (count * 2 + currentLength));
                        divider = '\t'.repeat(count);
                    }
                    str += commandDisplayString + divider;
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