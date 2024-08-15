import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Explorer from "../components/Explorer";
import Footer from "../components/Footer";
import StartMenu from "../components/StartMenu";
import Browser from "../components/Browser";
import Calculator from "../components/Calculator";
import VsCode from "../components/VsCode";
import RecycleBin from "../components/RecycleBin";
import ThisPC from "../components/ThisPC";
import DrawBoard from "../components/DrawBoard";
import Folder from "../components/Folder";

const AllDesktopHomeIcons = [
  {
    id: 1,
    name: "This PC",
    icon: "./apps/Computer.ico",
    action: "thispc",
    size: "w-18 h-18",
  },
  {
    id: 2,
    name: "Folder",
    icon: "./apps/folder.png",
    action: "folder",
    size: "w-8 h-8",
  },
  {
    id: 3,
    name: "Google Chrome",
    icon: "./apps/chrome.png",
    action: "browser",
    size: "w-10 h-10",
  },
  {
    id: 4,
    name: "RecycleBin",
    icon: "./apps/recyclebin.png",
    action: "recycle",
    size: "w-14 h-14",
  },
  {
    id: 5,
    name: "Microsoft Edge",
    icon: "./apps/edge.png",
    action: "browser",
    size: "w-10 h-10",
  },
  {
    id: 6,
    name: "Calculator",
    icon: "./apps/calculator.png",
    action: "calculator",
    size: "w-11 h-11",
  },
  {
    id: 7,
    name: "DrawBoard",
    icon: "./apps/Drawboard.png",
    action: "drawboard",
    size: "w-11 h-11",
  },
  {
    id: 8,
    name: "VS Code",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
    action: "vscode",
    size: "w-8 h-8",
  },
];


function WindowsHome() {
  const constraintsRef = useRef(null);
  const [windows, setWindows] = useState({
    thispc: false,
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
    drawboard: false,
  });

  const [browserUrl, setBrowserUrl] = useState("https://www.google.com/webhp?igu=1");

  const toggleWindow = (window, url = null) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [window]: !prevWindows[window],
    }));

    if (url) {
      setBrowserUrl(url);
    }
  };

  const [iconPositions, setIconPositions] = useState(
    AllDesktopHomeIcons.map((icon, index) => ({
      ...icon,
      x: 0,
      y: index, // Adjust the starting positions
    }))
  );

  const handleDragEnd = (event, info, index) => {
    const { offset } = info;
    const newPositions = [...iconPositions];
    newPositions[index] = {
      ...newPositions[index],
      x: (newPositions[index].x || 0) + offset.x,
      y: (newPositions[index].y || 0) + offset.y,
    };

    setIconPositions(newPositions);
  };

  return (
    <>
      <div className="relative h-screen" ref={constraintsRef}>
        <div className="grid h-[80vh] grid-rows-8 gap-24 py-11 text-white absolute top-2 left-2">

          {iconPositions.map((app, index) => (
            <motion.div
              key={app.id}
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              onDragEnd={(event, info) => handleDragEnd(event, info, index)}
              className="flex items-center justify-center"
              style={{
                transform: `translate(${app.x || 0}px, ${app.y || 0}px)`,
              }}
            >
              <div
                className="w-[5em] h-[5em] flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 px-2 py-3"
                onDoubleClick={() => toggleWindow(app.action, app.url)}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className={app.size}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div
                  className={`text-balance text-center text-sm select-none ${app.name === "Recycle Bin" ? "pt-0" : "pt-2"
                    }`}
                >
                  {app.name}
                </div>
              </div>
            </motion.div>
          ))}
         
        </div>
        <div className="flex justify-center w-full items-start h-[95vh]">
          <ThisPC open={{ value: windows.thispc, set: setWindows }} />
          <DrawBoard open={{ value: windows.drawboard, set: setWindows }} />
          <VsCode open={{ value: windows.vscode, set: setWindows }} />
          <RecycleBin open={{ value: windows.recycle, set: setWindows }} />
          <Browser open={{ value: windows.browser, set: setWindows }} initialUrl={browserUrl} />
          <Calculator open={{ value: windows.calculator, set: setWindows }} />
          <Folder open={{ value: windows.folder, set: setWindows }}  />
        </div>
        <Footer
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
        />
      </div>
    </>
  );
}

export default WindowsHome;
