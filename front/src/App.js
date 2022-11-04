import "./App.css";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import TriggerButton from "./components/trigger";
import { gapi } from "gapi-script";
import { initialConfig } from "./utils";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [awsInfo, setAwsInfo] = useState(initialConfig);

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setAwsInfo({ ...awsInfo, ip: res.data.IPv4 });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_GOOGLE_CLIENTID,
        scope: "",
      });
      getData();
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="App">
      {awsInfo.loggedIn ? (
        <div>
          <h1>Logged in</h1>
          <h2>IP: {awsInfo.ip}</h2>
          <h2>Email: {awsInfo.email}</h2>
          <h2>Name: {awsInfo.name}</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <LogoutButton setInfo={setAwsInfo} />
            <TriggerButton setInfo={setAwsInfo} info={awsInfo} />
          </div>
          {awsInfo.msg !== "" && <h2>Resposta: {awsInfo.msg}</h2>}
        </div>
      ) : (
        <div>
          <LoginButton setInfo={setAwsInfo} />
          <h2>Your IP Address is</h2>
          <h4>{awsInfo.ip}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
