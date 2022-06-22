import * as crypto from "crypto";

export class PasswordHelpers {
  private algorithm = "aes-256-ctr";
  private iv = crypto.randomBytes(16);

  public encrypt = (text: string, secretKey: string): string => {
    const key = crypto.scryptSync(secretKey, "salt", 32);
    const cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
    const encrypted = cipher.update(text, "utf8", "hex");
    return [
      encrypted + cipher.final("hex"),
      Buffer.from(this.iv).toString("hex"),
    ].join("-");
  };

  public decrypt = (hash: string, secretKey: string): string => {
    const [encrypted, iv] = hash.split("-");
    const key = crypto.scryptSync(secretKey, "salt", 32);
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      key,
      Buffer.from(iv, "hex")
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, "hex")),
      decipher.final(),
    ]);

    return decrpyted.toString();
  };

  public hashKey = (p1: string, p2: string): string => {
    if (p1.length < 3 || p2.length < 5 ) {
      throw new Error("param 1, 2  must be at least 8 characters long");
    }
    return (
      p1.substring(1, 3) +
      p2.substring(3, 5) +
      "Arfc_Kr_X4" 
    //   Date.now().toString().substring(5, 10)
    );
  };
}
