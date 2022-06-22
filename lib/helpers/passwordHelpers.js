"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHelpers = void 0;
const crypto = require("crypto");
class PasswordHelpers {
    constructor() {
        this.algorithm = "aes-256-ctr";
        this.iv = crypto.randomBytes(16);
        this.encrypt = (text, secretKey) => {
            const key = crypto.scryptSync(secretKey, "salt", 32);
            const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
            const encrypted = cipher.update(text, "utf8", "hex");
            return [
                encrypted + cipher.final("hex"),
                Buffer.from(this.iv).toString("hex"),
            ].join("-");
        };
        this.decrypt = (hash, secretKey) => {
            const [encrypted, iv] = hash.split("-");
            const key = crypto.scryptSync(secretKey, "salt", 32);
            const decipher = crypto.createDecipheriv(this.algorithm, key, Buffer.from(iv, "hex"));
            const decrpyted = Buffer.concat([
                decipher.update(Buffer.from(encrypted, "hex")),
                decipher.final(),
            ]);
            return decrpyted.toString();
        };
        this.hashKey = (p1, p2) => {
            if (p1.length < 3 || p2.length < 5) {
                throw new Error("param 1, 2  must be at least 8 characters long");
            }
            return (p1.substring(1, 3) +
                p2.substring(3, 5) +
                "Arfc_Kr_X4"
            //   Date.now().toString().substring(5, 10)
            );
        };
    }
}
exports.PasswordHelpers = PasswordHelpers;
//# sourceMappingURL=passwordHelpers.js.map