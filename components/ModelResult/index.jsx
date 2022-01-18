import React from 'react';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  method: {
    color: theme.palette.secondary.grey,
    fontWeight: '500',
  },
  resultAcc: {
    color: theme.palette.secondary.grey,
    fontWeight: '500',
  },
  resultTime: {
    color: theme.palette.secondary.grey,
    fontWeight: '500',
  },
}));

const ModelResult = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.method}>TF-IDF & Unigram</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ textAlign: 'right' }}>
              <Typography className={classes.resultAcc}>80.12% <span className={classes.resultTime}>(3m, 27d)</span></Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.method}>TF-IDF & Bigram</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ textAlign: 'right' }}>
              <Typography>-</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.method}>TF-IDF & Trigram</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ textAlign: 'right' }}>
              <Typography>-</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ModelResult;
