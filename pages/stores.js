import React from 'react';

import Styles from '../styles/pages/stores.module.css';

import { HamedAbdallahWhiteSpace } from '../components/index.js';
import { Typography, Grid } from '@material-ui/core';

export default function ourStores() {
  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />

      <Grid container spacing={3} className={Styles.storesGrid}>
        <Grid item md={6} xs={12}>
          {' '}
          <Grid container spacing={1}>
            <Grid className={Styles.storeInfo} item md={6}>
              <Typography variant="h4" component="h4">
                NEW CAIRO
              </Typography>
              <Typography variant="h5" component="h5">
                Cairo Festival City
              </Typography>
              <Typography variant="h6" component="h6">
                01013007175
              </Typography>
            </Grid>
            <Grid item md={6}>
              <div>
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          {' '}
          <Grid container spacing={1}>
            <Grid className={Styles.storeInfo} item md={6}>
              <Typography variant="h4" component="h4">
                NEW CAIRO
              </Typography>
              <Typography variant="h5" component="h5">
                Point 90
              </Typography>
              <Typography variant="h6" component="h6">
                01013007175
              </Typography>
            </Grid>
            <Grid item md={6}>
              <div>
                <iframe
                  width="100%"
                  height="400"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <HamedAbdallahWhiteSpace />
    </div>
  );
}
