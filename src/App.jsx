import { useAddress, ConnectWallet, Web3Button, useContract, useNFTBalance } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);

  // Initialize our Edition Drop contract
  const editionDropAddress = "0x4B69D23FC8ffB198895f20A75C8E0322B87E36CF"
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  // Hook to check if the user has our NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0")

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Bienvenue sur l'interface de gestion de la DAO du Château des Robots</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }


  // Add this little piece!
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>Page des membres de la 🍪DAO du Château des Robots</h1>
        <p>Félicitations, vous êtes membre !</p>
      </div>
    );
  };


  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Minez votre NFT gratuit pour votre adhésion à la 🍪DAO de gouvernance du Château des Robots</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1)
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Minez votre NFT (GRATUIT)
        </Web3Button>
      </div>
    </div>
  );
}

export default App;
