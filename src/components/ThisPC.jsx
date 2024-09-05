import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function ThisPC({open}) {
  const initialX = window.innerWidth / 2.5;
  const initialY = window.innerHeight / 5;

  const [iconPositions, setIconPositions] = useState({
    x: initialX,
    y: initialY,
  });

  const constraintsRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const calculateConstraints = () => {
      const elementWidth = 500; // Assuming the element width is 500px
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

  setTimeout(() => {
    open.set((prev)=>prev.thispc?prev.thispc=false:prev)
  }, 5000);
  return (
    <div
      className={`absolute ${open.value?"":"hidden"} overflow-hidden w-[100vw] h-[95vh] `}
      ref={constraintsRef}
    >
      <motion.div
        key={"thispc"}
        drag
        dragConstraints={constraints}
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
        <div className={`w-[500px] h-[300px] flex flex-col overflow-hidden justify-center items-center rounded-lg shadow-xl border ${theme === "dark" ? "bg-black bg-opacity-80 border-gray-700" : "bg-gray-50 bg-opacity-80 border-gray-300"}`}>
  <div className="w-full flex justify-between px-5 py-3 absolute top-0">
    <div className={`font-bold font-mono text-xl tracking-wide ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
      Work in Progress
    </div>
    <div>
      <button 
        onClick={() => open.set((prev) => prev.thispc = false)}
        className={`material-symbols-outlined ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        close
      </button>
    </div>
  </div>
  <div className={`flex flex-col justify-center items-center mt-20 text-center space-y-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
    <span className="text-2xl font-semibold">🚧 Under Construction 🚧</span>
    <span className="text-lg">This feature is currently being worked on. Stay tuned!</span>
  </div>
</div>

      </motion.div>
    </div>
  );
}

export default ThisPC;
