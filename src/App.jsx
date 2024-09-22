import { useState } from "react";
import NavBar from "./components/Nav";
import GenerateSeedPhrase from "./components/GenerateSeedPhrase";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const [mnemonic, setMnemonic] = useState(""); // State for seed phrase
  const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-800" : "bg-gray-100"
      } min-h-screen`}
    >
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="container mx-auto py-8">
        <GenerateSeedPhrase setMnemonic={setMnemonic} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </div>
      </div>
    </div>
  );
}

export default App;
