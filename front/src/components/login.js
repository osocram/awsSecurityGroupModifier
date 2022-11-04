import React from "react";
import { GoogleLogin } from "react-google-login";

function Login({ setInfo }) {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    console.log(res.profileObj.email);
    console.log(res.profileObj.name);
    setInfo((prevState) => ({
      ...prevState,
      email: res.profileObj.email,
      name: res.profileObj.name,
      loggedIn: true,
    }));
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={process.env.REACT_GOOGLE_CLIENTID}
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
