"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubg_api_redis_1 = require("pubg-api-redis");
class PlayerStatsWrapper {
    constructor(stats) {
        this.statsCollection = stats;
    }
    printStats(stats) {
        let str = '';
        for (const i in this.statsCollection.stats) {
            const gameType = this.statsCollection.stats[i];
            if (gameType.Region === pubg_api_redis_1.REGION.NA && gameType.Season === pubg_api_redis_1.SEASON.EA2017pre3) {
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
exports.default = PlayerStatsWrapper;
//# sourceMappingURL=PlayerStatsWrapper.js.map