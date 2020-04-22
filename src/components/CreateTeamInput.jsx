import React from "react";
import { Input, Icon, Grid, GridRow, GridColumn } from "semantic-ui-react";

function CreateTeamInput(props) {
  return (
    <Grid>
      <GridRow columns={2} centered>
        <GridColumn>
          <Input
            label={{ icon: "asterisk" }}
            labelPosition="right corner"
            placeholder="Team name..."
          />
          <Icon name="checkmark" color="green"/>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
export default CreateTeamInput;
