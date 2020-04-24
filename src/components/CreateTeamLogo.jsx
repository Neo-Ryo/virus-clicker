import React from "react";
import {
  Placeholder,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Input,
} from "semantic-ui-react";

function CreateTeamLogo({logo, getUrl}) {
  return (<>
    <Grid>
      <GridRow columns={2}>
        <Input type="url" label="Url image" placeholder="http://virus_clicker.com" value={logo} onChange={getUrl}/>
      </GridRow>
      <GridRow columns={3}>
        <GridColumn verticalAlign="middle">
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image/>
          </Placeholder>
        </GridColumn>
      </GridRow>
    </Grid>
    </>
  );
}

export default CreateTeamLogo;
