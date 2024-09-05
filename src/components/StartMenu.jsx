import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StartMenu({
  toggleStart,
  isStartOpen,
  setInput,
  setIsSleeping,
  setActionType,
}) {
  const navigate = useNavigate();
  const { name } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  function handleClick() {
    toggleStart();
    setIsDropdownOpen(false);
    setIsSleeping(true);
    setActionType("restart");
    setInput("close");
    setTimeout(() => {
      setIsSleeping(false)
      navigate("/");
    }, 5000);
  }

  function handleShut() {
    setIsSleeping(true);
    setActionType("shutdown");
    toggleStart();
    setInput("close");
    setTimeout(() => {
      setIsSleeping(false)
      navigate("/");
    }, 5000);
  }

  function handleSleep() {
    setIsSleeping(true);
    toggleStart();
    setActionType("sleep");
    setIsDropdownOpen(!isDropdownOpen);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const filteredApps = [
    {
      src: "https://laaouatni.github.io/w11CSS/images/edge-icon.png",
      alt: "edge icon",
      name: "Edge",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/word-icon.png",
      alt: "word icon",
      name: "Word",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/excel-icon.png",
      alt: "excel icon",
      name: "Excel",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/powerpoint-icon.png",
      alt: "powerpoint icon",
      name: "Powerpoint",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-office.ico",
      alt: "office icon microsoft",
      name: "Office",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/calendar-icon.png",
      alt: "calendar icon",
      name: "Calendar",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-store-icon.png",
      alt: "microsoft store icon",
      name: "Microsoft Store",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-foto-icon.ico",
      alt: "gallery icon by microsoft 11",
      name: "Photos",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-video-icon.ico",
      alt: "microsoft video icon by microsoft",
      name: "Film & TV",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/Paint-2D.ico",
      alt: "paint 2d icon by microsoft",
      name: "Paint",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/Paint-3D.ico",
      alt: "paint 3d icon by microsoft",
      name: "Paint 3D",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/Whiteboard.ico",
      alt: "whiteboard icon by microsoft",
      name: "WhiteBoard",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-impostazioni-icon.ico",
      alt: "settings icon by microsoft",
      name: "Settings",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-skype.ico",
      alt: "skype icon by microsoft",
      name: "Skype",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
      alt: "vs code icon by microsoft",
      name: "VS Code",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/vs-normal.ico",
      alt: "visual studio normal icon by microsoft",
      name: "Visual Studio",
    },
    {
      src: "https://laaouatni.github.io/w11CSS/images/ms-file-explorer.ico",
      alt: "file explorer icon by microsoft",
      name: "File Explorer",
    },
  ].filter((app) => app.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <section
      className={`z-50 text-white left-1/3 right-1/3 grid transition-all duration-200 w-[38em] rounded-xl absolute overflow-hidden border-2 border-neutral-600 bg-neutral-800 ${
        isStartOpen ? "bottom-16" : "bottom-[-800px]"
      }`}
    >
      <div className="p-3">
        <input
          type="text"
          id="cerca-input-start"
          placeholder="Search for apps, settings, and documents"
          disabled={!isStartOpen}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full h-9 bg-neutral-900 text-white rounded-full px-4 placeholder-gray-500"
        />
      </div>
      <div>
        <div className="pt-0 px-7 pb-3">
          <div className="font-bold text-lg flex justify-between items-center border-b border-neutral-600 pb-2">
            <span>Pinned</span>
            <div className="flex items-center gap-2">
              <span>All apps</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 px-2 pt-4">
            {filteredApps.map((icon, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-gray-700 rounded-md transition duration-100"
              >
                <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
                <span className="text-xs text-white text-center">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!searchText && (
          <div className="pt-0 px-8 pb-4">
            <div className="font-bold text-base flex justify-between items-center border-b border-neutral-600 pb-2">
              <span>Recommended</span>
              <div className="flex items-center gap-2">
                <span>More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-black"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4">
              {[
                {
                  src: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
                  alt: "VS code icon",
                  title: "VS Code",
                  subtitle: "Recently added",
                },
                {
                  src: "https://laaouatni.github.io/w11CSS/images/vs-normal.ico",
                  alt: "visual studio icon",
                  title: "Visual Studio",
                  subtitle: "Recently added",
                },
                {
                  src: "https://laaouatni.github.io/w11CSS/images/Photos-folder.ico",
                  alt: "folder microsoft",
                  title: "Study Materials",
                  subtitle: "30 minutes ago",
                },
              ].map((recent, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition duration-300"
                >
                  <img src={recent.src} alt={recent.alt} className="w-7 h-7" />
                  <div className="text-white">
                    <div className="text-sm">{recent.title}</div>
                    <div className="text-xs opacity-70">{recent.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center px-12 p-4 bg-neutral-900 border-t border-neutral-600">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-700 p-2 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800">
            {name
              ?.split(" ")
              ?.map((part) => part[0].toUpperCase())
              ?.join("") || "G"}
          </div>
          <span>{name || "Guest"}</span>
        </div>

        <div className="relative">
        {isDropdownOpen && (
            <ul className="absolute mt-2 right-0 -top-40 w-52 bg-neutral-800 border border-neutral-600 rounded-lg shadow-lg p-2">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-lg"
                  onClick={handleSleep}
                >
                  Sleep
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-lg"
                  onClick={handleShut}
                >
                  Shut Down
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-lg"
                  onClick={handleClick}
                >
                  Restart
                </button>
              </li>
            </ul>
          )}
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img src="./options/power.svg" alt="Power" className="w-8 h-8" />
          </div>
      
        
      </div>
      </div>
    </section>
  );
}

export default StartMenu;



