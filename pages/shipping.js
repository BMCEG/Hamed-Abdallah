import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
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
import { HamedAbdallahCheckoutWizard } from '../components/index.js';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address1', shippingAddress.address1);
    setValue('address2', shippingAddress.address2);
    setValue('landmark', shippingAddress.landmark);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('phone', shippingAddress.phone);
  }, []);

  const submitHandler = ({
    fullName,
    address1,
    address2,
    landmark,
    city,
    postalCode,
    phone,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address1,
        address2,
        landmark,
        city,
        postalCode,
        phone,
      },
    });
    router.push('/payment');
  };

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <HamedAbdallahCheckoutWizard activeStep={1} />
      <HamedAbdallahWhiteSpace />

      <form onSubmit={handleSubmit(submitHandler)} className={Styles.form}>
        <Typography variant="h4" component="h1">
          Shipping
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name has to be more than 1 character'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="address1"
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
                  id="address1"
                  label="Address Line 1"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address1)}
                  helperText={
                    errors.address1
                      ? errors.address1.type === 'minLength'
                        ? 'Address has to be more than 1 character'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address2"
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
                  id="address2"
                  label="Address Line 2"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address2)}
                  helperText={
                    errors.address2
                      ? errors.address2.type === 'minLength'
                        ? 'Address has to be more than 1 character'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="landmark"
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
                  multiline
                  rows={3}
                  id="landmark"
                  label="Nearby Landmark"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.landmark)}
                  helperText={
                    errors.landmark
                      ? errors.landmark.type === 'minLength'
                        ? 'Address has to be more than 1 character'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  label="City"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City has to be more than 1 character'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="postalCode"
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
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code has to be more than 1 character'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="phone"
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
                  id="phone"
                  label="Mobile Number"
                  inputProps={{ type: 'number' }}
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === 'minLength'
                        ? 'Mobile Number has to be more than 1 character'
                        : 'Mobile Number is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" className={Styles.btn}>
              Continue to Payment
            </Button>
          </ListItem>
        </List>
      </form>
      <HamedAbdallahWhiteSpace />
    </div>
  );
}
