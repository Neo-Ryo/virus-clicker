import React from "react";
import CreateTeamTitles from "./CreateTeamTitles";
import CreateTeamInput from "./CreateTeamInput";
import CreateTeamLogo from "./CreateTeamLogo";
import CreateTeamStartButton from "./CreateTeamStartButton";

class CreateTeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
    };
  }
  render() {
    return (
      <>
        <CreateTeamTitles />

        <CreateTeamInput />
        <CreateTeamLogo/>
        <CreateTeamStartButton/>
      </>
    );
  }
}
export default CreateTeamPage;
