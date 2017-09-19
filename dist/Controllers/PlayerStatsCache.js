"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsCache {
    constructor() {
        this.invalidationTime = 1000 * 60 * 5;
        this.innerCache = {};
    }
    getPlayer(name) {
        const value = this.innerCache[name];
        const calculatedDateTime = new Date(Date.now() - this.invalidationTime);
        if (!!value && !!value.stats && (calculatedDateTime) < value.timeStamp) {
            return this.innerCache[name];
        }
        return {};
    }
    addPlayer(userName, stats) {
        const timeStamp = new Date();
        this.innerCache[userName] = { stats, timeStamp };
    }
}
exports.default = PlayerStatsCache;
//# sourceMappingURL=PlayerStatsCache.js.map