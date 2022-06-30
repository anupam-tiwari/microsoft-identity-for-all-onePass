import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="flex item-center justify-between p-6 w-full  px-8">
      <div className="w-28 flex items-center">
        <div
          className="flex cursor-pointer text-2xl"
          onClick={() => navigate("/")}
        >
          <div>One</div>
          <div className="font-bold text-[#008AD7]">Pass</div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="flex items-center">
          <div
            className="px-4 cursor-pointer hover:text-[#008AD7]"
            onClick={() => navigate("/home")}
          >
            Explore
          </div>
          <div
            className="px-4 cursor-pointer hover:text-[#008AD7]"
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
        </div>
      )}
      <div className="flex items-center">
        <div>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</div>
      </div>
    </div>
  );
};

export default Navbar;
