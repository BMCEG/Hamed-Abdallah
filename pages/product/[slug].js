import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import { ReactPhotoCollage } from 'react-photo-collage';
import Carousel from 'react-elastic-carousel';
import { Rating, RatingView } from 'react-simple-star-rating';
import { useMediaQuery } from '@mui/material';

import {
  Button,
  Card,
  Grid,
  List,
  TextField,
  ListItem,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import { HamedAbdallahWhiteSpace } from '../../components/index.js';
import Styles from '../../styles/pages/product.module.css';
import { useSnackbar } from 'notistack';
import Review from '../../models/Reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faHeart } from '@fortawesome/free-solid-svg-icons';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        objectFit: 'contain', // or 'rgba(0, 0, 0, 1)'
        // '&$active': {
        //   color: '#e5e6e7',
        // },
        // '&$completed': {
        //   color: '#ca222a',
        // },
      },
    },
  },
});

export default function ProductScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  const { slug } = router.query;
  const { product, reviews, relatedItems, recentItems } = props;
  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  const ratingHandler = (rate) => {
    setRating(rate);
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/reviews/',
        {
          userInfo,
          product,
          review,
          rating,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      enqueueSnackbar('Review added successfully', { variant: 'success' });
      window.location.reload();
    } catch (err) {
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stock < quantity) {
      window.alert('Out of Stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const addToWishlistHandler = async (product) => {
    try {
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

  const brands = [
    { name: 'rayban', image: '/placeholder1.png' },
    { name: 'stiffany', image: '/placeholder1.png' },
    { name: 'vogue', image: '/placeholder2.jpg' },
    { name: 'fossil', image: '/placeholder1.png' },
    { name: 'vilar', image: '/placeholder1.png' },
    { name: 'gucci', image: '/placeholder2.jpg' },
    { name: 'guess', image: '/placeholder1.png' },
  ];

  const productImages = [];
  product.images.map((img) => {
    productImages.push({ source: `/uploads/products/${img}` });
  });

  return (
    <div className={Styles.root}>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            {matches ? (
              <MuiThemeProvider theme={muiTheme}>
                <ReactPhotoCollage
                  {...{
                    width: '100%',
                    height: ['550px', '200px'],
                    layout: [1, 3],
                    photos: productImages,
                    showNumOfRemainingPhotos: true,
                  }}
                  className={Styles.collage}
                />
              </MuiThemeProvider>
            ) : (
              <MuiThemeProvider theme={muiTheme}>
                <ReactPhotoCollage
                  {...{
                    width: '100%',
                    height: ['250px', '200px'],
                    layout: [1, 4],
                    photos: productImages,
                    showNumOfRemainingPhotos: true,
                  }}
                  className={Styles.collage}
                />
              </MuiThemeProvider>
            )}
          </Grid>
          <Grid item md={1} />
          <Grid item md={5} xs={12} className={Styles.productInfo}>
            <List>
              <ListItem>
                <Typography variant="h3" component="h3">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <RatingView ratingValue={product.avgRating} />
                <Typography variant="body2" component="body2">
                  Number of Reviews
                  <br></br>({product.numOfRatings})
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="h5" component="h5">
                  Brand: {product.brandName}
                </Typography>
              </ListItem>
              <br></br>
              <ListItem>
                <Typography>{product.description}</Typography>
              </ListItem>
              <br></br>
              <br></br>
              <ListItem>
                <Typography variant="h3" component="h3">
                  {product.price} EGP
                </Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item md={10}>
                    {product.stock > 0 ? (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => addToCartHandler(product)}
                        className={Styles.button}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        className={Styles.button}
                        variant="contained"
                        color="primary"
                        disabled
                        fullWidth
                      >
                        Out of Stock
                      </Button>
                    )}
                  </Grid>
                  <Grid item md={1}>
                    <Button
                      fullWidth
                      // variant="contained"
                      // color="secondary"
                      onClick={() => addToWishlistHandler(product)}
                    >
                      <FontAwesomeIcon
                        style={{ color: '#ca222a' }}
                        icon={faHeart}
                        size="2x"
                      />
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <HamedAbdallahWhiteSpace />
      </div>
      <div className={Styles.reviews}>
        <Typography variant="h4" component="h4">
          User Reviews
        </Typography>
        <br></br>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div className={Styles.review}>
              <Typography variant="h5" component="h5">
                {review.review}
              </Typography>
              <hr></hr>
              <RatingView
                // onClick={ratingHandler}
                ratingValue={review.rating} /* Rating Props */
              />

              <Typography variant="span" component="h6">
                Review by: {review.user.name}
                <br></br>
                {review.createdAt}
              </Typography>
            </div>
          ))}
        <hr></hr>
        <form>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                onChange={(e) => setReview(e.target.value)}
                id="review"
                label="Review"
                rows={5}
                multiline
                inputProps={{ type: 'text' }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Rating
                onClick={ratingHandler}
                ratingValue={rating} /* Rating Props */
              />
            </ListItem>
            <ListItem>
              {/* Add your own review */}
              {/* <br></br> */}
              <Button
                variant="contained"
                className={Styles.button}
                onClick={submitReviewHandler}
              >
                Add Review
              </Button>
            </ListItem>
          </List>
        </form>
        <HamedAbdallahWhiteSpace />
      </div>
      <div className={Styles.relatedItems}>
        <HamedAbdallahWhiteSpace />

        <Typography
          variant="h4"
          component="h4"
          style={{ textAlign: 'center', color: 'white' }}
        >
          {product.brandName}
        </Typography>
        <br></br>
        <br></br>
        <Carousel
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 500, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 },
          ]}
          enableMouseSwipe={true}
          enableAutoPlay={true}
          disableArrowsOnEnd={true}
          className={Styles.relatedCarousel}
          pagination={false}
          transitionMs={2000}
        >
          {relatedItems.map((prod) => (
            <Button href={`/product/${prod.slug}`} key={prod._id}>
              <Image
                key={prod._id}
                alt="Hamed Abdallah Brand"
                src={`/uploads/products/${prod.images[0]}`}
                width={300}
                height={300}
                className={Styles.thumbnail}
              />
            </Button>
          ))}
        </Carousel>
        <HamedAbdallahWhiteSpace />
        <Typography
          variant="h4"
          component="h4"
          style={{ textAlign: 'center', color: 'white' }}
        >
          Recently Added
        </Typography>
        <br></br>
        <br></br>
        <Carousel
          breakPoints={[
            { width: 1, itemsToShow: 1 },
            { width: 500, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 },
          ]}
          enableMouseSwipe={true}
          enableAutoPlay={true}
          disableArrowsOnEnd={true}
          className={Styles.relatedCarousel}
          pagination={false}
          transitionMs={2000}
        >
          {recentItems.map((prod) => (
            <Button href={`/product/${prod.slug}`} key={prod._id}>
              <Image
                key={prod._id}
                alt="Hamed Abdallah Brand"
                src={`/uploads/products/${prod.images[0]}`}
                width={300}
                height={300}
                className={Styles.thumbnail}
              />
            </Button>
          ))}
        </Carousel>
        <HamedAbdallahWhiteSpace />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const rawProduct = await Product.findOne({ slug }).lean();
  const product = JSON.parse(JSON.stringify(rawProduct));
  const productsByBrand = await Product.find({ brand: rawProduct.brand._id });
  const rawFilteredProductsByBrand = productsByBrand.filter((prod) => {
    return prod._id.toString() !== rawProduct._id.toString();
  });

  const allFilteredProductsByBrand = JSON.parse(
    JSON.stringify(rawFilteredProductsByBrand)
  );
  const recentItems = await Product.find({}).sort({ createdAt: -1 });
  const allRecentItems = JSON.parse(JSON.stringify(recentItems));
  const reviews = await Review.find({ product: product._id })
    .lean()
    .populate('user');
  const allReviews = JSON.parse(JSON.stringify(reviews));

  await db.disconnect();

  return {
    props: {
      product,
      reviews: allReviews,
      relatedItems: allFilteredProductsByBrand,
      recentItems: allRecentItems,
    },
  };
}
