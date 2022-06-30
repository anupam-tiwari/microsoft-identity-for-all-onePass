import React from "react";
import Navbar from "../components/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import phone from "../assets/phone.png";

const Home = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <Navbar></Navbar>
      <hr></hr>
      <div className="flex items-center justify-center h-[50rem]">
        <div className="flex w-[50%] justify-center">
          <div>
            <div className="text-7xl">Making Travelling</div>
            <div className="text-7xl font-bold text-[#008AD7]">FUN</div>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={phone} className="w-[50%]"></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
