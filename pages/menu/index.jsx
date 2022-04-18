import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import { CSSTransition } from 'react-transition-group';
import 'animate.css';
import Link from 'next/link';
import Navbar from '@components/Navbar';

const useStyles = makeStyles((theme) => ({
  researchTitle: {
    color: theme.palette.primary.main,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.main,
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  img: {
    width: '65%',
    borderRadius: 100,
    height: 200,
  },
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    padding: 20,
    cursor: 'pointer',
    borderRadius: 8,
    height: 400,
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
}));

const Menu = () => {
  const [transition1, setTransition1] = useState(false);
  const [transition2, setTransition2] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setTransition1(true), [500]);
    setTimeout(() => setTransition2(true), [1600]);
  }, []);

  return (
    <Layout>
      <Navbar />
      <Container>
        <Box mt={6}>
          {/* <Typography className={classes.researchTitle}>Deteksi Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia Menggunakan Support Vector Machine dan Random Forest dengan Teknik Voting Classifier</Typography> */}
          <Grid container alignItems="flex-start" spacing={3}>
            <Grid item xs={6}>
              <CSSTransition
                in={transition1}
                timeout={1500}
                unmountOnExit
                classNames="animate__animated animate__fadeIn animate__slower"
              >
                <Link href="/dataset">
                  <Box className={classes.card}>
                    <center>
                      <Typography variant="h3" className={classes.title}>Dataset</Typography>
                      <img className={classes.img} src="/assets/dataset_illus.png" alt="" />
                      <Typography className={classes.subtitle}>Melihat dataset Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia yang dipakai untuk pelatihan dan pengujian model</Typography>
                    </center>
                  </Box>
                </Link>
              </CSSTransition>
            </Grid>
            <Grid item xs={6}>
              <CSSTransition
                in={transition2}
                timeout={1500}
                unmountOnExit
                classNames="animate__animated animate__fadeIn animate__slower"
              >
                <Link href="/deteksi">
                  <Box className={classes.card}>
                    <center>
                      <Typography variant="h3" className={classes.title}>Deteksi</Typography>
                      <img className={classes.img} src="/assets/ml_illus.jpg" alt="" />
                      <Typography className={classes.subtitle}>Menguji kemampuan algoritma Support Vector Machine, Random Forest, dan Teknik Voting Classifier dalam mendeteksi Tweet Ujaran Kebencian dan Ucapan Kasar Berbahasa Indonesia</Typography>
                    </center>
                  </Box>
                </Link>
              </CSSTransition>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Menu;
