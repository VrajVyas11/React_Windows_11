import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Define your icons and their initial positions
const AllDesktopHomeIcons = [
  {
    id: 1,
    name: "This PC",
    icon: "./apps/Computer.ico",
    action: "explorer",
    size: "w-18 h-18",
  },
  {
    id: 2,
    name: "Google Chrome",
    icon: "./apps/chrome.png",
    action: "browser",
    size: "w-10 h-10",
  },
  {
    id: 3,
    name: "RecycleBin",
    icon: "./apps/recyclebin.png",
    action: "recycle",
    size: "w-14 h-14",
  },
  {
    id: 4,
    name: "Microsoft Edge",
    icon: "./apps/edge.png",
    action: "browser",
    size: "w-10 h-10",
  },
  {
    id: 5,
    name: "Calculator",
    icon: "./apps/calculator.png",
    action: "calculator",
    size: "w-11 h-11",
  },
  {
    id: 6,
    name: "VS Code",
    icon: "https://laaouatni.github.io/w11CSS/images/vs-code.ico",
    action: "vscode",
    size: "w-8 h-8",
  },
  {
    id: 7,
    name: "Spotify",
    icon: "https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png",
    action: "app",
    subAction: "spotify",
    size: "w-10 h-10",
  },
];

function Main() {
  const constraintsRef = useRef(null);
  const [iconPositions, setIconPositions] = useState(
    AllDesktopHomeIcons.map((icon, index) => ({
      ...icon,
      x: 0,
      y: index * 20 // Adjust the starting positions
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

    // Ensure that the icons align vertically with a 20px gap
    const adjustVerticalAlignment = (positions) => {
      return positions.map((icon, idx) => ({
        ...icon,
        x: icon.x,
        y: idx * 20, // Maintain the 20px vertical spacing
      }));
    };

    const alignedPositions = adjustVerticalAlignment(newPositions);

    // Check if any other icon is nearby for the folder move prompt
    for (let i = 0; i < alignedPositions.length; i++) {
      if (i !== index) {
        const distX = Math.abs(alignedPositions[index].x - alignedPositions[i].x);
        const distY = Math.abs(alignedPositions[index].y - alignedPositions[i].y);
        if (distX < 50 && distY < 50) {
          if (window.confirm("Move to folder?")) {
            // Logic to move both icons to the same folder
            alert("Icons moved to the same folder");
            // Update positions to move icons to a single folder here
          }
        }
      }
    }

    setIconPositions(alignedPositions);
  };

  return (
    <>
      <div className="relative h-screen" ref={constraintsRef}>
        <div className="grid h-[80vh] grid-rows-8 gap-2 text-white absolute top-2 left-2">
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
                onDoubleClick={() => toggleWindow(app.action, app.subAction)}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className={app.size}
                  onDragStart={(e) => e.preventDefault()}
                />
                <div
                  className={`text-balance text-center text-sm select-none ${
                    app.name === "Recycle Bin" ? "pt-0" : "pt-2"
                  }`}
                >
                  {app.name}
                </div>
              </div>
            </motion.div>
          ))}
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

export default Main;
