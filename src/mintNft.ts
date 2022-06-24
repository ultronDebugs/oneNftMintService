import { actions, NodeWallet } from "@metaplex/js";
import { uploadMetadata } from "./uploadMetadata";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

export const mintNft = async (
  secretKey: Uint8Array,
  imagePath: string,
  imageType: string,
  name: string,
  description: string,
  supply: number
): Promise<actions.MintNFTResponse | undefined> => {
  const netWork = new Connection(clusterApiUrl("devnet"));
  const keyPair = Keypair.fromSecretKey(secretKey);

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
      connection: netWork,
      wallet: new NodeWallet(keyPair),
      uri: data!,
      maxSupply: supply,
    });
    console.log("mint => ", mint.mint.toBase58());
    return mint;
  } catch (error) {
    console.log(error);
    return;
  }
};
