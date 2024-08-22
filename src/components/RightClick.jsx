import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MenuItem = ({ icon, text, showArrow = false, onClick }) => (
  <div
    className="hover:bg-white hover:bg-opacity-10 my-2 rounded-md whitespace-nowrap w-full h-8 select-none flex items-center justify-between px-1"
    onClick={onClick}
  >
    <div className="flex items-center text-lg">
      {text === "Refresh" && (
        <div className="material-symbols-outlined flex justify-center items-center mr-3 w-6 h-6 opacity-70">
          refresh
        </div>
      )}
      {icon && <img src={icon} alt="" className="mr-3 w-6 h-6 opacity-70" />}
      {text}
    </div>
    {showArrow && (
      <div className="material-symbols-outlined opacity-50">
        chevron_right
      </div>
    )}
  </div>
);

function RightClick({ position, isVisible,open }) {
  const { name } = useParams();

  if (!isVisible) return null;

  return (
    <>
      <div
        className="z-50 p-2 shadow-lg rounded-lg backdrop-blur-lg bg-black bg-opacity-30 border border-gray-600 absolute"
        style={{ left: position.x, top: position.y }}
        role="menu"
        aria-labelledby="context-menu"
      >
        <div className="w-[18rem] text-white">
          <MenuItem icon="/options/view.png" text="View" showArrow />
          <MenuItem icon="/options/sort.png" text="Sort by" showArrow />
          <a href={`/${name}`}><MenuItem text="Refresh" /></a>
          <MenuItem icon="/options/undo.png" text="Undo" />
          <div className="border-t border-gray-500 my-1"></div>
          <MenuItem icon="/options/new.png" text="New" showArrow />
          <div className="border-t border-gray-500 my-1"></div>
          <MenuItem icon="/options/display-settings.svg" text="Display Settings" />
          <MenuItem icon="/options/personalize.png" text="Personalize" />
          <div className="border-t border-gray-500 my-1"></div>
          <MenuItem
            icon="/apps/terminal.png"
            text="Open Terminal"
            onClick={() => open.set((prev) => ({ ...prev, terminal: true }))} 
          />
          <div className="border-t border-gray-500 my-1"></div>
          <MenuItem icon="/options/show-more-option.svg" text="Show more options" />
        </div>
      </div>
    </>
  );
}

export default RightClick;
