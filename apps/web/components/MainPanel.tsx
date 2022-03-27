import { Grid } from "@chakra-ui/react";
import React from "react";
import { Panel } from "ui";

const MainPanel: React.FC = () => {
  return (
    <Grid placeItems="center" marginY="24">
      <Panel>
        <h1>Main Panel</h1>
      </Panel>
    </Grid>
  );
};

export default MainPanel;
