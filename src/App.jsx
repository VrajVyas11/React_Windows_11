import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LockScreen from "./Landing/LockScreen.jsx";
import WindowsHome from "./Landing/WindowsHome.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LockScreen />} /> */}
        <Route path="/" element={<WindowsHome />} />
      </Routes>
    </Router>
  );
}

export default App;