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
      <GridRow columns={3} centered>
        <GridColumn verticalAlign='middle'>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image rounded />
          </Placeholder>
        </GridColumn>
        <GridColumn verticalAlign="bottom">
          <Button icon="add" size="tiny" />
        </GridColumn>
      </GridRow>
    </Grid>
  );
}

export default CreateTeamLogo;
