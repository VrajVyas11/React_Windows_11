import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function Browser({open}) {
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

  const handleCalculatorButtons = (value) => {
    if (value === "equal") {
      setInput((prev) => new Function(`return ${prev}`)());
    } 
    else if (value === "backspace") {
      setInput((prev) => prev.slice(0, -1));
    }
    else if (value === "AC") {
      setInput("");
    }
    else if (value === "contrast") {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }
    else {
      setInput((prev) => {
        const lastChar = prev.slice(-1);
        const newValue =
          value === "add"
            ? "+"
            : value === "remove"
            ? "-"
            : value === "close"
            ? "*"
            : value === "divide"
            ? "/"
            : value;

        if (["+", "-", "*", "/"].includes(lastChar)) {
          if (["+", "-", "*", "/"].includes(newValue)) {
            return prev.slice(0, -1) + newValue;
          }
        }
        return prev + newValue;
      });
    }
  };

  return (
    <div
      className={`absolute ${open.value?"":"hidden"} overflow-hidden w-[100vw] h-[95vh] `}
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
            x: Math.max(constraints.left, Math.min(iconPositions.x + info.offset.x, constraints.right)),
            y: Math.max(constraints.top, Math.min(iconPositions.y + info.offset.y, constraints.bottom)),
          });
        }}
      >
        <div className={`w-[500px] h-[600px] flex flex-col overflow-hidden justify-center items-center rounded-md ${theme === "dark" ? "bg-black bg-opacity-70" : "bg-gray-50 bg-opacity-70"} `}>
          <div className="w-full flex justify-between px-5 py-3 absolute top-0 ">
            <div className={`flex flex-row gap-4 font-bold font-mono text-xl tracking-wide  ${theme === "dark" ? "text-white" : ""}`}>
              Browser
            </div>
            <div ><button 
            onClick={()=>open.set((prev)=>prev.browser=false)}
            className={` material-symbols-outlined ${theme === "dark" ? "text-white" : ""}`}> close</button></div>
          </div>
         
        </div>
      </motion.div>
    </div>
  );
}

export default Browser;
