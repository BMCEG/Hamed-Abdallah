import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store.js';
import {
  HamedAbdallahCheckoutWizard,
  HamedAbdallahWhiteSpace,
} from '../components/index.js';
import { useSnackbar } from 'notistack';
import Styles from '../styles/pages/payment.module.css';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address1) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);

  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Payment Method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      router.push('/placeorder');
    }
  };

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <HamedAbdallahCheckoutWizard activeStep={2} />
      <HamedAbdallahWhiteSpace />
      <form className={Styles.form} onSubmit={submitHandler}>
        <Typography variant="h3" component="h3">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Debit/Credit Card"
                  value="Debit/Credit Card"
                  control={<Radio disabled />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash on Delivery"
                  value="Cash on Delivery"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <div className={Styles.btnRow}>
            <ListItem>
              <Button
                className={Styles.btn}
                type="submit"
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
            </ListItem>{' '}
            <ListItem>
              <Button
                type="button"
                variant="contained"
                className={Styles.btnBack}
                onClick={() => router.push('/shipping')}
              >
                Back
              </Button>
            </ListItem>
          </div>
        </List>
      </form>
      <HamedAbdallahWhiteSpace />
    </div>
  );
}
