import React, { useContext } from 'react';
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
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <Typography variant="h3" component="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div className={Styles.emptyCartContainer}>
          <div className={Styles.emptyCart}>
            <Typography variant="h5" component="h5">
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
                          <Button variant="text" href={`/product/${item.slug}`}>
                            <Image
                              src="/placeholder1.png"
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="text" href={`/product/${item.slug}`}>
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
                        <TableCell align="right">L.E. {item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
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
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : L.E{' '}
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
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
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
