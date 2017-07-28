"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubgStats_1 = require("./pubgStats");
class CommandAdapter {
    constructor(api) {
        this.api = api;
    }
    handleCommand(userName, commandText) {
        const result = 'not supported ' + userName;
        switch (commandText) {
            case 'stats':
                {
                    return this.api.profile.byNickname(userName).then((playerStats) => {
                        let str = '';
                        for (const i in playerStats.Stats) {
                            const gameType = playerStats.Stats[i];
                            if (gameType.Region === 'na') {
                                str += '*' + gameType.Match + '*: ' + gameType.Stats[pubgStats_1.StatName.Rating].displayValue + ' ' + gameType.Stats[pubgStats_1.StatName.Rating].label + ' (' + gameType.Stats[pubgStats_1.StatName.RoundsPlayed].displayValue + gameType.Stats[pubgStats_1.StatName.RoundsPlayed].label + ')\n';
                            }
                        }
                        return str;
                    });
                }
            case 'kd':
            case 'kdr':
                {
                    return this.api.profile.byNickname(userName).then((data) => {
                        console.log(data.Stats);
                        console.log(data.Stats[0].Stats);
                        return data.Stats[0].Match + ': ' + data.Stats[0].Stats[0].label + ' : ' + data.Stats[0].Stats[0].displayValue + '(top ' + data.Stats[0].Stats[0].percentile + ')';
                    });
                }
            case 'rating':
                {
                    console.log('rating');
                    break;
                }
            case 'wins':
                {
                    console.log('wins');
                    break;
                }
            case 'top10':
                {
                    console.log('top10');
                    break;
                }
            default:
                break;
        }
        return Promise.reject(result);
    }
}
exports.default = CommandAdapter;
//# sourceMappingURL=CommandAdapter.js.map