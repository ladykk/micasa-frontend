import React from "react";
import SignInForm from "./MenuOverlay/SignInForm";
import UserMenu from "./MenuOverlay/UserMenu";

const MenuOverlay = ({ user, handleSignIn, handleSignOut, toggleOverlay }) => {
  return (
    <div className="w-80 h-auto bg-black bg-opacity-70 rounded-xl flex-shrink-0 mt-3">
      {user.username ? (
        <UserMenu
          user={user}
          handleSignOut={handleSignOut}
          toggleOverlay={toggleOverlay}
        />
      ) : (
        <SignInForm handleSignIn={handleSignIn} toggleOverlay={toggleOverlay} />
      )}
    </div>
  );
};

export default MenuOverlay;
