import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  HamedAbdallahWhiteSpace,
  HamedAbdallahCheckoutWizard,
} from '../../components/index.js';
import Styles from '../../styles/pages/cart.module.css';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error.js';
import Cookies from 'js-cookie';
import { useMediaQuery } from '@mui/material';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Order({ params }) {
  const orderId = params.id;

  const matches = useMediaQuery(`(min-width: 1024px)`);

  const router = useRouter();
  const { state } = useContext(Store);

  const { userInfo } = state;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    shortID,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
  console.log('HELLO', orderItems);
  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order]);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const orderReturnHandler = async () => {
    const returnOrder = await axios.post(
      `/api/returns`,
      {
        userInfo,
        orderId,
        returnType: 'order',
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    console.log(returnOrder);
  };

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <HamedAbdallahCheckoutWizard activeStep={4} />
      <HamedAbdallahWhiteSpace />
      {matches ? (
        <Typography variant="h3" component="h1">
          Order #{shortID} Details
        </Typography>
      ) : (
        <Typography variant="h5" component="h5">
          Order #{shortID} Details
        </Typography>
      )}
      <div className={Styles.grid__container}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography>{error}</Typography>
        ) : (
          <Grid container>
            <Grid item md={9} xs={12}>
              <Card className={Styles.section}>
                <List>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item md={8} xs={12}>
                        <Typography component="h5" variant="h5">
                          Order Items
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{ textAlign: 'right' }}
                        md={4}
                        xs={12}
                        onClick={orderReturnHandler}
                      >
                        {isDelivered ? (
                          <Button variant="contained" color="secondary">
                            <Typography>Return Order</Typography>
                          </Button>
                        ) : null}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell>
                                <Button
                                  variant="text"
                                  href={`/product/${item.slug}`}
                                >
                                  <Image
                                    src={item.featuredImage}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="text"
                                  href={`/product/${item.slug}`}
                                >
                                  <Typography>{item.name}</Typography>
                                </Button>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item.quantity}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>L.E. {item.price}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>
              </Card>
              <Card className={Styles.section}>
                <List>
                  <ListItem>
                    <Typography component="h5" variant="h5">
                      Shipping Address
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {shippingAddress.fullName}, {shippingAddress.address},{' '}
                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                    {shippingAddress.phone}{' '}
                  </ListItem>{' '}
                  <ListItem>
                    Status:{' '}
                    {isDelivered
                      ? `Delivered at ${deliveredAt}`
                      : 'Not Delivered'}{' '}
                  </ListItem>
                </List>
              </Card>
              <Card className={Styles.section}>
                <List>
                  <ListItem>
                    <Typography component="h5" variant="h5">
                      Payment Method
                    </Typography>
                  </ListItem>
                  <ListItem>{paymentMethod}</ListItem>
                  <ListItem>
                    Status: {isPaid ? `Paid at ${paidAt}` : 'Not Paid'}{' '}
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card className={Styles.section}>
                <List>
                  <ListItem>
                    <Typography variant="h5">Order Summary</Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Items:</Typography>
                      </Grid>{' '}
                      <Grid item xs={6}>
                        <Typography align="right">{itemsPrice} EGP</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>{' '}
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Shipping:</Typography>
                      </Grid>{' '}
                      <Grid item xs={6}>
                        <Typography align="right">
                          {shippingPrice} EGP
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Total:</Typography>
                      </Grid>{' '}
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>{totalPrice} EGP</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
      <HamedAbdallahWhiteSpace />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
