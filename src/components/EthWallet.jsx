import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  const handleDeleteWallet = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        Ethereum Wallets
      </h2>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 transition"
        onClick={handleAddWallet}
      >
        Add ETH Wallet
      </button>
      <div className="mt-4">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="mb-2 p-2 border rounded-md dark:bg-gray-600 flex justify-between items-center"
          >
            <div>
              <span className="font-bold dark:text-white">
                Wallet {index + 1}:
              </span>
              <p className="text-gray-700 dark:text-white">{address}</p>
            </div>
            <button
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition"
              onClick={() => handleDeleteWallet(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
