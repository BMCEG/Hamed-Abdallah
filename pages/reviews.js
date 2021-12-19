import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getError } from '../utils/error';
import { HamedAbdallahWhiteSpace } from '../components/index';
import NextLink from 'next/link';
import Image from 'next/image';
import Moment from 'react-moment';

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
  Link,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { RatingView } from 'react-simple-star-rating';
function reducer(state, action) {
  console.log('action.payload', action.payload);
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, reviews: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Reviews() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state } = useContext(Store);
  const { userInfo, cart } = state;
  const router = useRouter();

  const [{ loading, error, reviews }, dispatch] = useReducer(reducer, {
    loading: true,
    reviews: [],
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchReviews = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/reviews/list`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className={Styles.container}>
      <HamedAbdallahWhiteSpace />
      <div className={Styles.grid__container}>
        <Grid container>
          <Grid item md={3} xs={12}>
            <Card className={Styles.section}>
              <List>
                <NextLink href="/order-history" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NextLink>{' '}
                <NextLink href="/returns" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Returns"></ListItemText>
                  </ListItem>
                </NextLink>{' '}
                <NextLink href="/reviews" passHref>
                  <ListItem button component="a" selected>
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
                    Reviews
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

                            <TableCell>PRODUCT</TableCell>
                            <TableCell>REVIEW</TableCell>
                            <TableCell>RATING</TableCell>
                            <TableCell align="right">DATE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {reviews.map((review) => (
                            <TableRow key={review._id}>
                              <TableCell>
                                <NextLink
                                  href={`/product/${review.product.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <Image
                                      alt={review.product.name}
                                      src={`/uploads/products/${review.product.images[0]}`}
                                      width={152.5}
                                      height={87.5}
                                      className={Styles.productImg}
                                      // style={{ backgroundSize }}
                                    />
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell>{review.product.name}</TableCell>
                              <TableCell>{review.review}</TableCell>
                              <TableCell>
                                <RatingView ratingValue={review.rating} />
                              </TableCell>
                              <TableCell align="right">
                                <Moment format="dddd DD MMM YYYY">
                                  {review.createdAt}
                                </Moment>
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

export default dynamic(() => Promise.resolve(Reviews), { ssr: false });
