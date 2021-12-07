import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Typography,
  List,
  Link,
  ListItem,
  TextField,
  Button,
} from '@material-ui/core';
import { HamedAbdallahWhiteSpace } from '../components/index.js';
import Styles from '../styles/pages/register.module.css';
import NextLink from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export default function Register() {
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
    name,
    email,
    password,
    mobile,
    passwordConfirm,
  }) => {
    closeSnackbar();

    if (password !== passwordConfirm) {
      alert('Please make sure both passwords match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        mobile,
        password,
      });

      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />

      <form onSubmit={handleSubmit(submitHandler)} className={Styles.form}>
        <Typography variant="h4" component="h1">
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
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
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name has to be more than 1 character'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
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
                  inputProps={{ type: 'email' }}
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
          </ListItem>
          <ListItem>
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
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Password length is more than 5'
                        : 'Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="passwordConfirm"
                  label="Confirm Password"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.passwordConfirm
                      ? errors.passwordConfirm.type === 'minLength'
                        ? 'Confrim Password length should be more than 5 characters'
                        : 'Confrim Password is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" className={Styles.btn}>
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?! &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link style={{ color: '#ca222a' }}>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
      <HamedAbdallahWhiteSpace />
    </div>
  );
}
