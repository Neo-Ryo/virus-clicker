import React from "react";
import { Button, Grid, GridRow } from "semantic-ui-react";

function CreateTeamStartButton({searchingTeam}) {

    return (<>
      <Grid>
        <GridRow columns={2} centered>
            <Button 
            color="teal"
            onClick={searchingTeam}
            >
              Start
            </Button>
        </GridRow>
      </Grid>
      </>
    );
}

export default CreateTeamStartButton;
