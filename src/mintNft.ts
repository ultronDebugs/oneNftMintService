import { actions, NodeWallet } from "@metaplex/js";
import { uploadMetadata } from "./uploadMetadata";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { io } from "socket.io-client";

const socket = io("https://one-nftworld-api.herokuapp.com", {
  withCredentials: true,
});

export const mintNft = async (
  secretKey: Uint8Array,
  imagePath: string,
  imageType: string,
  name: string,
  description: string,
  supply: number,
  collectionName: string,
  user: object
): Promise<actions.MintNFTResponse | undefined> => {
  const network = new Connection(clusterApiUrl("testnet"));
  const keyPair = Keypair.fromSecretKey(secretKey);
  socket.connect();
  try {
    const data = await uploadMetadata(
      imagePath,
      imageType,
      name,
      description,
      keyPair.publicKey.toBase58(),
      1
    );
    const mint = await actions.mintNFT({
      connection: network,
      wallet: new NodeWallet(keyPair),
      uri: data!,
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
  } catch (error) {
    console.log(error);
    return;
  }
};
