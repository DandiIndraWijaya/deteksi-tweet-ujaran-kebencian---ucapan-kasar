import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  displayer: {
    height: 500,
    overflow: 'scroll',
    width: '100%',
  },
}));

const DatasetDisplayer = (props) => {
  const { dataset } = props;
  const classes = useStyles();

  console.log('Data D : ', dataset);

  return (
    <Container>
      <Typography>Dataset Displayer</Typography>
      <Box className={classes.displayer}>
        {
          dataset?.map((data, key) => (
            <Grid key={key} container alignItems="center">
              <Grid item xs={9}>
                {data.tweet}
                <Box mb={2}>
                  <Divider />
                </Box>
              </Grid>
              <Grid item xs={3}>
                {data.hs}
              </Grid>
            </Grid>
          ))
        }
      </Box>
    </Container>
  );
};

export default DatasetDisplayer;
