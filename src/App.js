import { PageLayout } from "./components/PageLayout";
import { useState } from "react";
import { loginRequest } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Dashboard></Dashboard>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </>
  );
}

export default App;
