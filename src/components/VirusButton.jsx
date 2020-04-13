import React from "react";
import Virus from "./virus.png";

class VirusButton extends React.Component {
  render() {
    return (
      <div>
        <img
          src={Virus}
          alt="logo"
          style={{ width: "500px", margin: "100px" }}
        />
      </div>
    );
  }
}

export default VirusButton;
