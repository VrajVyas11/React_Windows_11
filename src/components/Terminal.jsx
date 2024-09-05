import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Terminal({ open }) {
    const initialX = window.innerWidth / 2.5;
    const initialY = window.innerHeight / 5;

    const [iconPositions, setIconPositions] = useState({
        x: initialX,
        y: initialY,
    });

    const [inputValue, setInputValue] = useState("");
    const [terminalOutput, setTerminalOutput] = useState([
        "Windows PowerShell",
        "Copyright (C) Microsoft Corporation. All rights reserved.",
        "",
        "Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows",
        "",
    ]);
    const [currentDirectory, setCurrentDirectory] = useState("PS C:\\>");

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

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            processCommand(inputValue);
            setInputValue("");
        }
    };

    const processCommand = (command) => {
        let output = "";
        const [cmd, ...args] = command.trim().split(" ");

        switch (cmd) {
            case "cd":
                if (args.length > 0) {
                    setCurrentDirectory(`C:\\${args.join(" ")}`);
                    output = `Changed directory to ${args.join(" ")}`;
                } else {
                    output = "Usage: cd <directory>";
                }
                break;
            case "cls":
                setTerminalOutput([
                    "Windows PowerShell",
                    "Copyright (C) Microsoft Corporation. All rights reserved.",
                    "",
                    "Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows",
                    "",
                    "PS C:\\>"
                ]);
                return;
            default:
                output = `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`;
                break;
        }

        setTerminalOutput((prevOutput) => [...prevOutput, `> ${command}`, output]);
    };

    return (
        <div
            className={`absolute ${open.value.terminal ? "" : "hidden"} overflow-hidden w-[100vw] h-[95vh]`}
            ref={constraintsRef}
        >
            <motion.div
                key={"terminal"}
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
                <div className="w-[1000px] h-[700px] flex flex-col rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                    {/* Title Bar */}
                    <div className="absolute top-0 w-full flex justify-between bg-neutral-700 rounded-t-lg items-center flex-row">
                        <div className="flex flex-row text-lg gap-4 justify-center items-center font-mono ml-4 tracking-wide text-white">
                            <img
                                width={20}
                                height={10}
                                src="/apps/terminal.png"
                                alt="terminal"
                            />
                            Terminal
                        </div>
                        <div className="text-white h-10 w-fit flex justify-end select-none">
                            <button
                                className="material-symbols-outlined hover:bg-neutral-600 h-10 w-11 flex justify-center items-start text-xl"
                                onClick={() => open.set((prev) => ({ ...prev, terminal: false }))}
                            >
                                minimize
                            </button>
                            <button
                                className="material-symbols-outlined hover:bg-neutral-600 h-10 w-11 flex justify-center items-center text-sm"
                            >
                                check_box_outline_blank
                            </button>
                            <button
                                className="material-symbols-outlined rounded-tr-md hover:bg-red-700 w-12 h-10 flex justify-center items-center text-xl"
                                onClick={() => open.set((prev) => ({ ...prev, terminal: false }))}
                            >
                                close
                            </button>
                        </div>
                    </div>

                    {/* Terminal Output and Input */}
                    <div className="flex-grow p-4 mt-8 text-white bg-black font-mono overflow-y-auto">
                        {terminalOutput.map((line, index) => (
                            <div key={index} className="whitespace-pre-wrap">
                                {line}
                            </div>
                        ))}
                        <div className="flex mt-2">
                            <span className="text-green-400">{currentDirectory}</span>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                className="ml-2 flex-grow bg-transparent border-none outline-none text-white caret-green-400"
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
