import React from "react";
import { GoogleLogout } from "react-google-login";
import { initialConfig } from "../utils";
import { initialConfigIP } from "../utils";

function Logout({ setInfo }) {
  const onSuccess = () => {
    setInfo(initialConfigIP);
    alert("Logout made successfully");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
