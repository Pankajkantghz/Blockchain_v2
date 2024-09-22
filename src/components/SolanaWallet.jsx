import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
  };

  const handleDeleteWallet = (index) => {
    setPublicKeys(publicKeys.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Solana Wallets</h2>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-400 transition"
        onClick={handleAddWallet}
      >
        Add Solana Wallet
      </button>
      <div className="mt-4">
        {publicKeys.map((publicKey, index) => (
          <div
            key={index}
            className="mb-2 p-2 border rounded-md dark:bg-gray-600 flex justify-between items-center"
          >
            <div>
              <span className="font-bold dark:text-white">
                Wallet {index + 1}:
              </span>
              <p className="text-gray-700 dark:text-white">{publicKey}</p>
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
}
