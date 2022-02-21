import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '../utils/error';
import { HamedAbdallahWhiteSpace } from '../components/index';
import NextLink from 'next/link';
import Styles from '../styles/pages/order-history.module.css';
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  Grid,
  Card,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Moment from 'react-moment';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <div className={Styles.grid__container}>
        <Grid container>
          <Grid item md={3} xs={12}>
            <Card className={Styles.section}>
              <List>
                {/* <NextLink href="/profile" passHref> */}
                {/* <ListItem button component="a">
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItem> */}
                {/* </NextLink>{' '} */}
                <NextLink href="/order-history" passHref>
                  <ListItem button component="a" selected>
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/returns" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Returns"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/reviews" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Reviews"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/wishlist" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Wishlist"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={Styles.section}>
              <List>
                <ListItem>
                  <Typography variant="h3" component="h1">
                    Orders History
                  </Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography>{error}</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order._id}>
                              <TableCell>{order.shortID}</TableCell>
                              <TableCell>
                                <Moment format="dddd, DD/MM/yyyy">
                                  {order.createdAt}
                                </Moment>
                              </TableCell>
                              <TableCell>{order.totalPrice}</TableCell>
                              <TableCell>{order.status}</TableCell>
                              <TableCell>
                                <NextLink href={`/order/${order._id}`} passHref>
                                  <Button
                                    className={Styles.btn}
                                    variant="contained"
                                  >
                                    Details
                                  </Button>
                                </NextLink>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
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

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
