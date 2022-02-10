import React from 'react';
import { Box, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  method: {
    color: theme.palette.secondary.grey,
    fontWeight: '500',
  },
  resultAcc: {
    color: 'black',
    fontWeight: '600',
  },
  resultTime: {
    color: 'black',
    fontWeight: '600',
  },
}));

const ModelResult = (props) => {
  const { result } = props;
  const classes = useStyles();

  const formatAccuracy = (accuracy) => {
    if (accuracy) {
      return `${accuracy}%`;
    }
    return '';
  };

  const fromatTime = (time) => {
    if (time) {
      return `(${time})`;
    }
    return '';
  };

  return (
    <Box>
      <Box mt={2}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography className={classes.method}>TF-IDF & Unigram</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ textAlign: 'right' }}>
              <Typography className={classes.resultAcc}>{formatAccuracy(result.tfidf_unigram_acc)} <span className={classes.resultTime}>{fromatTime(result.tfidf_unigram_time)}</span></Typography>
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
              <Typography className={classes.resultAcc}>{formatAccuracy(result.tfidf_bigram_acc)} <span className={classes.resultTime}>{fromatTime(result.tfidf_bigram_time)}</span></Typography>
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
              <Typography className={classes.resultAcc}>{formatAccuracy(result.tfidf_trigram_acc)} <span className={classes.resultTime}>{fromatTime(result.tfidf_trigram_time)}</span></Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ModelResult;
