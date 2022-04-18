/* eslint-disable no-mixed-operators */
/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Layout from '@components/Layout';
import NavbarBack from '@components/Navbar/NavbarBack';
import CSVReader from 'react-csv-reader';
import DisplayData from '@components/DatasetDisplayer/DislplayData';

const useStyles = makeStyles((theme) => ({
  fileInfo: {
    fontWeight: 'bold',
  },
}));

const Dataset = () => {
  const classes = useStyles();
  const [dataset, setDataset] = useState([]);
  const [modifiedDataset, setModifiedDataset] = useState([]);
  const [datasetInfo, setDatasetInfo] = useState(null);

  const handleForce = (data, fileInfo) => {
    if (Array.isArray(data) && 'tweet' in data[0] && 'hs' in data[0] && 'abusive' in data[0]) {
      for (let i = 0; i < data.length; i += 1) {
        data[i].no = i + 1;
      }
      setDataset(data);
      setDatasetInfo(fileInfo);

      // modified dataset
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].abusive === 1 && data[i].hs === 0) {
          data[i].label = 1;
          data[i].keterangan = 'Ucapan Kasar';
        } else if (data[i].abusive === 0 && data[i].hs === 1 || data[i].abusive === 1 && data[i].hs === 1) {
          data[i].label = 2;
          data[i].keterangan = 'Ujaran Kebencian';
        } else {
          data[i].label = 0;
          data[i].keterangan = 'Netral';
        }
      }
      setModifiedDataset(data);
    } else {
      setDataset([]);
      setDatasetInfo(undefined);
    }
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
            label="Pilih dataset Tweet Ujaran Kebencian"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
          />
        </center>
        <Box mt={5} mb={5}>
          {
                datasetInfo === undefined
                && <Typography className={classes.fileInfo}>File bukan berisi dataset</Typography>
              }
          {
           datasetInfo !== undefined && datasetInfo !== null
           && (
           <Grid container spacing={4}>
             <Grid item md={6}>
               <Box>
                 <Typography className={classes.fileInfo}>Nama file:   {datasetInfo.name}</Typography>
                 <Typography className={classes.fileInfo}>Jumlah data: {dataset.length}</Typography>
               </Box>
               <DisplayData dataset={dataset} />
             </Grid>
             <Grid item md={6}>
               <Box>
                 <Typography className={classes.fileInfo}>Dataset dengan label yang diperbarui</Typography>
                 <Typography className={classes.fileInfo}>
                   <span style={{ color: '#1DA1F2' }}>Netral = 0</span>,
                   <span style={{ color: 'orange' }}> Ucapan Kasar = 1</span>,
                   <span style={{ color: 'red' }}> Ujaran Kebencian = 2</span>
                 </Typography>
               </Box>
               <DisplayData type="modified" dataset={modifiedDataset} />
             </Grid>
           </Grid>
           )
         }
        </Box>
      </Container>
    </Layout>
  );
};

export default Dataset;
