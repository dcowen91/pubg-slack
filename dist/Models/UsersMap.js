"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersMap {
    constructor() {
        this.userCollection = {};
    }
    addUser(userId, userName) {
        this.userCollection[userId] = userName;
    }
    getUser(userId) {
        return this.userCollection[userId];
    }
}
exports.default = UsersMap;
//# sourceMappingURL=UsersMap.js.map