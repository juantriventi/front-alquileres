import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button className="logout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Cerrar sesion
    </button>
  );
};

