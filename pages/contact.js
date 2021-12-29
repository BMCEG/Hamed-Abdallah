import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Store } from '../utils/Store';

import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const { redirect } = router.query;
  const { state } = useContext(Store);

  const submitHandler = async ({
    firstName,
    lastName,
    email,
    mobile,
    message,
  }) => {
    closeSnackbar();

    try {
      const { data } = await axios.post('/api/contacts/', {
        firstName,
        lastName,
        email,
        mobile,
        message,
      });

      enqueueSnackbar(
        'Thanks for contacting us. Someone will be in touch with you soon.',
        { variant: 'success' }
      );
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
          priority={true}
          height={800}
        />
        <Image
          src="/wave-red-top.png"
          alt="placeholder"
          priority={true}
          width={1980}
          height={250}
        />
      </div>
      <br></br>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <form onSubmit={handleSubmit(submitHandler)} className={Styles.form}>
          <Typography style={{ color: '#ca222a' }} variant="h4" component="h1">
            CONTACT US
          </Typography>
          <br></br>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                  // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.firstName)}
                    helperText={
                      errors.firstName
                        ? errors.firstName.type === 'minLength'
                          ? 'Name has to be more than 1 character'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              {' '}
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                  // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.lastName)}
                    helperText={
                      errors.lastName
                        ? errors.lastName.type === 'minLength'
                          ? 'Name has to be more than 1 character'
                          : 'Name is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
          </Grid>{' '}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="E-Mail"
                    inputProps={{ type: 'text' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="mobile"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 10,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="mobile"
                    label="Mobile Number"
                    inputProps={{ type: 'number' }}
                    error={Boolean(errors.mobile)}
                    helperText={
                      errors.mobile
                        ? errors.mobile.type === 'pattern'
                          ? 'Mobile Number is not valid'
                          : 'Mobile Number is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </Grid>
          </Grid>
          <br></br>
          <Controller
            name="message"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 10,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="message"
                label="Message"
                multiline
                rows={5}
                inputProps={{ type: 'number' }}
                error={Boolean(errors.message)}
                helperText={
                  errors.message
                    ? errors.message.type === 'pattern'
                      ? 'Message is not valid'
                      : 'Message is required'
                    : ''
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
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
        <Grid container spacing={4}>
          <Grid item md={5} sm={12}>
            {' '}
            <div className={Styles.locationImgBase} id="branches">
              <Image
                alt="Hamed Abdallah Stores"
                src="/locations.png"
                width={1000}
                priority={true}
                height={1000}
                className={Styles.locationImg}
              />
            </div>
          </Grid>
          <Grid item md={7} sm={12}>
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
          </Grid>
        </Grid>

        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}
