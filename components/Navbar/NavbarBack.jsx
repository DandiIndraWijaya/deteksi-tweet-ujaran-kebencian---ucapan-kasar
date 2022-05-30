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
  arrowIcon: {
    color: theme.palette.primary.main,
  },
  page: {
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
    },
  },
}));

const NavbarBack = (props) => {
  const { currentPage } = props;
  const router = useRouter();
  const classes = useStyles();

  const onClickBack = () => {
    router.back();
  };

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <IconButton size="small" onClick={onClickBack}>
            <ArrowBack className={classes.arrowIcon} fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.page}>{currentPage}</Typography>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavbarBack;
