import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import { CSSTransition } from 'react-transition-group';
import 'animate.css';
import Link from 'next/link';
import Navbar from '@components/Navbar';

const useStyles = makeStyles((theme) => ({
  researchTitle: {
    color: theme.palette.primary.main,
    fontSize: 22,
    fontWeight: 'semibold',
    textAlign: 'center',
    marginTop: 30,
  },
  unnesLogo: {
    width: '10%',
    borderRadius: 100,
  },
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    color: '#ffff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
}));

const Home = () => {
  const [transition1, setTransition1] = useState(false);
  const [transition2, setTransition2] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setTransition1(true), [500]);
    setTimeout(() => setTransition2(true), [1600]);
  }, []);

  return (
    <Layout>
      {/* <Navbar /> */}
      <Container>
        <Box mt={4}>
          <CSSTransition
            in={transition1}
            timeout={1500}
            unmountOnExit
            classNames="animate__animated animate__bounce animate__slower"
          >
            <Box>
              <Box>
                <center><img className={classes.unnesLogo} src="/assets/logo-unnes.png" alt="" /></center>
              </Box>
              <Box className={classes.card}>
                <center>
                  <Typography>Skripsi disusun oleh:</Typography>
                  <Typography>Dandi Indra Wijaya, 4611418013</Typography>
                </center>
                <Box mt={3}>
                  <Typography className={classes.researchTitle}>
                    Deteksi Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia Menggunakan Random Forest dan Support Vector Machine dengan Teknik Voting Classifier
                  </Typography>
                </Box>
                <Box mt={3}>
                  <center>
                    <Typography>Dosen Pembimbing:</Typography>
                    <Typography>Riza Arifudin S.Pd., M.Cs.</Typography>
                    <Typography> NIP: 198005252005011001</Typography>
                  </center>
                </Box>
              </Box>
            </Box>
          </CSSTransition>
          <CSSTransition
            in={transition2}
            timeout={1500}
            unmountOnExit
            classNames="animate__animated animate__bounce animate__slower"
          >
            <Box mt={3}>
              <center>
                <Link href="/menu">
                  <Button className={classes.btn} type="contained">
                    Menu
                  </Button>
                </Link>
              </center>
            </Box>
          </CSSTransition>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
