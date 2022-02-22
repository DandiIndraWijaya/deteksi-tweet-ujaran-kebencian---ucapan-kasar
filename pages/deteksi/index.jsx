import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Radio, RadioGroup, Divider, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import { CSSTransition } from 'react-transition-group';
import ModelResult from '@components/ModelResult';
import 'animate.css';
import NavbarBack from '@components/Navbar/NavbarBack';
import { connect } from 'react-redux';
import { getModelResult } from '@src/redux/actions/model';

const useStyles = makeStyles((theme) => ({
  researchTitle: {
    color: theme.palette.primary.main,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: 8,
    // '&:hover': {
    //   boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    // },
  },
  method: {
    color: theme.palette.secondary.grey,
    fontWeight: '500',
  },
  deteksiBtn: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    color: '#ffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  hasilTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
  },
  progressIcon: {
    color: '#ffff',
    fontSize: 3,
  },
}));

const Deteksi = (props) => {
  const { modelResult, getModelResult } = props;
  const [transition1, setTransition1] = useState(false);
  const [transition2, setTransition2] = useState(false);
  const [transition3, setTransition3] = useState(false);
  const [svmLoading, setSvmLoading] = useState(false);
  const [svmFeatureExtraction, setSvmFeatureExtraction] = useState('unigram');
  const [rfFeatureExtraction, setRfFeatureExtraction] = useState('unigram');
  const [vcFeatureExtraction, setVcFeatrueExtraction] = useState('unigram');
  const [result, setResult] = useState({
    svm: {
      tfidf_unigram_acc: '',
      tfidf_bigram_acc: '',
      tfidf_trigram_acc: '',
      tfidf_unigram_time: '',
      tfidf_bigram_time: '',
      tfidf_trigram_time: '',
      updated_at: '',
    },
    rf: {
      tfidf_unigram_acc: '',
      tfidf_bigram_acc: '',
      tfidf_trigram_acc: '',
      tfidf_unigram_time: '',
      tfidf_bigram_time: '',
      tfidf_trigram_time: '',
      updated_at: '',
    },
    vc: {
      tfidf_unigram_acc: '',
      tfidf_bigram_acc: '',
      tfidf_trigram_acc: '',
      tfidf_unigram_time: '',
      tfidf_bigram_time: '',
      tfidf_trigram_time: '',
      updated_at: '',
    },
  });
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => setTransition1(true), [500]);
    setTimeout(() => setTransition2(true), [1600]);
    setTimeout(() => setTransition3(true), [2500]);
    getModelResult();
  }, []);

  useEffect(() => {
    if (modelResult?.data === undefined) return;
    setResult(modelResult.data);
  }, [modelResult]);

  const onTrain = () => {
    setSvmLoading(true);
    setTimeout(() => setSvmLoading(false), 2000);
  };

  const onChangeSvmRadio = (e) => {
    setSvmFeatureExtraction(e.target.value);
  };

  const onChangeRfRadio = (e) => {
    setRfFeatureExtraction(e.target.value);
  };

  const onChangeVcRadio = (e) => {
    setVcFeatrueExtraction(e.target.value);
  };

  return (
    <Layout>
      <Container>
        <NavbarBack currentPage="Deteksi" />
        <Box mt={6}>
          <Grid container alignItems="flex-start" spacing={3}>
            <Grid item xs={4}>
              <CSSTransition
                in={transition1}
                timeout={1500}
                unmountOnExit
                classNames="animate__animated animate__bounce animate__slower"
              >
                <Box className={classes.card}>
                  <center>
                    <Typography className={classes.title}>Support Vector Machine</Typography>
                  </center>
                  <Box mt={3}>
                    <RadioGroup>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.method}>TF-IDF & Unigram</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Radio
                              value="unigram"
                              checked={svmFeatureExtraction === 'unigram'}
                              onChange={onChangeSvmRadio}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Bigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="bigram"
                                checked={svmFeatureExtraction === 'bigram'}
                                onChange={onChangeSvmRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Trigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="trigram"
                                checked={svmFeatureExtraction === 'trigram'}
                                onChange={onChangeSvmRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button
                      onClick={() => onTrain()}
                      className={classes.deteksiBtn}
                    >
                      {
                        svmLoading
                          ? <CircularProgress size={24} className={classes.progressIcon} /> : 'Latih Model'
                      }
                    </Button>
                    <Box mt={2} mb={2}>
                      <Divider />
                    </Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.hasilTitle}>Hasil </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Typography className={classes.hasilTitle}>Akurasi (waktu) </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <ModelResult result={result.svm} />
                  </Box>
                </Box>
              </CSSTransition>
            </Grid>

            <Grid item xs={4}>
              <CSSTransition
                in={transition2}
                timeout={1500}
                unmountOnExit
                classNames="animate__animated animate__bounce animate__slower"
              >
                <Box className={classes.card}>
                  <center>
                    <Typography className={classes.title}>Random Forest</Typography>
                  </center>
                  <Box mt={3}>
                    <RadioGroup>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.method}>TF-IDF & Unigram</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Radio
                              value="unigram"
                              checked={rfFeatureExtraction === 'unigram'}
                              onChange={onChangeRfRadio}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Bigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="bigram"
                                checked={rfFeatureExtraction === 'bigram'}
                                onChange={onChangeRfRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Trigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="trigram"
                                checked={rfFeatureExtraction === 'trigram'}
                                onChange={onChangeRfRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button className={classes.deteksiBtn}>Latih Model</Button>
                    <Box mt={2} mb={2}>
                      <Divider />
                    </Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.hasilTitle}>Hasil </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Typography className={classes.hasilTitle}>Akurasi (waktu) </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <ModelResult result={result.rf} />
                  </Box>
                </Box>
              </CSSTransition>
            </Grid>

            <Grid item xs={4}>
              <CSSTransition
                in={transition3}
                timeout={1500}
                unmountOnExit
                classNames="animate__animated animate__bounce animate__slower"
              >
                <Box className={classes.card}>
                  <center>
                    <Typography className={classes.title}>Voting Classifier</Typography>
                  </center>
                  <Box mt={3}>
                    <RadioGroup>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.method}>TF-IDF & Unigram</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Radio
                              value="unigram"
                              checked={vcFeatureExtraction === 'unigram'}
                              onChange={onChangeVcRadio}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Bigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="bigram"
                                checked={vcFeatureExtraction === 'bigram'}
                                onChange={onChangeVcRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container alignItems="center">
                          <Grid item xs={6}>
                            <Typography className={classes.method}>TF-IDF & Trigram</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Box style={{ textAlign: 'right' }}>
                              <Radio
                                value="trigram"
                                checked={vcFeatureExtraction === 'trigram'}
                                onChange={onChangeVcRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button className={classes.deteksiBtn}>Latih Model</Button>
                    <Box mt={2} mb={2}>
                      <Divider />
                    </Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <Typography className={classes.hasilTitle}>Hasil </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Box style={{ textAlign: 'right' }}>
                            <Typography className={classes.hasilTitle}>Akurasi (waktu) </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <ModelResult result={result.vc} />
                  </Box>
                </Box>
              </CSSTransition>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

// map local variable to reducer
const mapStoreToProps = (state) => ({
  modelResult: state.model,
});

// map dispatch to reducer
const mapDispatchToProps = (dispatch) => ({
  getModelResult: (data, callback) => dispatch(getModelResult(data, callback)),
});
export default connect(mapStoreToProps, mapDispatchToProps)(Deteksi);
