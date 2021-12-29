import React, { useContext, useEffect, useState } from 'react';
import {
  HamedAbdallahWhiteSpace,
  HamedAbdallahCheckoutWizard,
} from '../components/index.js';
import Styles from '../styles/pages/cart.module.css';
import { Store } from '../utils/Store';
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
import { getError } from '../utils/error.js';
import Cookies from 'js-cookie';

function PlaceOrder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const netPrice = round2(
    cartItems.reduce(
      (a, c) => a + (c.price - c.discountedPrice) * c.quantity,
      0
    )
  );
  const discountedPrice = round2(
    cartItems.reduce((a, c) => a + c.discountedPrice * c.quantity, 0)
  );
  const vat = round2(itemsPrice * 0.14);
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const totalPrice = round2(netPrice + shippingPrice + vat);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          discountValue: discountedPrice,
          shippingPrice,
          vat,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <HamedAbdallahCheckoutWizard activeStep={3} />
      <HamedAbdallahWhiteSpace />
      <Typography variant="h3" component="h1">
        Place Order
      </Typography>
      <div className={Styles.grid__container}>
        <Grid container>
          <Grid item md={9} xs={12}>
            <Card className={Styles.section}>
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Order Items
                  </Typography>
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
                        {cartItems.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>
                              <Button
                                variant="text"
                                href={`/product/${item.slug}`}
                              >
                                <Image
                                  className={Styles.product_image}
                                  src={`${item.featuredImage}`}
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
                            {item.discountedPrice === 0 ? (
                              <TableCell align="right">{item.price}</TableCell>
                            ) : (
                              <TableCell align="right">
                                <div className={Styles.lineThrough}>
                                  {item.price}
                                </div>{' '}
                                {item.price - item.discountedPrice} EGP
                              </TableCell>
                            )}
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
                  {shippingAddress.fullName},<br></br>
                  {shippingAddress.phone}
                  <br></br>
                  {shippingAddress.address1}, {shippingAddress.address2},
                  <br></br>
                  {shippingAddress.landmark}, <br></br>
                  {shippingAddress.city}, <br></br>
                  {shippingAddress.postalCode}
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
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={Styles.section}>
              <List>
                <ListItem>
                  <Typography variant="h5">Order Summary</Typography>
                </ListItem>
                <hr></hr>
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
                      <Typography>Discoutned:</Typography>
                    </Grid>{' '}
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong style={{ color: '#ca222a' }}>
                          -{discountedPrice} EGP
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>{' '}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>{' '}
                    <Grid item xs={6}>
                      <Typography align="right">{shippingPrice} EGP</Typography>
                    </Grid>
                  </Grid>
                </ListItem>{' '}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>VAT:</Typography>
                    </Grid>{' '}
                    <Grid item xs={6}>
                      <Typography align="right">{vat} EGP</Typography>
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
                <ListItem>
                  <Button
                    onClick={placeOrderHandler}
                    variant="contained"
                    color="primary"
                    className={Styles.btn}
                  >
                    {loading ? (
                      <ListItem>
                        <CircularProgress />{' '}
                      </ListItem>
                    ) : (
                      `Place Order`
                    )}
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
      <HamedAbdallahWhiteSpace />
    </div>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
