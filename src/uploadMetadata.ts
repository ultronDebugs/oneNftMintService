import { PinataPinOptions } from "@pinata/sdk";
const pinataSDK = require("@pinata/sdk");

//  const netWork = new Connection(clusterApiUrl("devnet"));
const pinataFileUri = "https://gateway.pinata.cloud/ipfs";

const pinataApiKey = "46b2952f8b318c56ae9d";
const pinataApiSecret =
  "0290071f7757cd7be9b574db852992c88d84a0f9b5080af3f95f66264fe9b454";

export const uploadMetadata = async (
  imagePath: string,
  imageType: string,
  name: string,
  description: string,
  publicKey: string,
  supply: number
): Promise<string | null> => {
  try {
    const pinata = pinataSDK(pinataApiKey, pinataApiSecret);
    const imageFileOptions: PinataPinOptions = {
      pinataMetadata: {
        name: `${name}__image`,
      },
    };
    const jsonFileOptions: PinataPinOptions = {
      pinataMetadata: {
        name: `${name}__json`,
      },
    };
    const fileRes = await pinata.pinFromFS(imagePath, imageFileOptions);
    const metadata = {
      name: name,
      symbol: "NFT",
      description: description,
      seller_fee_basis_points: 9700,

      attributes: [
        {
          trait_type: "Special",
          value: true,
        },
      ],
      properties: {
        files: [
          {
            uri: `${pinataFileUri}/${fileRes.IpfsHash}`,
            type: `image/${imageType}`,
          },
        ],
        category: "image",
        maxSupply: supply,
        creators: [
          {
            address: publicKey,
            share: 97,
          },
          {
            address: "2cYoDZsy2FhndfvbYdDzBtstAHgysVteobiU3ic4AQaN",
            share: 3,
          },
        ],
      },
      image: `${pinataFileUri}/${fileRes.IpfsHash}`,
    };
    const jsonRes = await pinata.pinJSONToIPFS(metadata, jsonFileOptions);
    return `${pinataFileUri}/${jsonRes.IpfsHash}`;
  } catch (error) {
    console.log(`[uploadNftMetadata] ${error}`);
    return null;
  }
};
