"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintNft = void 0;
const js_1 = require("@metaplex/js");
const uploadMetadata_1 = require("./uploadMetadata");
const web3_js_1 = require("@solana/web3.js");
const mintNft = async (secretKey, imagePath, imageType, name, description, supply) => {
    const netWork = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
    const keyPair = web3_js_1.Keypair.fromSecretKey(secretKey);
    try {
        const data = await (0, uploadMetadata_1.uploadMetadata)(imagePath, imageType, name, description, keyPair.publicKey.toBase58(), 1);
        const mint = await js_1.actions.mintNFT({
            connection: netWork,
            wallet: new js_1.NodeWallet(keyPair),
            uri: data,
            maxSupply: supply,
        });
        console.log("mint => ", mint.mint.toBase58());
        return mint;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.mintNft = mintNft;
//# sourceMappingURL=mintNft.js.map