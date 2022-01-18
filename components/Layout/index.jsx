import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  layout: {
    backgroundColor: theme.palette.text.white,
    width: '100%',
    margin: 'auto',
    paddingBottom: 15,
  },
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.layout} elevation={0}>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          color: '#1DA1F2',
        }}
      />
      {children}
    </Paper>
  );
};

export default Layout;
