import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Browser({ open }) {
  const initialX = window.innerWidth / 2.5;
  const initialY = window.innerHeight / 5;
  
  const explorerRef = useRef(null);
  const { name } = useParams();

  const [iconPositions, setIconPositions] = useState({ x: initialX, y: initialY });
  const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const [tabs, setTabs] = useState([{ id: 1, url: "https://www.google.com/webhp?igu=1", title: "New Tab", active: true }]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const calculateConstraints = () => {
      const elementWidth = 1128; // Assuming the element width is 1128px
      const elementHeight = 720; // Assuming the element height is 720px
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

  const addTab = () => {
    const newTab = { id: Date.now(), url: "https://www.google.com/webhp?igu=1", title: "New Tab", active: true };
    setTabs((prevTabs) => [...prevTabs.map(tab => ({ ...tab, active: false })), newTab]);
    setActiveTab(newTab.id);
  };

  const switchTab = (tabId) => {
    setTabs((prevTabs) => prevTabs.map(tab => ({ ...tab, active: tab.id === tabId })));
    setActiveTab(tabId);
  };

  const closeTab = (tabId) => {
    const updatedTabs = tabs.filter(tab => tab.id !== tabId);
    if (updatedTabs.length > 0) {
      const newActiveTab = tabId === activeTab ? updatedTabs[0].id : activeTab;
      setTabs(updatedTabs.map(tab => ({ ...tab, active: tab.id === newActiveTab })));
      setActiveTab(newActiveTab);
    } else {
      open.set((prev)=>prev.browser=false)
    }
  };

  const refreshTab = () => {
    setTabs((prevTabs) =>
      prevTabs.map(tab =>
        tab.id === activeTab ? { ...tab, url: tab.url } : tab
      )
    );
  };

  return (
    <div className={`${open.value ? "" : "hidden"} z-30 w-full h-screen text-white pointer-events-none absolute`}>
      <div className="absolute overflow-hidden w-[100vw] h-[95vh]" ref={explorerRef}>
        <motion.div
          drag
          dragConstraints={constraints}
          dragMomentum={false}
          initial={{ x: initialX, y: initialY }}
          animate={{ x: iconPositions.x, y: iconPositions.y }}
          onDragEnd={(event, info) => {
            setIconPositions({
              x: Math.max(constraints.left, Math.min(iconPositions.x + info.offset.x, constraints.right)),
              y: Math.max(constraints.top, Math.min(iconPositions.y + info.offset.y, constraints.bottom)),
            });
          }}
          className="absolute bg-neutral-900 h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
        >
          <div className="flex justify-center items-center">
            <div className="text-white h-9 w-full flex justify-end select-none">
              <div
                className="material-symbols-outlined hover:bg-neutral-800 h-12  w-11 flex justify-center items-start text-xl"
                onClick={()=>open.set((prev)=>prev.browser=false)}
              >
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-neutral-800 h-10 w-11 flex justify-center items-center text-sm">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined hover:bg-red-700 w-12 h-10 flex rounded-tr-md justify-center items-center text-xl"
                onClick={()=>open.set((prev)=>prev.browser=false)}
              >
                close
              </div>
            </div>
          </div>

     
          <div className="absolute bg-neutral-800 top-[6.5px] h-[2.3em] left-[6px] rounded-t-lg flex">
            <div className="flex justify-center items-center w-full overflow-hidden">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`pl-2 text-sm h-9 w-60 mb-2 rounded-r-lg justify-between flex items-center ${tab.active ? "bg-neutral-800 text-white" : "text-gray-400 bg-neutral-900"}`}
                  onClick={() => switchTab(tab.id)}
                >
                  <div>{tab.title}</div>
                  <div
                    className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                  >
                    close
                  </div>
                </div>
              ))}
              <div
                className="material-symbols-outlined relative text-white ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl"
                onClick={addTab}
              >
                add
              </div>
            </div>
          </div>

          <div className="flex bg-neutral-800 w-full h-10 border-neutral-700 border-b-[1.5px] mt-1">
            <div className="flex py-1 w-28 justify-around">
              <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_back</div>
              <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_forward</div>
              <div
                className="material-symbols-outlined font-extralight text-xl hover:bg-neutral-600 rounded-xl hover:bg-opacity-50"
                onClick={refreshTab}
              >
                refresh
              </div>
            </div>
            <div className="w-[48vw] my-1.5 rounded-xl bg-neutral-700 relative">
              <div className="opacity-50 text-left pl-3 flex items-center h-full">
                <span className="material-symbols-outlined text-[20px] pr-3">search</span>
                Search Google or type a URL
              </div>
              <div className="absolute right-2 top-0 text-lg opacity-80 material-symbols-outlined">star</div>
            </div>
            <div className="avatar placeholder flex justify-center items-center ml-6">
              <div className="bg-black text-white rounded-full w-6 h-6">
                {name && <div className="text-white text-md font-normal">{name.charAt(0).toUpperCase()}</div>}
              </div>
            </div>
            <img src="/options/dots.png" alt="options" className="h-4 w-4 rotate-90 m-2.5 opacity-60" />
          </div>

          <div className="h-[50em]">
            <div className="h-full w-full flex flex-col flex-grow">
              {tabs.map((tab) => (
                <iframe
                  key={tab.id}
                  src={tab.url}
                  className={`flex-grow ${tab.active ? "" : "hidden"}`}
                  id="chrome-screen"
                  title="Chrome Tab"
                ></iframe>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Browser;
