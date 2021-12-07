import { Grid, StepButton, Typography } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

import { HamedAbdallahWhiteSpace } from '../components/index.js';

import Styles from '../styles/pages/about.module.css';

export default function About() {
  return (
    <div className={Styles.root}>
      {/* <div className={Styles.banner}>Hello World</div> */}

      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Image
              alt="Hamed Abdallah Optics"
              src="/about-us-penguin.png"
              width={650}
              height={740}
            />
          </Grid>
          <Grid item md={6} xs={12} className={Styles.about}>
            <div
              className={Styles.text__header__base}
              style={{
                backgroundImage: `url('/black-circle.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Typography
                style={{
                  width: '95%',
                  margin: 'auto',
                }}
                className={Styles.text__header}
              >
                ABOUT US
              </Typography>
            </div>
            <br></br>
            <p className={Styles.text__p}>
              <span className={Styles.text__p__bold}>HAMED ABDALLAH</span> was
              founded in 1911 to introduce to you many special worldwide eyewear
              brands such as: Mont Blanc, Ray Ban, Fossil, Police, Versace,
              Gucci, Persol, Prada, vogue, Bvlgari, Tommy Hilfiger and many
              other brands.
              <br></br>
              In addition to exclusive brands only at Hamed Abdallah: Stiffany,
              Mackwezard and villar.
              <br></br>
              At Hamed Abdallah we are committed to our customers, we ensure to
              help them choosing the best pair of glasses that suits their face,
              we also help them choosing the right frames and lens that fit with
              them.
              <br></br>
              We aim to inspire our customers with exceptional eyewear designs.
              <br></br>
              We have life time free maintenance on all our products and a
              warranty against manufacturing defects and the possibility of
              replacement within 15 days.
            </p>
          </Grid>
        </Grid>
        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}
