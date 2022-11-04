import React from "react";

const convertString = (str) => {
  return decodeURIComponent(
    JSON.parse('"' + str.replace(/\"/g, '\\"') + '"')
  ).replaceAll('"', "");
};

function Trigger({ setInfo, info }) {
  const registerIPonAWS = async () => {
    console.log("IP is", info.ip);

    if (info.ip == "") {
      alert("IP está vazio");
      return;
    }

    const requestOptions = {
      method: "PUT",
      //mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key1: info.ip, key2: info.name }),
    };
    fetch("/staging", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data - ", data);

        setInfo((prevState) => ({
          ...prevState,
          msg: data.errorMessage
            ? convertString(data.errorMessage)
            : convertString(data.body),
        }));
      });
  };

  return (
    <div id="triggerOnButton">
      <button onClick={() => registerIPonAWS()}>Atualizar IP</button>
    </div>
  );
}

export default Trigger;
