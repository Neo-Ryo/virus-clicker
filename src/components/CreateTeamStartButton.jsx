import React from 'react';
import { Button, Grid, GridRow } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function CreateTeamStartButton({ searchingTeam }) {
  return (
    <>
      <Grid>
        <GridRow columns={2} centered>
          <Button color="teal" onClick={searchingTeam}>
            Start
          </Button>
        </GridRow>
      </Grid>
    </>
  );
}

CreateTeamStartButton.propTypes = {
  searchingTeam: PropTypes.func.isRequired,
};

export default CreateTeamStartButton;
