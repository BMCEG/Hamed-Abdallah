import React, { useState } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
import Image from 'next/image';
import { HamedAbdallahWhiteSpace } from '../components/index.js';
import {
  Typography,
  Link,
  List,
  ListItem,
  TextField,
  Button,
  Grid,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from '@material-ui/core';

import Styles from '../styles/pages/contact.module.css';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      alert('Login Success');
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <div className={Styles.root}>
      <div className={Styles.banner}>
        <Image
          src="/contact-hero.png"
          alt="placeholder"
          width={1980}
          height={800}
        />
        <Image
          src="/wave-red-top.png"
          alt="placeholder"
          width={1980}
          height={250}
        />
      </div>
      <br></br>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <form onSubmit={submitHandler} className={Styles.form}>
          <Typography style={{ color: '#ca222a' }} variant="h4" component="h1">
            CONTACT US
          </Typography>
          <br></br>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {' '}
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                inputProps={{ type: 'text' }}
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              {' '}
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                inputProps={{ type: 'email' }}
              ></TextField>
            </Grid>
          </Grid>{' '}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{ type: 'email' }}
              ></TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              {' '}
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                inputProps={{ type: 'number' }}
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            label="Message"
            rows={5}
            multiline
            inputProps={{ type: 'text' }}
          ></TextField>
          <List>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                // fullWidth
                // color="primary"
                className={Styles.btn}
              >
                Send Message
              </Button>
            </ListItem>
          </List>
        </form>
        <HamedAbdallahWhiteSpace />
        <div className={Styles.locationImgBase} id="branches">
          <Image
            alt="Hamed Abdallah Stores"
            src="/locations.png"
            width={1000}
            height={1000}
            className={Styles.locationImg}
          />
        </div>
        <HamedAbdallahWhiteSpace />
        <div className={Styles.branches}>
          <Accordion className={Styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={Styles.accordionSummary}
            >
              <Typography
                variant="h4"
                component="h4"
                className={Styles.accordionTitle}
                style={{ color: 'white' }}
              >
                Cairo
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={Styles.accordionDetails}>
              <Grid container spacing={1}>
                <Grid className={Styles.storeInfo} item md={4} xs={12}>
                  <Typography variant="h4" component="h4">
                    NEW CAIRO
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Cairo Festival City
                  </Typography>
                  <Typography variant="h6" component="h6">
                    011-2629-4516
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                  <div>
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br></br>{' '}
          <Accordion className={Styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={Styles.accordionSummary}
            >
              <Typography
                variant="h4"
                component="h4"
                className={Styles.accordionTitle}
                style={{ color: 'white' }}
              >
                Cairo
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={Styles.accordionDetails}>
              <Grid container spacing={1}>
                <Grid className={Styles.storeInfo} item md={4} xs={12}>
                  <Typography variant="h4" component="h4">
                    NEW CAIRO
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Cairo Festival City
                  </Typography>
                  <Typography variant="h6" component="h6">
                    011-2629-4516
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                  <div>
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br></br>{' '}
          <Accordion className={Styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={Styles.accordionSummary}
            >
              <Typography
                variant="h4"
                component="h4"
                className={Styles.accordionTitle}
                style={{ color: 'white' }}
              >
                Cairo
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={Styles.accordionDetails}>
              <Grid container spacing={1}>
                <Grid className={Styles.storeInfo} item md={4} xs={12}>
                  <Typography variant="h4" component="h4">
                    NEW CAIRO
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Cairo Festival City
                  </Typography>
                  <Typography variant="h6" component="h6">
                    011-2629-4516
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                  <div>
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br></br>{' '}
          <Accordion className={Styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={Styles.accordionSummary}
            >
              <Typography
                variant="h4"
                component="h4"
                className={Styles.accordionTitle}
                style={{ color: 'white' }}
              >
                Cairo
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={Styles.accordionDetails}>
              <Grid container spacing={1}>
                <Grid className={Styles.storeInfo} item md={4} xs={12}>
                  <Typography variant="h4" component="h4">
                    NEW CAIRO
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Cairo Festival City
                  </Typography>
                  <Typography variant="h6" component="h6">
                    011-2629-4516
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                  <div>
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br></br>{' '}
          <Accordion className={Styles.accordion}>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={Styles.accordionSummary}
            >
              <Typography
                variant="h4"
                component="h4"
                className={Styles.accordionTitle}
                style={{ color: 'white' }}
              >
                Cairo
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={Styles.accordionDetails}>
              <Grid container spacing={1}>
                <Grid className={Styles.storeInfo} item md={4} xs={12}>
                  <Typography variant="h4" component="h4">
                    NEW CAIRO
                  </Typography>
                  <Typography variant="h5" component="h5">
                    Cairo Festival City
                  </Typography>
                  <Typography variant="h6" component="h6">
                    011-2629-4516
                  </Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                  <div>
                    <iframe
                      width="100%"
                      height="300"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=cairo%20festival%20city+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <br></br>
        </div>
        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}
