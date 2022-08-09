"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintNft = void 0;
const js_1 = require("@metaplex/js");
const uploadMetadata_1 = require("./uploadMetadata");
const web3_js_1 = require("@solana/web3.js");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3004", {
    withCredentials: true,
});
const mintNft = async (secretKey, imagePath, imageType, name, description, supply, collectionName, user) => {
    const network = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("testnet"));
    const keyPair = web3_js_1.Keypair.fromSecretKey(secretKey);
    socket.connect();
    try {
        const data = await (0, uploadMetadata_1.uploadMetadata)(imagePath, imageType, name, description, keyPair.publicKey.toBase58(), 1);
        const mint = await js_1.actions.mintNFT({
            connection: network,
            wallet: new js_1.NodeWallet(keyPair),
            uri: data,
            maxSupply: supply,
        });
        console.log("mint => ", mint.mint.toBase58());
        console.log(data);
        socket.emit("minted nft", {
            user: user,
            nftMint: mint.mint.toBase58(),
            name: name,
            description: description,
            supply: supply,
            pinUri: data,
            collectionName: collectionName,
        });
        return mint;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.mintNft = mintNft;
//# sourceMappingURL=mintNft.js.map