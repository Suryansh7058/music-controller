import React from 'react';
import { Button, Grid, Typography, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

const HomeContent = (props) => {
  return (
    <Grid container spacing={3} align="center">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Music Party
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup
          disableElevation
          variant="contained"
          color="primary"
          style={{ fontSize: '3rem' }}
        >
          <Button
            color="secondary"
            to="/create"
            component={Link}
            style={{ fontSize: '1.3rem' }}
          >
            Create a Room
          </Button>
          <Button
            color="primary"
            to="/join"
            style={{ fontSize: '1.3rem' }}
            component={Link}
          >
            Join a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default HomeContent;
