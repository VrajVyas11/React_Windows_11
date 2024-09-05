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
  const [constraints, setConstraints] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

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
          <div className="absolute top-0 w-full flex justify-between items-center flex-row ">
            <div className="flex flex-row text-lg gap-4 justify-center items-center font-mono ml-4 tracking-wide text-white">
              <img
                width={20}
                height={10}
                src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                alt="VsCode"
              />
              Visual Studio Code
            </div>
            <div className="text-white h-9 w-fit flex justify-end select-none">
              <div
                className="material-symbols-outlined hover:bg-neutral-700 h-10 w-11 flex justify-center items-start text-xl"
                onClick={() => open.set((prev) => ({ ...prev, vscode: false }))}
              >
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-neutral-700 h-10 w-11 flex justify-center items-center text-sm">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined rounded-tr-md hover:bg-red-700 w-12 h-10 flex justify-center items-center text-xl"
                onClick={() => open.set((prev) => ({ ...prev, vscode: false }))}
              >
                close
              </div>
            </div>
          </div>
          <div className="flex-grow mt-10">
            <iframe
              src="https://github1s.com/VrajVyas11/React_Windows_11/blob/main/src/Landing/WindowsHome.jsx"
              title="VsCode"
              className="h-full w-full"
              onLoad={(event) => {
                if (event.target.contentWindow) {
                  console.log("Iframe loaded successfully");
                } else {
                  console.error("Failed to load iframe content");
                }
              }}
              onError={(error) => {
                console.error("Iframe failed to load:", error);
              }}
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VsCode;
