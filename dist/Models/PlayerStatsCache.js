"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerStatsCache {
    constructor(time) {
        this.innerCache = {};
        this.invalidationTime = time;
    }
    getPlayer(name) {
        const value = this.innerCache[name];
        const calculatedDateTime = new Date(Date.now() - this.invalidationTime);
        if (!!value && !!value.stats && (calculatedDateTime.toUTCString()) < value.timeStamp.toUTCString()) {
            return this.innerCache[name];
        }
        else
            return {};
    }
}
exports.default = PlayerStatsCache;
//# sourceMappingURL=PlayerStatsCache.js.map