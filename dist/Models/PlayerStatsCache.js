"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsCache {
    constructor() {
        this.invalidationTime = 300000;
        this.innerCache = {};
    }
    getPlayer(name) {
        const value = this.innerCache[name];
        const calculatedDateTime = new Date(Date.now() - this.invalidationTime);
        if (!!value && !!value.stats && (calculatedDateTime) < value.timeStamp) {
            return this.innerCache[name];
        }
        console.log('getPlayer failed.');
        console.log('value:' + value);
        console.log('value.timestampe:' + !!value || value.timeStamp);
        return {};
    }
    addPlayer(userName, stats) {
        const timeStamp = new Date();
        this.innerCache[userName] = { stats, timeStamp };
    }
}
exports.default = PlayerStatsCache;
//# sourceMappingURL=PlayerStatsCache.js.map