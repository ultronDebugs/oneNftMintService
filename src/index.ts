import * as express from "express";
import * as multer from "multer";
import * as os from "os";
import { BlockChainHelper } from "./helpers/keyHelpers";
import { PasswordHelpers } from "./helpers/passwordHelpers";
import { imageTypeHelper } from "./helpers/imageHelpers";
import { mintNft } from "./mintNft";
// import { io } from "socket.io-client";

// socket link = https://one-nftworld-api.herokuapp.com
// const socket = io("http://localhost:3004", {
//   withCredentials: true,
// });
// socket.connect();
const app = express();
const tempDir = os.tmpdir();
const store = multer.diskStorage({ destination: `${tempDir}/uploads` });
const upload = multer({ storage: store }).single("image");

app.get("/", (req, res) => {
  res.status(200).send("<h1>welcome to oneNftWolrd mint service</h1>");
});

app.post("/mintNft", upload, async (req, res) => {
  const imageRes = req.file!;
  const { name, description, supply, user, collectionName } = JSON.parse(
    req.body.data
  );
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
  const imageType = imageTypeHelper(imageRes);
  if (!imageType) {
    res.status(400).send("invalid image type");
    return;
  }
  const hashKey = new PasswordHelpers().hashKey(user.email, user.userName);
  const decryptedKey = new BlockChainHelper(hashKey).decryptPrivateKey(
    user.wallet.privateKey
  );

  try {
    const nft = await mintNft(
      decryptedKey,
      imageRes.path,
      imageType,
      name,
      description,
      supply,
      collectionName,
      user
    );
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
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3003, () => {
  console.log("App is running & listening on port:3003");
});
// listen(process.env.PORT || 3000);
