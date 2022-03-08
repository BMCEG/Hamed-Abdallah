import React, { useContext, useEffect, useState } from 'react';
import { HamedAbdallahWhiteSpace } from '../components/index.js';
import Styles from '../styles/pages/cart.module.css';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
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

function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const [validOffer, setValidOffer] = useState({});

  useEffect(async () => {
    await axios
      .get(`/api/offers/valid`)
      .then((res) => {
        if (res.status === 200) {
          setValidOffer(res.data.validOffer[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Out of Stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItemHandler = async (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  return (
    <div className={Styles.root}>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <Typography variant="h3" component="h1">
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <div className={Styles.emptyCartContainer}>
            <div className={Styles.emptyCart}>
              <Image
                alt="Hamed Abdallah Cart"
                src={`/Empty-Cart.png`}
                width={350}
                priority={true}
                height={350}
              />
              <Typography
                variant="h5"
                component="h5"
                className={Styles.emptyCartImg}
              >
                Cart is empty
              </Typography>
              <br></br>
              <br></br>
              <Button variant="contained" className={Styles.btn} href="/shop">
                Go Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className={Styles.grid__container}>
            <Grid container>
              <Grid item md={9} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
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
                            <Select
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartHandler(item, e.target.value)
                              }
                            >
                              {[...Array(item.stock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          {!validOffer ? (
                            <TableCell align="right">{item.price}</TableCell>
                          ) : (
                            <TableCell
                              align="right"
                              style={{ fontWeight: '500' }}
                            >
                              <div className={Styles.lineThrough}>
                                {item.price}
                              </div>{' '}
                              {item.price -
                                item.price * (validOffer.value / 100)}{' '}
                              EGP
                            </TableCell>
                          )}
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              className={Styles.btn}
                              onClick={() => removeItemHandler(item)}
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br></br>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card className={Styles.cart__actions}>
                  <List>
                    <ListItem>
                      <Typography variant="h5">
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                        {validOffer ? (
                          <>
                            {' '}
                            <hr></hr>
                            <Typography variant="body1" component="body1">
                              <span style={{ display: 'flex' }}>
                                Original Price:
                                <div className={Styles.lineThrough}>
                                  <strong>
                                    {cartItems.reduce(
                                      (a, c) => a + c.quantity * c.price,
                                      0
                                    )}{' '}
                                    EGP
                                  </strong>
                                </div>
                              </span>
                            </Typography>
                            <Typography variant="body1" component="body1">
                              <span
                                style={{ display: 'flex', color: '#ca222a' }}
                              >
                                Discounted Price:{' '}
                                <strong>
                                  {cartItems.reduce(
                                    (a, c) =>
                                      a +
                                      c.quantity * c.price -
                                      c.price * (validOffer.value / 100),
                                    0
                                  )}{' '}
                                  EGP
                                </strong>
                              </span>
                            </Typography>
                          </>
                        ) : null}{' '}
                        <hr></hr>
                        <Typography variant="h6" component="h6">
                          <span style={{ display: 'flex' }}>
                            Net Price:
                            {validOffer ? (
                              <strong>
                                {cartItems.reduce(
                                  (a, c) =>
                                    a +
                                    c.quantity * c.price -
                                    c.price * (validOffer.value / 100),
                                  0
                                )}{' '}
                                EGP
                              </strong>
                            ) : (
                              <strong>
                                {cartItems.reduce(
                                  (a, c) => a + c.quantity * c.price,
                                  0
                                )}{' '}
                                EGP
                              </strong>
                            )}
                          </span>
                        </Typography>
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        // color="primary"
                        // fullWidth
                        className={Styles.btn}
                        onClick={checkoutHandler}
                      >
                        Checkout
                      </Button>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
