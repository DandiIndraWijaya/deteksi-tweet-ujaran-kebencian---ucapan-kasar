/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Layout from '@components/Layout';
import NavbarBack from '@components/Navbar/NavbarBack';
import { Container, Box, TextField, Select, MenuItem, InputLabel, FormControl, Button, Divider, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { postTestModel } from '@src/redux/actions/model';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '70%',
    margin: 'auto',
    padding: '0 20px 0 20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textField: {
    width: '100%',
  },
  btnDeteksi: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    color: '#ffff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
  progressIcon: {
    color: '#ffff',
    fontSize: 3,
  },
  btnLatihModel: {
    backgroundColor: 'red',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    color: '#ffff',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'red',
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
}));

const TestModel = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { postTestModel } = props;
  const [algoritma, setAlgoritma] = useState('rf');
  const [ekstraksiFitur, setEkstraksiFitur] = useState('tfidf_unigram');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeAlgoritma = (event) => {
    setResult(null);
    setError(null);
    setAlgoritma(event.target.value);
  };

  const onChangeEkstraksiFitur = (event) => {
    setResult(null);
    setError(null);
    setEkstraksiFitur(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    const payload = {
      tweet: e.target.elements.tweet.value,
      algoritma: e.target.elements.algoritma.value,
      'ekstraksi-fitur': e.target.elements.ekstraksiFitur.value,
    };
    setIsLoading(true);
    postTestModel(payload, (res) => {
      setIsLoading(false);
      console.log(res);
      if (res?.response?.status !== undefined) {
        if (res?.response?.status === 500 && res?.response?.status !== undefined) {
          setError('Model Dengan Algoritma dan Ekstraksi Fitur yang dipilih belum ada. Anda perlu melatih terlebih dahulu!');
          return;
        }
      }

      const { data } = res;
      setResult(data);
    });
  };

  return (
    <Layout>
      <Container>
        <NavbarBack currentPage="Test Model" />
        <Box mb={6} />
        <Box className={classes.formContainer}>
          <form onSubmit={onSubmit}>
            <TextField
              onChange={() => setResult(null)}
              name="tweet"
              className={classes.textField}
              placeholder="Input Tweet"
              required
            />
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="algoritma">Algoritma</InputLabel>
                <Select
                  name="algoritma"
                  labelId="algoritma"
                  label="Algoritma"
                  id="demo-simple-select"
                  value={algoritma}
                  onChange={onChangeAlgoritma}
                >
                  <MenuItem value="rf">Random Forest</MenuItem>
                  <MenuItem value="svm">Support Vector Machine</MenuItem>
                  <MenuItem value="vc">Voting Classifier</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="ekstraksi_fitur">Ektraksi Fitur</InputLabel>
                <Select
                  name="ekstraksiFitur"
                  labelId="ekstraksi_fitur"
                  label="Ekstraksi Fitur"
                  id="demo-simple-select"
                  value={ekstraksiFitur}
                  onChange={onChangeEkstraksiFitur}
                >
                  <MenuItem value="tfidf_unigram">TF-IDF & Unigram</MenuItem>
                  <MenuItem value="tfidf_bigram">TF-IDF & Bigram</MenuItem>
                  <MenuItem value="tfidf_trigram">TF-IDF & Trigram</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={3}>
              <Button type="submit" className={classes.btnDeteksi}>
                {
                  isLoading
                    ? <CircularProgress size={24} className={classes.progressIcon} /> : 'Deteksi'
                }
              </Button>
            </Box>
          </form>
          <Box mt={3}>
            <Divider />
          </Box>
          {
           result !== null
           && (
           <Box mt={3}>
             <Typography style={{ fontSize: 16, fontWeight: 'bold' }}>Hasil: </Typography>
             <Typography
               variant="h6"
               style={{ color: result.jenis_tweet === 'Tweet Netral' ? '#1DA1F2'
                 : result.jenis_tweet === 'Tweet Ujaran Kebencian' ? 'red' : 'orange',
               }}
             >
               {result.jenis_tweet}
             </Typography>
           </Box>
           )
         }
          {
           error !== null
           && (
           <Box mt={3}>
             <Typography
               variant="h6"
               style={{ color: 'red' }}
             >
               {error}
             </Typography>
             <Button className={classes.btnLatihModel} onClick={() => router.back()}>Latih Model</Button>
           </Box>
           )
         }
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
  postTestModel: (payload, callback) => dispatch(postTestModel(payload, callback)),
});
export default connect(mapStoreToProps, mapDispatchToProps)(TestModel);
