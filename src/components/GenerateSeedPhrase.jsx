import { useState } from "react";
import { generateMnemonic } from "bip39";

const GenerateSeedPhrase = ({ setMnemonic }) => {
  const [seedPhrase, setSeedPhrase] = useState("");

  const handleGenerate = async () => {
    const mn = await generateMnemonic();
    setSeedPhrase(mn);
    setMnemonic(mn); // Pass the mnemonic back to the parent (App)
  };

  return (
    <div className="flex flex-col items-center mb-4 pb-8">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
        onClick={handleGenerate}
      >
        Create Seed Phrase
      </button>

      {/* Display Seed Phrase */}
      {seedPhrase && (
        <div className="w-3/4 p-4 bg-gray-200 dark:bg-gray-800 rounded-md shadow-md text-center">
          <h3 className="text-lg font-bold mb-2 dark:text-white">
            Seed Phrase
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {seedPhrase.split(" ").map((word, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
              >
                {index + 1}. {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateSeedPhrase;
