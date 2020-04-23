import React from "react";
import {
  Placeholder,
  Button,
  Grid,
  GridRow,
  GridColumn,
} from "semantic-ui-react";

function CreateTeamLogo(props) {
  return (
    <Grid>
      <GridRow columns={2} centered>
        <GridColumn>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image rounded />
          </Placeholder>
        </GridColumn>
      </GridRow>
      <GridRow columns={2} centered>
        <GridColumn>
          <Button color="teal" icon="add" content="Add a logo" size="tiny"/>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}

export default CreateTeamLogo;
