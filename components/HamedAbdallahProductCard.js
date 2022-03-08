import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Link,
  Typography,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import axios from 'axios';

import Styles from '../styles/components/card.module.css';
import NextLink from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

const HamedAbdallahProductCard = (props) => {
  const matches = useMediaQuery(`(min-width: 1024px)`);
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

  const product = props.product;
  const brand = props.brand;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      enqueueSnackbar(`${data.name} is currently out of stock`, {
        variant: 'error',
      });
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    enqueueSnackbar(`${data.name} has been added to cart`, {
      variant: 'success',
    });
  };

  const addToWishlistHandler = async (product) => {
    try {
      if (!userInfo) {
        enqueueSnackbar(
          'You must be logged in to add an item to your wishlist',
          { variant: 'error' }
        );
        return;
      }
      const { data } = await axios.get(`/api/products/${product._id}`);
      await axios.post('/api/users/wishlist', {
        userInfo,
        data,
      });
      enqueueSnackbar(`${data.name} has been added to your wishlist`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  return (
    <Card className={Styles.productCard}>
      <NextLink href={`/product/${product.slug}`} passHref>
        <Link style={{ textDecoration: 'none' }}>
          <CardActionArea>
            <CardMedia>
              <div className={Styles.card}>
                <Image
                  className={Styles.cardImage}
                  width={400}
                  height={250}
                  priority={true}
                  loading="eager"
                  src={`${product.featuredImage}`}
                  alt="Z"
                />
              </div>
            </CardMedia>
            <CardContent>
              {matches ? (
                <>
                  {' '}
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{
                      color: 'black',
                      textDecoration: 'none !important',
                      textTransform: 'capitalize !important',
                    }}
                  >
                    {`${product.brandName} ${product.type}`}{' '}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{
                      color: 'black',
                      textDecoration: 'none !important',
                      textTransform: 'uppercase !important',
                    }}
                  >
                    {product.sku}
                  </Typography>
                </>
              ) : (
                <>
                  {' '}
                  <Typography
                    variant="h6"
                    component="h5"
                    style={{
                      color: 'black',
                      textDecoration: 'none !important',
                      textTransform: 'capitalize !important',
                    }}
                  >
                    {`${product.brandName} ${product.type}`}{' '}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h6"
                    style={{
                      color: 'black',
                      textDecoration: 'none !important',
                      textTransform: 'uppercase !important',
                    }}
                  >
                    {product.sku}
                  </Typography>
                </>
              )}
              <br></br>
              <Grid container className={Styles.prodDeets}>
                <Grid item md={4} className={Styles.prodBrand}>
                  <Image
                    alt={brand.name}
                    src={brand.logo}
                    width={80}
                    height={40}
                    priority={true}
                    className={Styles.brandImage}
                  />
                </Grid>
                <Grid item md={8} className={Styles.prodPrice}>
                  {validOffer ? (
                    <Typography
                      variant="h6"
                      style={{
                        display: 'flex',
                        justifyContent: 'right',
                      }}
                    >
                      <div className={Styles.lineThrough}>{product.price}</div>

                      <strong>
                        {'\u00A0'}
                        {'\u00A0'}
                        {product.price -
                          product.price * (validOffer.value / 100)}{' '}
                        EGP
                      </strong>
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      style={{
                        display: 'flex',
                        color: 'black',
                        justifyContent: 'right',
                      }}
                    >
                      {product.price} EGP
                    </Typography>
                  )}
                  {/* )} */}
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Link>
      </NextLink>
      {/* <br></br> */}
      <CardActions className={Styles.cardAction}>
        <Button size="small" onClick={() => addToCartHandler(product)}>
          <FontAwesomeIcon
            style={{ color: '#ca222a' }}
            icon={faShoppingBag}
            size="2x"
          />
        </Button>
        <Button size="small" onClick={() => addToWishlistHandler(product)}>
          <FontAwesomeIcon
            style={{ color: '#ca222a' }}
            icon={faHeart}
            size="2x"
          />
        </Button>
      </CardActions>
      <br></br>
    </Card>
  );
};

export default HamedAbdallahProductCard;
