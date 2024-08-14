import React, { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Tldraw } from 'tldraw';
import "../index.css";

function DrawBoard({ open }) {
    const initialX = window.innerWidth / 2.5;
    const initialY = window.innerHeight / 5;

    const [iconPositions, setIconPositions] = useState({
        x: initialX,
        y: initialY,
    });

    const constraintsRef = useRef(null);
    const dragControls = useDragControls();
    const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

    useEffect(() => {
        const calculateConstraints = () => {
            const elementWidth = 1000; // Adjust the width to match the window size
            const elementHeight = 700; // Adjust the height to match the window size
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

    const startDrag = (event) => {
        dragControls.start(event);
    };

    return (
        <div
            className={`absolute  ${open.value ? "" : "hidden"} overflow-hidden w-[100vw] h-[95vh]`}
            ref={constraintsRef}
            onDoubleClick={(e) => e.preventDefault()} // Prevent default double-click behavior
        >
            <motion.div
                key={"draw"}
                drag
                dragControls={dragControls}
                dragListener={false}  // Disable default drag listener
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
                <div className="w-[1000px] h-[700px] absolute  flex flex-col justify-between rounded-md bg-[#212121] select-none">
                    {/* select-none disables text selection */}
                    <div
                        className="w-full flex justify-between z-50"
                        onPointerDown={startDrag} // Trigger drag on pointer down
                        onDoubleClick={(e) => e.preventDefault()} // Prevent default double-click behavior
                    >
                        <div className={`flex flex-row text-lg gap-4 justify-center items-center  font-mono m-1 ml-4 tracking-wider text-white select-none`}>
                            <img width={25} height={10} src="/apps/Drawboard.png" alt="Drawboard" />
                            Drawboard
                        </div>
                        <button
                            onClick={() => open.set((prev) => (prev.drawboard = false))}
                            className={`material-symbols-outlined py-1.5 px-5 rounded-tr-md hover:bg-red-500 text-white select-none`}
                        >
                            close
                        </button>
                    </div>
                    <div className="flex-grow rounded-sm relative overflow-hidden w-full">
                        <Tldraw />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default DrawBoard;
