import React from 'react'

const ExitScreens = ({
    isSleeping,
    actionType
}) => {
    return (
        <>
            {isSleeping &&actionType === "shutdown" && <div className={`z-50 bg-[#005a9e] flex flex-col text-white text-2xl justify-center items-center  absolute w-[100vw] h-[100vh]`}>
                <img src='./apps/shutdown.svg' />
                Shutting down
            </div>}
            {isSleeping &&actionType === "restart" && <div className={`z-50 bg-[#005a9e] flex flex-col text-white text-2xl justify-center items-center  absolute w-[100vw] h-[100vh]`}>
                <img src='./apps/shutdown.svg' />
                Restarting
            </div>}
            {isSleeping &&actionType === "shutdown" && <div className={`z-50 bg-[#005a9e] flex flex-col text-white text-2xl justify-center items-center  absolute w-[100vw] h-[100vh]`}>
                <img src='./apps/shutdown.svg' />
                Shutting down
            </div>}
        </>
    )
}

export default ExitScreens