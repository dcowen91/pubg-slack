"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandAdapter {
    constructor(api) {
        this.api = api;
    }
    handleCommand(userName, commandText) {
        const result = 'not supported ' + userName;
        switch (commandText) {
            case 'stats':
                {
                    return this.api.profile.byNickname(userName).then((data) => {
                        console.log(data.Stats);
                        console.log(data.Stats[0].Stats);
                        return 'KDR: ' + data.Stats[0].Stats[0].displayValue;
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