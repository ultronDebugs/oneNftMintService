
import * as bs58 from "bs58";
import { PasswordHelpers } from "./passwordHelpers";

export class BlockChainHelper {
  private passwordHelper = new PasswordHelpers();
  private hashKey: string;
  constructor(hashKey: string) {
    this.hashKey = hashKey;
  }

  public encryptPrivateKey = (secretKey: Uint8Array): string => {
    const key = bs58.encode(secretKey);
    const maskedKey = this.passwordHelper.encrypt(key, this.hashKey);
    return maskedKey;
  };

  public decryptPrivateKey = (maskedKey: string): Uint8Array => {
    const key = this.passwordHelper.decrypt(maskedKey, this.hashKey);
    console.log("key", key);
    const privateKey = bs58.decode(key);
    return privateKey;
  };
  
}
