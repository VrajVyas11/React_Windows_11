import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function Calculator({ open }) {
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
      className={`absolute ${open.value ? "" : "hidden"} overflow-hidden w-[100vw] h-[95vh] `}
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
        <div className={`w-[500px] h-[600px] flex flex-col overflow-hidden justify-center items-center rounded-md ${theme === "dark" ? "bg-[#212121] " : "bg-gray-50 "} `}>
        <div className="absolute top-0 w-full flex justify-between  items-center flex-row">
            <div className="flex flex-row text-lg gap-4 justify-center items-center font-mono ml-4 tracking-wide text-white">
              <img
                width={20}
                height={10}
                src="apps/calculator.png"
                alt="calculator"
              />
              Calculator
            </div>
            <div className="text-white h-9 w-fit flex justify-end select-none">
              <div
                className="material-symbols-outlined hover:bg-neutral-700 h-10  w-11 flex justify-center items-start text-xl"
                onClick={() => open.set((prev) => ({ ...prev, calculator: false }))}
              >
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-neutral-700 h-10 w-11 flex justify-center items-center text-sm">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined rounded-tr-md hover:bg-red-700 w-12 h-10 flex justify-center items-center text-xl"
                onClick={() => open.set((prev) => ({ ...prev, calculator: false }))}
              >
                close
              </div>
            </div>
          </div>

          <div className="w-full px-5 flex justify-center items-center mb-44">
            <input
              type="text"
              value={input}
              className={`p-4 text-3xl w-full font-bold tracking-wide placeholder-white text-right ${theme === "dark" ? "bg-transparent text-white" : "bg-transparent text-black"}`}
              onInput={(e) => {
                const allowedCharacters = /[%\/789456\-123+0.]/;
                e.target.value = e.target.value
                  .split("")
                  .filter((char) => allowedCharacters.test(char))
                  .join("");
                setInput(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 absolute bottom-0 w-full p-4 gap-2">
            {["AC", "backspace", "%", "/", "7", "8", "9", "close", "4", "5", "6", "remove", "1", "2", "3", "add", "contrast", "0", ".", "equal"].map((val) => (
              <button
                key={val}
                onClick={() => handleCalculatorButtons(val)}
                className={`${val.includes("backspace") ||
                    val.includes("close") ||
                    val.includes("remove") ||
                    val.includes("add") ||
                    val.includes("equal") ||
                    val.includes("contrast")
                    ? ""
                    : "font-mono text-3xl font-bold"
                  } ${val.includes("equal") ? "bg-orange-500" : "bg-gray-600"} material-symbols-outlined flex justify-center items-center p-3 rounded-md ${theme === "dark" ? "text-white" : "text-black "}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Calculator;
