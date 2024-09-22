import { FaWallet } from "react-icons/fa"; // Import wallet icon from react-icons

const NavBar = ({ darkMode, setDarkMode }) => {
  return (
    <nav
      className={`w-full p-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center">
          <FaWallet className="text-2xl mr-2" />{" "}
          {/* React Icon for the brand */}
          <span
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Zwallet
          </span>
        </div>

        {/* Dark Mode Toggle */}
        <button
          className={`px-4 py-2 rounded-md transition ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
