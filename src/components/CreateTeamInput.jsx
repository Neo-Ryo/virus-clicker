import React from "react";
import { Input, Icon } from "semantic-ui-react";

function CreateTeamInput(props) {
  return (
    <>
      <Input
        label={{ icon: "asterisk" }}
        labelPosition="right corner"
        placeholder="Team name..."
      />
      <Icon name="checkmark" color="green" disabled />
    </>
  );
}
export default CreateTeamInput;
