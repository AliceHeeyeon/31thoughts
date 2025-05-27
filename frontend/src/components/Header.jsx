import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="header">
      <div
        className="logo cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span>31</span>
        Thoughts
      </div>
      <div className="flex items-center">
        <button
          className="new-btn cursor-pointer mr-4"
          onClick={() => navigate("/newthought")}
        >
          + NEW
        </button>
        <button
          onClick={handleThemeSwitch}
          className="theme-switcher-btn p-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default Header;
