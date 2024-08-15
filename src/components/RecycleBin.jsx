import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const RecycleBin = ({ open }) => {
  const initialX = window.innerWidth / 2.5;
  const initialY = window.innerHeight / 5;

  const [iconPositions, setIconPositions] = useState({
    x: initialX,
    y: initialY,
  });

  const constraintsRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const calculateConstraints = () => {
      const elementWidth = 1128; // Assuming the element width is 1128px
      const elementHeight = 624; // Assuming the element height is 624px
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

  return (
    <div
      className={`${
        open.value ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
      ref={constraintsRef}
    >
      <motion.div
        drag
        dragConstraints={constraints}
        dragMomentum={false}
        className="absolute pointer-events-auto"
        initial={{ x: initialX, y: initialY }}
        animate={{ x: iconPositions.x, y: iconPositions.y }}
        onDragEnd={(event, info) => {
          setIconPositions({
            x: Math.max(constraints.left, Math.min(iconPositions.x + info.offset.x, constraints.right)),
            y: Math.max(constraints.top, Math.min(iconPositions.y + info.offset.y, constraints.bottom)),
          });
        }}
      >
        <div
          className=" bg-black h-[39rem] w-[70.5rem] rounded-xl overflow-hidden border-[1.5px] border-neutral-700"
        >
           <div className="flex justify-center items-center">
            <div className="text-white h-9 w-full flex justify-end select-none">
              <div
                className="material-symbols-outlined hover:bg-neutral-800 h-12  w-11 flex justify-center items-start text-xl"
                onClick={()=>open.set((prev)=>prev.recycle=false)}
              >
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-neutral-800 h-10 w-11 flex justify-center items-center text-sm">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined hover:bg-red-700 w-12 h-10 flex rounded-tr-md justify-center items-center text-xl"
                onClick={()=>open.set((prev)=>prev.recycle=false)}
              >
                close
              </div>
            </div>
          </div>
          <div className="content text-white select-none">
            <div className="absolute bg-neutral-800 top-[6.5px] h-[2.3em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-xs flex">
                  <img
                    src={`/apps/recyclebin.png`}
                    alt="main icons"
                    className="w-5 h-5 mr-2"
                  />
                  Recycle Bin
                </div>
                <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                  close
                </div>
              </div>
              <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                add
              </div>
            </div>
            <div className="bg-neutral-800 w-full h-12 border-b-[1.5px] border-neutral-700 mt-1 flex">
              <div className="flex justify-around w-48 py-2">
                <div className="material-symbols-outlined font-extralight text-xl opacity-45">
                  arrow_back
                </div>
                <div className="material-symbols-outlined font-extralight text-xl opacity-45">
                  arrow_forward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl hover:bg-neutral-600 rounded-md hover:bg-opacity-50">
                  arrow_upward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl hover:bg-neutral-600 rounded-md hover:bg-opacity-50">
                  refresh
                </div>
              </div>
              <div className="flex bg-neutral-700 bg-opacity-50 my-1.5 rounded-md items-center text-sm px-2 mx-2 flex-grow gap-2 font-extralight">
                <div className="material-symbols-outlined font-extralight">
                  home
                </div>
                <div className="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
                <div>Recycle Bin</div>
                <div className="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
              </div>
              <div className="flex justify-between bg-neutral-700 bg-opacity-50 my-1.5 rounded-md items-center text-sm px-4 mr-3 w-[19.3em]">
                <div className="opacity-80">Search Recycle Bin</div>
                <div className="material-symbols-outlined font-extralight text-sm">
                  search
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 w-full h-[3.4rem] border-b-[1.5px] border-neutral-700 flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-24 h-full text-xs gap-1 border-r-[1.5px] border-neutral-700 opacity-45">
                  <img
                    src="/options/new.png"
                    alt="new"
                    className="w-5 h-5"
                  />
                  New
                  <div className="material-symbols-outlined text-sm">
                    expand_more
                  </div>
                </div>
                <div className="flex h-full w-72 justify-around items-center border-r-[1.5px] border-neutral-700 opacity-45">
                  <img
                    src="/options/cut.png"
                    alt="cut"
                    className="h-5 w-5"
                  />
                  <img
                    src="/options/copy.png"
                    alt="copy"
                    className="h-5 w-5"
                  />
                  <img
                    src="/options/paste.png"
                    alt="paste"
                    className="h-7 w-7"
                  />
                  <img
                    src="/options/rename.png"
                    alt="rename"
                    className="h-5 w-5"
                  />
                  <img
                    src="/options/share.png"
                    alt="share"
                    className="h-5 w-5"
                  />
                  <img
                    src="/options/delete.png"
                    alt="delete"
                    className="h-5 w-5"
                  />
                </div>
                <div className="flex h-full items-center w-72 justify-around border-r-[1.5px] border-neutral-700">
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-45">
                    <img
                      src="/options/sort.png"
                      alt="sort"
                      className="w-5 h-5"
                    />
                    Sort
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/options/view.png"
                      alt="view"
                      className="w-5 h-5"
                    />
                    View
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/options/filter.png"
                      alt="filter"
                      className="w-5 h-5"
                    />
                    Filter
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                </div>
                <img
                  src="/options/dots.png"
                  alt="dots"
                  className="w-3.5 h-3.5 ml-4"
                />
              </div>
              <div className="flex items-center mr-8 text-xs">
                <img
                  src="/options/details.png"
                  alt="details"
                  className="w-5 h-5 mr-1"
                />
                Details
              </div>
            </div>
            <div className="flex flex-row h-full bg-neutral-900">
              <div className="w-40 h-[100vh] pt-2 border-r-[1.5px] border-neutral-700 px-[2px]">
                <div className="border-b-[1.5px] border-neutral-700 h-20">
                  <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/home.png"
                      alt="home"
                      className="w-5 h-5 mr-1"
                    />
                    Home
                  </div>
                  <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/gallery.png"
                      alt="gallery"
                      className="w-5 h-5 mr-1"
                    />
                    Gallery
                  </div>
                </div>
                <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/Desktop.ico"
                      alt="desktop"
                      className="w-5 h-5 mr-1"
                    />
                    Desktop
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="./apps/Downloads.ico"
                      alt="download"
                      className="w-5 h-5 mr-1"
                    />
                    Downloads
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/Documents.ico"
                      alt="documents"
                      className="w-5 h-5 mr-1"
                    />
                    Documents
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/Movies.ico"
                      alt="movies"
                      className="w-5 h-5 mr-1"
                    />
                    Movies
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/Music.ico"
                      alt="music"
                      className="w-5 h-5 mr-1"
                    />
                    Music
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/apps/Pictures.ico"
                      alt="pictures"
                      className="w-5 h-5 mr-1"
                    />
                    Pictures
                    <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                      keep
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                  <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                    <img
                      src="/apps/Computer.ico"
                      alt="details"
                      className="w-4 h-4 mr-1"
                    />
                    This PC
                    <div className="material-symbols-outlined absolute left-2 text-lg opacity-30">
                      chevron_right
                    </div>
                  </div>
                  <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                    <img
                      src="/apps/Network.ico"
                      alt="details"
                      className="w-4 h-4 mr-1"
                    />
                    Network
                    <div className="material-symbols-outlined absolute left-2 text-lg opacity-30">
                      chevron_right
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-0 flex mx-auto mt-2 text-sm">
                This folder is empty.
              </div>
            </div>
            <div className="absolute bottom-0 h-5 bg-neutral-900 w-full text-xs py-1 pl-2">
              <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full text-xs font-extralight">
                0 items
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecycleBin;
