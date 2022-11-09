import React from "react";
import { GoogleLogin } from "react-google-login";

function Login({ setInfo }) {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    console.log(res.profileObj.email);
    console.log(res.profileObj.name);
    //contain email
    //email_dominio = "";
    const email_dominio = res.profileObj.email.split("@")[1];

    console.log(email_dominio.toUpperCase());

    if (process.env.REACT_APP_FILTER_DOMAIN == "") {
      setInfo((prevState) => ({
        ...prevState,
        email: res.profileObj.email,
        name: res.profileObj.name,
        loggedIn: true,
      }));
    } else if (
      email_dominio.toUpperCase() == process.env.REACT_APP_FILTER_DOMAIN
    ) {
      console.log("email igual dominio");
      setInfo((prevState) => ({
        ...prevState,
        email: res.profileObj.email,
        name: res.profileObj.name,
        loggedIn: true,
      }));
    } else {
      console.log(email_dominio.toUpperCase());
      console.log(process.env.REACT_APP_FILTER_DOMAIN);
      console.log("[Login failed] Este dominio não é permitido");
      setInfo((prevState) => ({
        ...prevState,
        msg:
          "Este dominio não é permitido [" +
          process.env.REACT_APP_FILTER_DOMAIN +
          "]",
      }));
    }
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        //clientId="475815065806-rfv11tup457jgbsbqu8ikeiieet2h4o5.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
