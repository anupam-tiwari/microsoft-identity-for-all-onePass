import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useNavigate } from "react-router-dom";

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <button
      variant="secondary"
      className="text-white bg-black w-30 px-6 py-2 rounded-xl"
      onClick={() => handleLogin(instance)}
    >
      Login
    </button>
  );
};
