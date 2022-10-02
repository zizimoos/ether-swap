import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./scens/Home";
import About from "./scens/About";

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
