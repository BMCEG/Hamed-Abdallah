import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '../utils/error';
import { HamedAbdallahWhiteSpace } from '../components/index';
import NextLink from 'next/link';
import Image from 'next/image';
import Styles from '../styles/pages/order-history.module.css';
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Table,
  Link,
  TableBody,
  Grid,
  Card,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faRemoveFormat,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, wishlist: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      document.cookie = `cartItems=${JSON.stringify(cartItems)}`;
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      state;
  }
}

function Wishlist() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const router = useRouter();

  const [{ loading, error, wishlist }, dispatch] = useReducer(reducer, {
    loading: true,
    wishlist: [],
    error: '',
    cart: cart,
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchWishlist = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/wishlist/list`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchWishlist();
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      enqueueSnackbar('Out of Stock', { variant: 'error' });
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeWishlistItem = async (product) => {
    let x = await axios.post(`/api/users/wishlist/remove`, {
      product,
      userInfo,
    });
    enqueueSnackbar(`${product.name} has been removed from wishlist`, {
      variant: 'success',
    });

    window.location.reload();
  };

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
                  <ListItem button component="a">
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
                  <ListItem button component="a" selected>
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
                    Wishlist
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
                            <TableCell>IMAGE</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>BRAND</TableCell>
                            <TableCell>PRICE</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {wishlist.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <Image
                                      alt={item.name}
                                      src={`/uploads/products/${item.images[0]}`}
                                      width={152.5}
                                      height={87.5}
                                      className={Styles.productImg}
                                      // style={{ backgroundSize }}
                                    />
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.brand.name}</TableCell>
                              <TableCell>{item.price}</TableCell>
                              <TableCell>
                                <Button
                                  className={Styles.btnBack}
                                  onClick={() => addToCartHandler(item)}
                                >
                                  <FontAwesomeIcon
                                    icon={faShoppingBag}
                                    size="lg"
                                  />
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  className={Styles.btn}
                                  onClick={() => removeWishlistItem(item)}
                                >
                                  X
                                </Button>
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

export default dynamic(() => Promise.resolve(Wishlist), { ssr: false });
