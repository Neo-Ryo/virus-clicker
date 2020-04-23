import React from "react";
import { Button, Icon, Grid, GridColumn, GridRow } from "semantic-ui-react";

class CreateTeamStartButton extends React.Component {
  render() {
    return (
      <Grid>
        <GridRow columns={2} centered>
          <Button color="teal" icon labelPosition="right">
            Start
            <Icon name="right arrow" />
          </Button>
        </GridRow>
      </Grid>
    );
  }
}

export default CreateTeamStartButton;
