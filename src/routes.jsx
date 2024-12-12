import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./app/home";
import Register from "./app/register";
import Test from "./app/test";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="test" element={<Test />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
