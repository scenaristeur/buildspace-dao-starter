import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0x4B69D23FC8ffB198895f20A75C8E0322B87E36CF", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "Le vaisseau du Château",
        description: "Ce NFT vous donne accès à la DAO du Château des Robots!",
        image: readFileSync("scripts/assets/spaceship.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
