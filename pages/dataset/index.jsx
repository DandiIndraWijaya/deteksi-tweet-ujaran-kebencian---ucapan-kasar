import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import NavbarBack from '@components/Navbar/NavbarBack';
import CSVReader from 'react-csv-reader';
import DatasetDisplayer from '@components/DatasetDisplayer';
// import CsvViewer from 'react-csv-viewer';

const useStyles = makeStyles((theme) => ({

}));

const Dataset = () => {
  const classes = useStyles();
  const [dataset, setDataset] = useState([]);

  const handleForce = (data, fileInfo) => {
    console.log(data);
    setDataset(data);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  };
  return (
    <Layout>
      <Container>
        <NavbarBack currentPage="Deteksi" />
        <center>
          <CSVReader
            cssClass="react-csv-input"
            label="Select CSV with secret Death Star statistics"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
          />
        </center>
      </Container>
      <Box mt={3}>
        <DatasetDisplayer dataset={dataset} />
      </Box>
    </Layout>
  );
};

export default Dataset;
