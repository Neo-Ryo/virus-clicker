import React from "react";
import {
  Placeholder,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Input,
} from "semantic-ui-react";

function CreateTeamLogo(props) {
  return (<>
    <Grid>
      <GridRow columns={2}>
        <Input label="http://" placeholder="Write your url image here"/>
      </GridRow>
      <GridRow columns={3}>
        <GridColumn verticalAlign="middle">
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image/>
          </Placeholder>
        </GridColumn>
        <GridColumn verticalAlign="bottom">
          <Button size="tiny">+</Button>
        </GridColumn>
      </GridRow>
    </Grid>
    </>
  );
}

export default CreateTeamLogo;
