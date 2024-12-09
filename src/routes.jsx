import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./app/home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
