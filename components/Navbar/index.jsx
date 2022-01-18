import React from 'react';
import { Box, Typography, Grid, Button, IconButton, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.text.white,
    boxShadow: 'none !important',
    color: '#000',
  },
  title: {
    fontSize: 18,
    color: theme.palette.text.white,
  },
}));

const Navbar = (props) => {
  const { currentPage } = props;
  const router = useRouter();
  const classes = useStyles();

  const onClickBack = () => {
    router.back();
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Box style={{ padding: 20, backgroundColor: '#1DA1F2' }}>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Typography className={classes.title}>Deteksi Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia</Typography>
          </Grid>
          <Grid item xs={1}>
            <img src="/assets/logo_twitter.png" alt="" style={{ width: '40%' }} />
          </Grid>
        </Grid>
      </Box>
    </AppBar>
  );
};

export default Navbar;
