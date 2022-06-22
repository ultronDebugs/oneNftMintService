"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChainHelper = void 0;
const bs58 = require("bs58");
const passwordHelpers_1 = require("./passwordHelpers");
class BlockChainHelper {
    constructor(hashKey) {
        this.passwordHelper = new passwordHelpers_1.PasswordHelpers();
        this.encryptPrivateKey = (secretKey) => {
            const key = bs58.encode(secretKey);
            const maskedKey = this.passwordHelper.encrypt(key, this.hashKey);
            return maskedKey;
        };
        this.decryptPrivateKey = (maskedKey) => {
            const key = this.passwordHelper.decrypt(maskedKey, this.hashKey);
            console.log("key", key);
            const privateKey = bs58.decode(key);
            return privateKey;
        };
        this.hashKey = hashKey;
    }
}
exports.BlockChainHelper = BlockChainHelper;
//# sourceMappingURL=keyHelpers.js.map