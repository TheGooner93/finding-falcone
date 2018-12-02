import React from "react";
import { Paper, Grid } from "@material-ui/core";

function AppFooter() {
  return (
    <div style={{ marginTop: "20px" }}>
      <Paper
        style={{
          background: "linear-gradient(45deg, #FDC830 30%, #F37335 90%)"
        }}
      >
        <Grid container justify="center">
          <Grid item xs={12}>
            <h4 style={{ color: "white" }} align="center">
              Coding problem -{" "}
              <a href="https://www.geektrust.in/coding-problem/frontend/space">
                https://www.geektrust.in/coding-problem/frontend/space
              </a>
            </h4>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default AppFooter;
