import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "./pages";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
