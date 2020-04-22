import React from "react";
import { Input, Icon, Grid, GridRow, GridColumn } from "semantic-ui-react";

function CreateTeamInput(props) {
  return (
    <Grid>
      <GridRow columns={2} centered>
        <GridColumn>
          <Input
            size="small"
            label={{ icon: "asterisk" }}
            labelPosition="right corner"
            placeholder="Team name..."
          />
        </GridColumn>
        <GridColumn width={2} centered>
          <Icon size="small" name="checkmark" color="green" />
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
export default CreateTeamInput;
