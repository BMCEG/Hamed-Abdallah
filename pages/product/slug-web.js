import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../utils/Store';
import Carousel from 'react-elastic-carousel';
import { Rating, RatingView } from 'react-simple-star-rating';
import Moment from 'react-moment';
import {
  Button,
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
  faCertificate,
  faHeart as faHeartOutlined,
  faWrench,
  faHandshake,
  faGlasses,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function ProductScreen(props) {
  const { product, reviews, relatedItems, recentItems, isWishlistedProp } =
    props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedProp);
  const [featuredImage, setFeaturedImage] = useState(
    `${product.featuredImage}`
  );

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  // const reviewInput = ;

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
    productImages.push({ source: img });
  });

  return (
    <div className={Styles.root}>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Grid container spacing={2} className={Styles.product_images_base}>
              <Grid item md={2} className={Styles.product_images}>
                <Image
                  alt="image"
                  src={product.featuredImage}
                  height={500}
                  loading="eager"
                  priority={true}
                  placeholder="blur"
                  onClick={() =>
                    pickFeaturedImageHandler(`${product.featuredImage}`)
                  }
                  width={500}
                  className={Styles.product_image}
                />
                {productImages.map((image) => (
                  <Image
                    priority={true}
                    alt="image"
                    src={`${image.source}`}
                    height={500}
                    loading="eager"
                    placeholder="blur"
                    width={500}
                    onClick={() => pickFeaturedImageHandler(`${image.source}`)}
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
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography
              variant="h3"
              component="h3"
              style={{
                color: 'black',
                textDecoration: 'none !important',
                textTransform: 'capitalize',
              }}
            >
              {`${product.brandName} ${product.type} ${``} - ${``} ${
                product.sku
              }`}
            </Typography>
            <br></br>
            <Grid container spacing={1}>
              <Grid item md={7} xs={12} className={Styles.productInfo}>
                <List>
                  <ListItem className={Styles.infoBalls}>
                    <Typography
                      className={Styles.infoBall}
                      variant="h5"
                      component="h5"
                    >
                      Brand: {product.brandName}
                    </Typography>
                    <Typography
                      variant="h5"
                      className={Styles.infoBall}
                      component="h5"
                    >
                      Color: {product.color}
                    </Typography>
                  </ListItem>
                  {/* <br></br> */}
                  <ListItem className={Styles.infoBalls}>
                    <Typography
                      variant="h5"
                      component="h5"
                      className={Styles.infoBall}
                    >
                      Material: {product.material}
                    </Typography>{' '}
                    <Typography
                      variant="h5"
                      component="h5"
                      className={Styles.infoBall}
                    >
                      Shape: {product.shape}
                    </Typography>
                  </ListItem>
                  <br></br>
                  <ListItem>
                    <Typography className={Styles.description}>
                      {product.description}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {product.avgRating === 0 ? (
                      <RatingView ratingValue={3} />
                    ) : (
                      <RatingView ratingValue={product.avgRating} />
                    )}
                    <br></br>
                    <Typography variant="body2" component="body2">
                      Number of Reviews ({product.numOfRatings})
                    </Typography>
                  </ListItem>
                  <hr></hr>
                </List>
              </Grid>
              <Grid item md={5} xs={12}>
                <div className={Styles.burnedInfo}>
                  <ListItem className={Styles.inlineList}>
                    <FontAwesomeIcon size="2x" icon={faCertificate} />
                    <Typography className={Styles.authHeader}>
                      100% Authentic
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <FontAwesomeIcon size="2x" icon={faWrench} />
                    <Typography className={Styles.authHeader}>
                      One Year Warranty
                    </Typography>
                  </ListItem>{' '}
                  <ListItem className={Styles.inlineList}>
                    <FontAwesomeIcon size="2x" icon={faGlasses} />
                    <Typography className={Styles.authHeader}>
                      The specialized technical team will contact you to
                      complete the lens test procedure
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <FontAwesomeIcon size="2x" icon={faHandshake} />
                    <Typography className={Styles.authHeader}>
                      Trusted Since 1911
                    </Typography>
                  </ListItem>
                </div>
                {/* <br></br> */}
                <br></br>
              </Grid>
            </Grid>
            <List className={Styles.priceInfo}>
              <ListItem>
                {product.discountedPrice === 0 ? (
                  <Typography variant="h3" component="h3">
                    <strong>{product.price} EGP</strong>
                  </Typography>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <Typography variant="h4" component="h4">
                      <div className={Styles.lineThrough}>{product.price}</div>
                    </Typography>
                    <Typography variant="h4" component="h4">
                      <strong>
                        {product.price - product.discountedPrice} EGP
                      </strong>
                    </Typography>
                  </div>
                )}
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
            </List>{' '}
          </Grid>
        </Grid>
        {/* <HamedAbdallahWhiteSpace /> */}
      </div>

      {/* <Image src="/wave-red-bottom.png" alt="ds" width="1980" height="250" /> */}

      <div className={Styles.relatedItems}>
        {/* <HamedAbdallahWhiteSpace /> */}
        <div className={Styles.ourBrands__header}>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
          <Typography
            variant="h4"
            component="h4"
            style={{ textAlign: 'center', color: '#ca222a' }}
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
            { width: 1200, itemsToShow: 5 },
          ]} // enableMouseSwipe={true}
          // enableAutoPlay={true}
          // disableArrowsOnEnd={true}
          className={Styles.relatedCarousel}
          pagination={true}
          transitionMs={1000}
        >
          {relatedItems.map((prod) => (
            <>
              {' '}
              <Button
                href={`/product/${prod.slug}`}
                key={prod._id}
                className={Styles.thumbBtn}
              >
                {/* <Image
                  key={prod._id}
                  alt="Hamed Abdallah Brand"
                  priority={true}
                  src={prod.featuredImage}
                  width={200}
                  height={200}
                  className={Styles.thumbnail}
                />
                <br></br> */}
                {/* <Typography
                  component="h3"
                  variant="h3"
                  className={Styles.carouselIndexTitle}
                >
                  ROFL
                </Typography> */}
              </Button>
            </>
          ))}
        </Carousel>
        <div className={Styles.ourBrands__header}>
          <div className={Styles.hr__base}>
            <hr className={Styles.hor}></hr>
          </div>
          <Typography
            variant="h4"
            component="h4"
            style={{ textAlign: 'center', color: '#ca222a' }}
          >
            You May Also Like
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
            { width: 1200, itemsToShow: 5 },
          ]}
          className={Styles.relatedCarousel}
          transitionMs={1000}
          pagination={false}
        >
          {recentItems.map((prod) => (
            <>
              <Button
                href={`/product/${prod.slug}`}
                key={prod._id}
                className={Styles.thumbBtn}
              >
                <Image
                  key={prod._id}
                  alt="Hamed Abdallah Brand"
                  src={prod.featuredImage}
                  width={200}
                  priority={true}
                  height={200}
                  className={Styles.thumbnail}
                />
              </Button>
              {/* <br></br>
              <Typography
                component="h3"
                variant="h3"
                className={Styles.carouselIndexTitle}
              >
                Lmao
              </Typography> */}
            </>
          ))}
        </Carousel>
        <HamedAbdallahWhiteSpace />
      </div>
      <div className={Styles.reviews_base}>
        <div className={Styles.reviews}>
          <HamedAbdallahWhiteSpace />
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
                  // variant="filled"
                  fullWidth
                  onChange={(e) => setReview(e.target.value)}
                  label="Review"
                  rows={5}
                  className={Styles.reviewInput}
                  style={{ backgroundColor: 'blue !important' }}
                  multiline
                  inputProps={{
                    maxLength: 500,
                    type: 'text',
                    color: 'white',
                    className: Styles.reviewInput,
                  }}
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
                  className={Styles.reviewBtn}
                  onClick={submitReviewHandler}
                >
                  Add Review
                </Button>
              </ListItem>
            </List>
          </form>
          <HamedAbdallahWhiteSpace />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log(context);
}
