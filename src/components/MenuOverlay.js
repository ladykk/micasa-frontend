import React from "react";
import LoginForm from "./MenuOverlay/LoginForm";
import UserMenu from "./MenuOverlay/UserMenu";

const MenuOverlay = ({ user, handleSignIn }) => {
  return (
    <div className="w-80 h-auto bg-black bg-opacity-70 rounded-xl flex-shrink-0 mt-3">
      {user ? (
        <UserMenu user={user} />
      ) : (
        <LoginForm handleSignIn={handleSignIn} />
      )}
    </div>
  );
};

export default MenuOverlay;
