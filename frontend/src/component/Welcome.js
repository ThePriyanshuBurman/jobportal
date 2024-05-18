import * as React from 'react';
import { Grid, Typography, CssBaseline, Box, Container } from "@material-ui/core";
import '@fontsource/roboto/500.css';

const Welcome = (props) => {
  return (
    // <React.Fragment>
    //   <CssBaseline />
    //   <Container maxWidth="xl">
    //     <Box sx={{ bgcolor: '#cfe8fc', height: '100vh'}} />
    //     <Typography variant="h2">Welcome to Job Portal</Typography>
    //   </Container>
    // </React.Fragment>
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Welcome to Job Portal</Typography>
      </Grid>
    </Grid> 
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
