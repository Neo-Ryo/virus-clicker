import React from "react";
import { Input, Icon, Grid, GridRow, GridColumn } from "semantic-ui-react";

function CreateTeamInput ({teamTape, handleChange}) {
    return (
      <>
        <Grid>
          <GridRow columns={2}>
            <GridColumn>
              <Input
                size="small"
                label={{ icon: "asterisk" }}
                labelPosition="right corner"
                placeholder="Team name..."
                value= {teamTape}
                onChange={handleChange}
              />
              <p>{teamTape}</p>
            </GridColumn>
            <GridColumn width={2}>
              <Icon size="small" name="checkmark" color="green" />
            </GridColumn>
          </GridRow>
        </Grid>
      </>
    );
}
export default CreateTeamInput;
