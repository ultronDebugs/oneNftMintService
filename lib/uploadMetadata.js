"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMetadata = void 0;
const pinataSDK = require("@pinata/sdk");
//  const netWork = new Connection(clusterApiUrl("devnet"));
const pinataFileUri = "https://gateway.pinata.cloud/ipfs";
const pinataApiKey = "df7d5718d6a37561121b";
const pinataApiSecret = "c334e995a8fa03eddd600c6c4674ed42ae0bc066c4e91b3f33d1370002592f74";
const uploadMetadata = async (imagePath, imageType, name, description, publicKey, supply) => {
    try {
        const pinata = pinataSDK(pinataApiKey, pinataApiSecret);
        const imageFileOptions = {
            pinataMetadata: {
                name: `${name}__image`,
            },
        };
        const jsonFileOptions = {
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
    }
    catch (error) {
        console.log(`[uploadNftMetadata] ${error}`);
        return null;
    }
};
exports.uploadMetadata = uploadMetadata;
//# sourceMappingURL=uploadMetadata.js.map