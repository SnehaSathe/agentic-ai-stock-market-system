import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DataCollectorPage from "./pages/DataCollectorPage";
import TechnicalPage from "./pages/TechnicalPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-collector" element={<DataCollectorPage />} />
        <Route path="/technical-analysis" element={<TechnicalPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
