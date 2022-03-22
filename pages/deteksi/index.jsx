import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Radio, RadioGroup, Divider, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import { CSSTransition } from 'react-transition-group';
import ModelResult from '@components/ModelResult';
import 'animate.css';
import NavbarBack from '@components/Navbar/NavbarBack';
import { connect } from 'react-redux';
import { getModelResult, postModelResult } from '@src/redux/actions/model';

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
  const { modelResult, getModelResult, postModelResult } = props;
  const [transition1, setTransition1] = useState(false);
  const [transition2, setTransition2] = useState(false);
  const [transition3, setTransition3] = useState(false);
  const [svmLoading, setSvmLoading] = useState(false);
  const [rfLoading, setRfLoading] = useState(false);
  const [vcLoading, setVcLoading] = useState(false);
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
    // getModelResult();
  }, []);

  const onTrainSvm = () => {
    setSvmLoading(true);
    postModelResult({
      algoritma: 'vc',
      'ekstraksi-fitur': svmFeatureExtraction,
    }, (res) => {
      setSvmLoading(false);
      const { data } = res;
      const newResult = {
        ...result,
        svm: {
          ...result.svm,
          [`${svmFeatureExtraction}_acc`]: data.svm[`${svmFeatureExtraction}_acc`],
          [`${svmFeatureExtraction}_time`]: data.svm[`${svmFeatureExtraction}_time`],
        },
      };
      setResult(newResult);
    });
  };

  const onTrainRf = () => {
    setRfLoading(true);
    postModelResult({
      algoritma: 'rf',
      'ekstraksi-fitur': rfFeatureExtraction,
    }, (res) => {
      setRfLoading(false);
      const { data } = res;
      const newResult = {
        ...result,
        rf: {
          ...result.rf,
          [`${rfFeatureExtraction}_acc`]: data.rf[`${rfFeatureExtraction}_acc`],
          [`${rfFeatureExtraction}_time`]: data.rf[`${rfFeatureExtraction}_time`],
        },
      };
      setResult(newResult);
    });
  };

  const onTrainVc = () => {
    setVcLoading(true);
    postModelResult({
      algoritma: 'vc',
      'ekstraksi-fitur': vcFeatureExtraction,
    }, (res) => {
      setVcLoading(false);
      const { data } = res;
      const newResult = {
        ...result,
        vc: {
          ...result.vc,
          [`${vcFeatureExtraction}_acc`]: data.vc[`${vcFeatureExtraction}_acc`],
          [`${vcFeatureExtraction}_time`]: data.vc[`${vcFeatureExtraction}_time`],
        },
      };
      setResult(newResult);
    });
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
                              value="tfidf_unigram"
                              checked={svmFeatureExtraction === 'tfidf_unigram'}
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
                                value="tfidf_bigram"
                                checked={svmFeatureExtraction === 'tfidf_bigram'}
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
                                value="tfidf_trigram"
                                checked={svmFeatureExtraction === 'tfidf_trigram'}
                                onChange={onChangeSvmRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button
                      onClick={() => onTrainSvm()}
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
                              value="tfidf_unigram"
                              checked={rfFeatureExtraction === 'tfidf_unigram'}
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
                                value="tfidf_bigram"
                                checked={rfFeatureExtraction === 'tfidf_bigram'}
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
                                value="tfidf_trigram"
                                checked={rfFeatureExtraction === 'tfidf_trigram'}
                                onChange={onChangeRfRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button onClick={() => onTrainRf()} className={classes.deteksiBtn}>
                      {
                        rfLoading
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
                              value="tfidf_unigram"
                              checked={vcFeatureExtraction === 'tfidf_unigram'}
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
                                value="tfidf_bigram"
                                checked={vcFeatureExtraction === 'tfidf_bigram'}
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
                                value="tfidf_trigram"
                                checked={vcFeatureExtraction === 'tfidf_trigram'}
                                onChange={onChangeVcRadio}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </RadioGroup>
                    <Button onClick={() => onTrainVc()} className={classes.deteksiBtn}>
                      {
                        vcLoading
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
  getModelResult: (callback) => dispatch(getModelResult(callback)),
  postModelResult: (payload, callback) => dispatch(postModelResult(payload, callback)),
});
export default connect(mapStoreToProps, mapDispatchToProps)(Deteksi);
