import Head from 'next/head';
import Image from 'next/image';
import { Typography } from '@material-ui/core';
import {
  HamedAbdallahButton,
  HamedAbdallahCarousel,
  HamedAbdallahCollage,
  HamedAbdallahWhiteSpace,
} from '../components/index.js';

import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hamed Abdallah Optics</title>
        <meta name="keywords" content="optics ecommerce" />
        <meta
          name="description"
          content="Hamed Abdallah Optics | Buy from out trusted brands on hamedabdallah.com"
        />
        {/* <link rel="icon" href="/Hamed-logo-White.png" /> */}
      </Head>
      {/* <HamedAbdallahWhiteSpace /> */}
      <HamedAbdallahCarousel />
      <HamedAbdallahWhiteSpace />
      <HamedAbdallahCollage />
      <HamedAbdallahWhiteSpace />
      <div className={styles.about}>
        <div
          className={styles.text__header__base}
          style={{
            backgroundImage: `url('/circle.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Typography
            style={{
              width: '95%',
              margin: 'auto',
            }}
            className={styles.text__header}
          >
            ABOUT US
          </Typography>
        </div>
        <br></br>
        <p className={styles.text__p}>
          <span className={styles.text__p__bold}>HAMED ABDALLAH</span> was
          founded in 1911 to introduce to you many special worldwide eyewear
          brands such as: Mont Blanc, Ray Ban, Fossil, Police, Versace, Gucci,
          Persol, Prada, vogue, Bvlgari, Tommy Hilfiger and many other brands.
          <br></br>
          {/* In addition to exclusive brands only at Hamed Abdallah: Stiffany,
          Mackwezard and villar At Hamed Abdallah we are committed to our
          customers, we ensure to help them choosing the best pair of glasses
          that suits their face, we also help them choosing the right frames and
          lens that fit with them We aim to inspire our customers with
          exceptional eyewear designs We have life time free maintenance on all
          our products and a warranty against manufacturing defects and the
          possibility of replacement within 15 days. */}
        </p>
      </div>
      <HamedAbdallahWhiteSpace />
      <Image src="/wave-red-bottom.png" alt="ds" width="1980" height="250" />
      <div className={styles.ourStores}>
        <Image
          src="/Our-Stores.png"
          className={styles.ourStores__img}
          alt="Hamed Abdallah Stores"
          width={850}
          height={850}
        />
        <br></br>
        <HamedAbdallahButton text="Branches" href="/contact#branches" />
        <HamedAbdallahWhiteSpace />
        <div className={styles.ourBrands}>
          <div className={styles.ourBrands__header}>
            <div className={styles.hr__base}>
              <hr className={styles.hor}></hr>
            </div>
            <Typography
              className={styles.text__header}
              style={{ color: 'white' }}
            >
              Our Brands
            </Typography>
            <div className={styles.hr__base}>
              <hr className={styles.hor}></hr>
            </div>
          </div>
          <HamedAbdallahWhiteSpace />
          <Image
            src="/Brands.png"
            className={styles.brands__image}
            alt="Hamed Abdallah Brands"
            width={1000}
            height={500}
          />
        </div>
        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}
