import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <button
      variant="secondary"
      className="text-white bg-black w-30 px-6 py-2 rounded-xl"
      onClick={() => handleLogout(instance)}
    >
      Logout
    </button>
  );
};
