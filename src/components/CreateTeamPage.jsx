import React from "react";
import CreateTeamTitles from "./CreateTeamTitles";
import CreateTeamInput from "./CreateTeamInput";
import CreateTeamLogo from "./CreateTeamLogo";

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
      </>
    );
  }
}
export default CreateTeamPage;
