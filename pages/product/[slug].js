import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import User from '../../models/User';
import { ReactPhotoCollage } from 'react-photo-collage';
import Carousel from 'react-elastic-carousel';
import { Rating, RatingView } from 'react-simple-star-rating';
import { useMediaQuery } from '@mui/material';
import Moment from 'react-moment';
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
import {
  HamedAbdallahWhiteSpace,
  HamedAbdallahImageMagnifier,
} from '../../components/index.js';
import Styles from '../../styles/pages/product.module.css';
import { useSnackbar } from 'notistack';
import Review from '../../models/Reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faHeart as faHeartOutlined,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');
  const { product, reviews, relatedItems, recentItems, isWishlistedProp } =
    props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedProp);
  const [featuredImage, setFeaturedImage] = useState(
    `/uploads/${product.featuredImage}`
  );

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  const { slug } = router.query;
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
      setIsWishlisted(true);
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
  const removeFromWishlistHandler = async (product) => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}`);
      await axios.post('/api/users/wishlist/remove', {
        product,
        userInfo,
      });
      setIsWishlisted(false);
      enqueueSnackbar(`${data.name} has been removed to your wishlist`, {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };

  const pickFeaturedImageHandler = async (image) => {
    setFeaturedImage(image);
  };

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
              <Grid
                container
                spacing={2}
                className={Styles.product_images_base}
              >
                <Grid item md={2} className={Styles.product_images}>
                  <Image
                    alt="image"
                    src={`/uploads/${product.featuredImage}`}
                    height={500}
                    onClick={() =>
                      pickFeaturedImageHandler(
                        `/uploads/${product.featuredImage}`
                      )
                    }
                    width={500}
                    className={Styles.product_image}
                  />
                  {productImages.map((image) => (
                    <Image
                      alt="image"
                      src={`${image.source}`}
                      height={500}
                      width={500}
                      onClick={() =>
                        pickFeaturedImageHandler(`${image.source}`)
                      }
                      className={Styles.product_image}
                    />
                  ))}
                </Grid>
                <Grid item md={10} className={Styles.product_images}>
                  <HamedAbdallahImageMagnifier
                    src={featuredImage}
                    width={'100%'}
                  />
                </Grid>
              </Grid>
            ) : (
              <HamedAbdallahImageMagnifier
                src={`/uploads/products/${product.images[0]}`}
                width={'100%'}
              />
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
                  <strong>{product.price} EGP</strong>
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
                    {isWishlisted ? (
                      <Button
                        fullWidth
                        onClick={() => removeFromWishlistHandler(product)}
                      >
                        <FontAwesomeIcon
                          style={{ color: '#ca222a' }}
                          icon={faHeartOutlined}
                          size="3x"
                        />
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        onClick={() => addToWishlistHandler(product)}
                      >
                        <FontAwesomeIcon
                          style={{ color: '#ca222a' }}
                          icon={faHeart}
                          size="3x"
                        />
                      </Button>
                    )}
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
              <Typography variant="body1" component="body1">
                {review.review}
              </Typography>
              <hr className={Styles.hrReview}></hr>
              <RatingView
                // onClick={ratingHandler}
                ratingValue={review.rating} /* Rating Props */
              />

              <Typography variant="span" component="h6">
                Review by: {review.user.name}
                <br></br>
                <Moment format="dddd DD/MM/YYYY hh:ss">
                  {review.createdAt}
                </Moment>
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
                inputProps={{ maxLength: 500, type: 'text' }}
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
      <Image src="/wave-red-bottom.png" alt="ds" width="1980" height="250" />

      <div className={Styles.relatedItems}>
        <HamedAbdallahWhiteSpace />
        <div className={Styles.ourBrands__header}>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
          <Typography
            variant="h4"
            component="h4"
            style={{ textAlign: 'center', color: 'white' }}
          >
            More Products from {product.brandName}
          </Typography>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
        </div>
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
            <Button
              href={`/product/${prod.slug}`}
              key={prod._id}
              className={Styles.thumbBtn}
            >
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
        <HamedAbdallahWhiteSpace />
        <div className={Styles.ourBrands__header}>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
          <Typography
            variant="h4"
            component="h4"
            style={{ textAlign: 'center', color: 'white' }}
          >
            Recently Added Products
          </Typography>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
        </div>
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
            <Button
              href={`/product/${prod.slug}`}
              key={prod._id}
              className={Styles.thumbBtn}
            >
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
  const reviews = await Review.find({ product: product._id }).lean();
  // .populate('user');
  const allReviews = JSON.parse(JSON.stringify(reviews));
  const cookies = JSON.parse(context.req.cookies['userInfo']);

  const rawUser = await User.findById({ _id: cookies._id }).lean();
  const user = JSON.parse(JSON.stringify(rawUser));

  const isWishlistedProp = user.wishlist.includes(product._id);

  await db.disconnect();

  return {
    props: {
      product,
      isWishlistedProp,
      reviews: allReviews,
      relatedItems: allFilteredProductsByBrand,
      recentItems: allRecentItems,
    },
  };
}
