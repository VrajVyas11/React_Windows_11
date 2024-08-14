import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Browser({ open }) {
  const initialX = window.innerWidth / 2.5;
  const initialY = window.innerHeight / 5;

  const [iconPositions, setIconPositions] = useState({
    x: initialX,
    y: initialY,
  });

  const constraintsRef = useRef(null);
  const [constraints, setConstraints] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  const [theme, setTheme] = useState("dark");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const calculateConstraints = () => {
      const elementWidth = 900; // Assuming the element width is 900px
      const elementHeight = 600; // Assuming the element height is 600px
      setConstraints({
        left: 0,
        top: 0,
        right: window.innerWidth - elementWidth,
        bottom: window.innerHeight - elementHeight,
      });
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);

    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://serpapi.com/search.json`, {
        params: {
          q: query,
          api_key: "YOUR_SERPAPI_KEY",
        },
      });
      setResults(response.data.organic_results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const handleSearch = (url) => {
    if (!url.startsWith("http")) {
      fetchSearchResults(url);
    } else {
      setCurrentUrl(url);
    }
    setInputValue(url);
  };

  const handleBack = () => {
    // Add custom back navigation logic here
  };

  const handleForward = () => {
    // Add custom forward navigation logic here
  };

  const handleRefresh = () => {
    setCurrentUrl(inputValue);
  };

  return (
    <div
      className={`absolute ${open.value ? "" : "hidden"
        } overflow-hidden w-[100vw] h-[95vh]`}
      ref={constraintsRef}
    >
      <motion.div
        key={"calc"}
        drag
        dragConstraints={constraints}
        dragMomentum={false}
        className="absolute"
        initial={{ x: initialX, y: initialY }}
        animate={{ x: iconPositions.x, y: iconPositions.y }}
        onDragEnd={(event, info) => {
          setIconPositions({
            x: Math.max(
              constraints.left,
              Math.min(iconPositions.x + info.offset.x, constraints.right)
            ),
            y: Math.max(
              constraints.top,
              Math.min(iconPositions.y + info.offset.y, constraints.bottom)
            ),
          });
        }}
      >
        <div
          className={`w-[900px] h-[600px] flex flex-col overflow-hidden justify-center items-center rounded-md ${theme === "dark"
              ? "bg-gray-900"
              : "bg-gray-100"
            }`}
        >
          {/* Tab Bar */}
          <div className="w-full flex justify-start px-5 py-2 bg-gray-800 dark:bg-gray-900 text-white rounded-t-md">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-grow text-center">
              <span className="text-sm font-medium">New Tab</span>
            </div>
          </div>

          {/* Address Bar */}
          <div className="w-full flex justify-between items-center px-4 py-1 bg-gray-300 dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBack}
                className="p-1 rounded bg-gray-400 dark:bg-gray-700"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
              </button>
              <button
                onClick={handleForward}
                className="p-1 rounded bg-gray-400 dark:bg-gray-700"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={handleRefresh}
                className="p-1 rounded bg-gray-400 dark:bg-gray-700"
              >
                <span className="material-symbols-outlined text-sm">
                  refresh
                </span>
              </button>
            </div>
            <input
              type="text"
              className={`w-[60%] p-1 rounded-full border dark:bg-gray-700 dark:text-white ${theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
                }`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch(inputValue);
              }}
            />
            <button
              onClick={() => handleSearch(inputValue)}
              className="p-1 rounded bg-gray-400 dark:bg-gray-700"
            >
              <span className="material-symbols-outlined text-sm">
                search
              </span>
            </button>
          </div>

          {/* Iframe for displaying the current page */}
          <div className="w-full h-full overflow-hidden bg-white dark:bg-gray-800 rounded-b-md">
            {loading && <p className="text-center text-black dark:text-white">Loading...</p>}
            {!loading && results.length > 0 && (
              <div className="p-4">
                {results.map((result, index) => (
                  <div key={index} className="mb-4">
                    <a
                      href={result.link}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentUrl(result.link);
                      }}
                      className={`text-blue-600 dark:text-blue-400 hover:underline`}
                    >
                      {result.title}
                    </a>
                    <p className={`text-gray-700 dark:text-gray-300`}>
                      {result.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {currentUrl && !loading && (
              <iframe
                src={currentUrl}
                className="w-full h-full"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                sandbox="allow-scripts allow-same-origin"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Browser;
