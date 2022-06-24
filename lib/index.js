"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const os = require("os");
const keyHelpers_1 = require("./helpers/keyHelpers");
const passwordHelpers_1 = require("./helpers/passwordHelpers");
const imageHelpers_1 = require("./helpers/imageHelpers");
const mintNft_1 = require("./mintNft");
const app = express();
const tempDir = os.tmpdir();
const store = multer.diskStorage({ destination: `${tempDir}/uploads` });
const upload = multer({ storage: store }).single("image");
app.post("/mintNft", upload, async (req, res) => {
    const imageRes = req.file;
    const { name, description, supply, user } = JSON.parse(req.body.data);
    // console.log(user);
    // const userAuth = !authUser(user.email, user.password);
    // console.log("userAuths", userAuth);
    // if (userAuth != true) {
    //   res.status(401).send("Unauthorized");
    //   return;
    // }
    if (!imageRes || !name || !description || !supply || !user) {
        res.status(400).json({ message: "missing params", payload: null });
        return;
    }
    const imageType = (0, imageHelpers_1.imageTypeHelper)(imageRes);
    if (!imageType) {
        res.status(400).send("invalid image type");
        return;
    }
    const hashKey = new passwordHelpers_1.PasswordHelpers().hashKey(user.email, user.userName);
    const decryptedKey = new keyHelpers_1.BlockChainHelper(hashKey).decryptPrivateKey(user.wallet.privateKey);
    try {
        const nft = await (0, mintNft_1.mintNft)(decryptedKey, imageRes.path, imageType, name, description, supply);
        if (!nft) {
            res.status(400).json({
                message: "failed to mint nft",
                payload: null,
            });
            return;
        }
        res.status(200).json({
            message: "success nft minted 💎 ⛏️",
            payload: nft.mint.toBase58(),
        });
    }
    catch (error) {
        console.log(error);
    }
});
app.get("/", (req, res) => {
    res.send("welcome to oneNftWolrd mint service ");
});
app.listen(3003, () => {
    console.log("App is running & listening on port:3003");
});
//# sourceMappingURL=index.js.map