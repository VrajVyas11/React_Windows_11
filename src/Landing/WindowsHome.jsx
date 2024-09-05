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
import RightClick from "../components/RightClick";
import Terminal from "../components/Terminal";
import MSEdge from "../components/MSEdge";
import ExitScreens from "../components/ExitScreens";

const AllDesktopHomeIcons = [
  {
    id: 1,
    name: "This PC",
    icon: "./apps/Computer.ico",
    action: "thispc",
    size: "w-7 h-7", // Adjusted size (80% of w-9 h-9)
  },
  {
    id: 2,
    name: "Folder",
    icon: "./apps/folder.png",
    action: "folder",
    size: "w-5 h-5", // Adjusted size (80% of w-6 h-6)
  },
  {
    id: 3,
    name: "Google Chrome",
    icon: "./apps/chrome.png",
    action: "browser",
    size: "w-6 h-6", // Adjusted size (80% of w-7 h-7)
  },
  {
    id: 4,
    name: "RecycleBin",
    icon: "./apps/recyclebin.png",
    action: "recycle",
    size: "w-8 h-8", // Adjusted size (80% of w-10 h-10)
  },
  {
    id: 5,
    name: "Microsoft Edge",
    icon: "./apps/edge.png",
    action: "msedge",
    size: "w-6 h-6", // Adjusted size (80% of w-8 h-8)
  },
  {
    id: 6,
    name: "Calculator",
    icon: "./apps/calculator.png",
    action: "calculator",
    size: "w-7 h-7", // Adjusted size (80% of w-9 h-9)
  },
  {
    id: 7,
    name: "DrawBoard",
    icon: "./apps/Drawboard.png",
    action: "drawboard",
    size: "w-7 h-7", // Adjusted size (80% of w-9 h-9)
  },
  {
    id: 8,
    name: "VS Code",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
    action: "vscode",
    size: "w-5 h-5", // Adjusted size (80% of w-6 h-6)
  },
];

function WindowsHome() {
  const constraintsRef = useRef(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [actionType, setActionType] = useState("");
  const [windows, setWindows] = useState({
    start: false,
    thispc: false,
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
    drawboard: false,
    terminal: false,
    msedge: false,
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
      y: index * 1.6, // Adjusted positions (80% of 2)
    }))
  );

  const handleDragEnd = (event, info, index) => {
    const { offset } = info;
    const newPositions = [...iconPositions];
    newPositions[index] = {
      ...newPositions[index],
      x: (newPositions[index].x || 0) + offset.x * 0.8, // Adjusted scaling
      y: (newPositions[index].y || 0) + offset.y * 0.8, // Adjusted scaling
    };

    setIconPositions(newPositions);
  };

  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [isRightClickVisible, setRightClickVisible] = useState(false);

  const handleRightClick = (event) => {
    event.preventDefault();
    setRightClickPosition({ x: event.clientX * 0.8, y: event.clientY * 0.8 }); // Adjusted position
    setRightClickVisible(true);
  };

  const handleClick = () => {
    if (isRightClickVisible) {
      setRightClickVisible(false);
    }
  };

  return (
    <div
      className="relative h-screen"
      ref={constraintsRef}
      onClick={handleClick}
    >
      <div className="grid h-[64vh] grid-rows-8 gap-16 py-8 text-white absolute top-2 left-2">
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
              className="w-[4em] h-[4em] flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 px-1.6 py-2.4"
              onDoubleClick={() => toggleWindow(app.action, app.url)}
            >
              <img
                src={app.icon}
                alt={app.name}
                className={app.size}
                onDragStart={(e) => e.preventDefault()}
              />
              <div
                className={`text-balance text-center text-xs select-none ${app.name === "Recycle Bin" ? "pt-0" : "pt-1.6"}`}
              >
                {app.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div 
        onContextMenu={handleRightClick}
        className="flex justify-center w-full items-start h-[76vh]"
      >
        <ThisPC open={{ value: windows.thispc, set: setWindows }} />
        <DrawBoard open={{ value: windows.drawboard, set: setWindows }} />
        <VsCode open={{ value: windows.vscode, set: setWindows }} />
        <MSEdge open={{ value: windows.msedge, set: setWindows }} />
        <RecycleBin open={{ value: windows.recycle, set: setWindows }} />
        <Browser open={{ value: windows.browser, set: setWindows }} initialUrl={browserUrl} />
        <Calculator open={{ value: windows.calculator, set: setWindows }} />
        <Folder open={{ value: windows.folder, set: setWindows }} />
        <RightClick
          position={rightClickPosition}
          isVisible={isRightClickVisible}
          open={{ value: windows, set: setWindows }}
        />
        <Terminal open={{ value: windows, set: setWindows }} />
        <ExitScreens isSleeping={isSleeping} actionType={actionType} />
      </div>
      <Footer
        toggleStart={() => toggleWindow("start")}
        toggleExplorer={(input) => toggleWindow("explorer", input)}
        toggleEdge={() => toggleWindow("msedge")}
      />
      <StartMenu
        toggleStart={() => toggleWindow("start")}
        isStartOpen={windows.start}
        setInput={(input) => setBrowserUrl(input)}
        setIsSleeping={(val) => setIsSleeping(val)}
        setActionType={(val) => setActionType(val)}
      />
    </div>
  );
}

export default WindowsHome;
