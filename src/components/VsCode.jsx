import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function VsCode({ open }) {
  const initialX = window.innerWidth / 2.5;
  const initialY = window.innerHeight / 5;

  const [iconPositions, setIconPositions] = useState({
    x: initialX,
    y: initialY,
  });

  const constraintsRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      const elementWidth = 1000;
      const elementHeight = 700;
      setConstraints({
        left: 0,
        top: 0,
        right: window.innerWidth - elementWidth,
        bottom: window.innerHeight - elementHeight,
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <div
      className={`absolute ${open.value ? "" : "hidden"} overflow-hidden w-[100vw] h-[95vh]`}
      ref={constraintsRef}
    >
      <motion.div
        key={"vscode"}
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        className="absolute"
        initial={{ x: initialX, y: initialY }}
        animate={{ x: iconPositions.x, y: iconPositions.y }}
        onDragEnd={(event, info) => {
          setIconPositions({
            x: Math.max(constraints.left, Math.min(iconPositions.x + info.offset.x, constraints.right)),
            y: Math.max(constraints.top, Math.min(iconPositions.y + info.offset.y, constraints.bottom)),
          });
        }}
      >
        <div className="w-[1000px] h-[700px] flex flex-col rounded-md overflow-hidden justify-between bg-[#212121]">
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none">
            <div className="flex flex-row text-lg gap-4 justify-center items-center font-mono m-1 ml-4 tracking-wide text-white">
              <img
                width={20}
                height={10}
                src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                alt="VSCode"
              />
              Visual Studio Code
            </div>
            <button
              onClick={() => open.set((prev) => ({ ...prev, vscode: false }))}
              className="material-symbols-outlined py-1.5 px-5 rounded-tr-md hover:bg-red-500 text-white"
            >
              close
            </button>
          </div>
          <div className="flex-grow">
            <iframe
              src="https://github1s.com/VrajVyas11/React_Windows_11/blob/main/src/Landing/WindowsHome.jsx"
              title="GitHub1s"
              className="h-full w-full"
              allow="geolocation; microphone; camera; midi; encrypted-media;"
              sandbox="allow-scripts allow-popups allow-same-origin"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VsCode;
