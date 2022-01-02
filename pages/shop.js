import Styles from '../styles/pages/shop.module.css';
import { HamedAbdallahWhiteSpace } from '../components/index.js';
import {
  CardActionArea,
  CardMedia,
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Input,
  Link,
} from '@material-ui/core';
import Image from 'next/image';
import data from '../utils/data';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import Brand from '../models/Brand';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import Carousel from 'react-elastic-carousel';
import noUiSlider from 'nouislider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faHeart,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

const shop = (props) => {
  const matches = useMediaQuery(`(min-width: 1024px)`);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { products, queryFilterProp, brands, maxPrice, minPrice } = props;
  const [queryFilter, setQueryFilter] = useState({
    type: queryFilterProp.type || [],
    gender: queryFilterProp.gender || [],
    material: queryFilterProp.material || [],
    shape: queryFilterProp.shape || [],
    brand: queryFilterProp.brand || [],
    color: queryFilterProp.color || [],
  });
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [lowPrice, setLowPrice] = useState(minPrice);
  const [highPrice, setHighPrice] = useState(maxPrice);

  const [filterAnchor, setFilterAnchor] = useState(false);
  const router = useRouter();

  const colors = [
    'beige',
    'black',
    'blue',
    'brown',
    'gold',
    'grey',
    'light-blue',
    'pink',
    'purple',
    'red',
    'silver',
    'white',
    'yellow',
    'other',
  ];

  const shapes = [
    'cat-eye',
    'oval',
    'rectangle',
    'round',
    'sport',
    'mask',
    'square',
    'other',
  ];

  const materials = ['plastic', 'metal', 'plastic/metal'];

  const genders = ['unisex', 'male', 'female', 'kids'];

  const addToCartHandler = async (product) => {
    console.log(state.cart.cartItems);
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

  const updateFilterQueryHandler = async (
    queryName,
    queryValue,
    queryChecked
  ) => {
    if (queryChecked) {
      setQueryFilter({
        ...queryFilter,
        [queryName]: [...queryFilter[queryName], queryValue],
      });
    } else {
      let updated;

      if (Array.isArray(queryFilter[queryName])) {
        updated = queryFilter[queryName].filter((element) => {
          return element !== queryValue;
        });
      } else {
        updated = '';
      }

      setQueryFilter({ ...queryFilter, [queryName]: updated });
    }
  };

  const handleFilterQuery = (e) => {
    e.preventDefault();

    let queryParams = `?`;

    if (queryFilter.brand && queryFilter.brand.length > 0) {
      queryFilter.brand.map((param) => {
        queryParams = queryParams.concat(`brand=${param}&`);
      });
    }
    if (queryFilter.type && queryFilter.type.length > 0) {
      queryFilter.type.map((param) => {
        queryParams = queryParams.concat(`type=${param}&`);
      });
    }

    if (queryFilter.gender && queryFilter.gender.length > 0) {
      queryFilter.gender.map((param) => {
        queryParams = queryParams.concat(`gender=${param}&`);
      });
    }

    if (queryFilter.material && queryFilter.material.length > 0) {
      queryFilter.material.map((param) => {
        queryParams = queryParams.concat(`material=${param}&`);
      });
    }

    if (queryFilter.shape && queryFilter.shape.length > 0) {
      queryFilter.shape.map((param) => {
        queryParams = queryParams.concat(`shape=${param}&`);
      });
    }
    if (queryFilter.color && queryFilter.color.length > 0) {
      queryFilter.color.map((param) => {
        queryParams = queryParams.concat(`color=${param}&`);
      });
    }

    if (price[0] !== minPrice || price[1] !== maxPrice) {
      queryParams = queryParams.concat(`price=${price}&`);
    }
    queryParams = queryParams.substring(0, queryParams.length - 1);
    queryParams = queryParams.concat(`#eyewear`);
    router.push(`/shop${queryParams}`);
  };

  const checkboxCheckHandler = (queryName, queryValue) => {
    let returnVal = Boolean;

    if (Array.isArray(queryFilter[queryName])) {
      returnVal = queryFilter[queryName].includes(queryValue);
    } else {
      returnVal = queryFilter[queryName] === queryValue ? true : false;
    }
    return returnVal;
  };

  const handleChange = (e, newValue) => {
    setLowPrice(newValue[0]);
    setHighPrice(newValue[1]);
    setPrice(newValue);
  };
  const handleLowPriceChange = (e) => {
    setLowPrice(e.target.value);
    setPrice([lowPrice, highPrice]);
  };
  const handleHighPriceChange = (e) => {
    setHighPrice(e.target.value);
    setPrice([lowPrice, highPrice]);
  };

  return (
    <>
      <div className={Styles.banner}>
        <Image
          src="/shop-hero.png"
          alt="placeholder"
          width={1980}
          priority={true}
          height={350}
          objectFit="cover"
        />
        <Image
          src="/wave-red-top.png"
          alt="placeholder"
          width={1980}
          priority={true}
          height={100}
        />
      </div>
      <div className={Styles.container}>
        {/* <HamedAbdallahWhiteSpace /> */}
        {matches ? (
          <>
            <div className={Styles.genderBalls}>
              <div className={Styles.ballBlock}>
                <a href="/shop?gender=female#eyewear">
                  <div
                    className={Styles.genderBall}
                    style={{
                      backgroundImage: `url('/female-eyewear.jpg')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </a>
                <br></br>
                <Typography
                  variant="h3"
                  component="h3"
                  className={Styles.ballTitle}
                >
                  For <strong>Her</strong>
                </Typography>
              </div>
              <div className={Styles.ballBlock}>
                <a href="/shop?gender=male#eyewear">
                  <div
                    className={Styles.genderBall}
                    style={{
                      backgroundImage: `url('/male-eyewear.jpg')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </a>
                <br></br>
                <Typography
                  variant="h3"
                  component="h3"
                  className={Styles.ballTitle}
                >
                  For <strong>Him</strong>
                </Typography>
              </div>
              <div className={Styles.ballBlock}>
                <a href={`/shop?gender=boys&gender=girls#eyewear`}>
                  <div
                    className={Styles.genderBall}
                    style={{
                      backgroundImage: `url('/kids_eyewear.jpeg')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </a>
                <br></br>
                <Typography
                  variant="h3"
                  component="h3"
                  className={Styles.ballTitle}
                >
                  For <strong>Kids</strong>
                </Typography>
              </div>
            </div>
            <HamedAbdallahWhiteSpace />
            <HamedAbdallahWhiteSpace />
          </>
        ) : (
          <div className={Styles.genderBallsMob}>
            <HamedAbdallahWhiteSpace />
            <div className={Styles.ballBlockMob}>
              <a href="/shop?gender=female#eyewear">
                <div
                  className={Styles.genderBallMob}
                  style={{
                    backgroundImage: `url('/female-eyewear.jpg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </a>
              <br></br>
              <Typography
                variant="h4"
                component="h4"
                className={Styles.ballTitleMob}
              >
                <span className={Styles.ballTitleSpan}>
                  For <strong>Her</strong>
                </span>
              </Typography>
            </div>
            <div className={Styles.ballBlockMob}>
              <a href="/shop?gender=male#eyewear">
                <div
                  className={Styles.genderBallMob}
                  style={{
                    backgroundImage: `url('/male-eyewear.jpg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </a>
              <br></br>
              <Typography
                variant="h4"
                component="h4"
                className={Styles.ballTitleMob}
              >
                <span className={Styles.ballTitleSpan}>
                  For <strong>Him</strong>
                </span>
              </Typography>
            </div>
            <div className={Styles.ballBlockMob}>
              <a href={`/shop?gender=boys&gender=girls#eyewear`}>
                <div
                  className={Styles.genderBallMob}
                  style={{
                    backgroundImage: `url('/kids_eyewear.jpeg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </a>
              <br></br>
              <Typography
                variant="h4"
                component="h4"
                className={Styles.ballTitleMob}
              >
                <span className={Styles.ballTitleSpan}>
                  For <strong>Kids</strong>
                </span>
              </Typography>
              <HamedAbdallahWhiteSpace />
            </div>
          </div>
        )}

        <Grid container spacing={2}>
          {matches ? (
            <Grid item md={3} xs={12}>
              <div className={Styles.filterBar}>
                <List>
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          GLASSES TYPE
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler(
                                  'type',
                                  'sunglasses'
                                )}
                              />
                            }
                            label="Sun Glasses"
                            name="type"
                            value="sunglasses"
                            onChange={(e) =>
                              updateFilterQueryHandler(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler(
                                  'type',
                                  'eyeglasses'
                                )}
                              />
                            }
                            label="Eye Glasses"
                            name="type"
                            value="eyeglasses"
                            onChange={(e) =>
                              updateFilterQueryHandler(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          BRANDS
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          {brands.map((brand) => (
                            <FormControlLabel
                              key={brand.name}
                              control={
                                <Checkbox
                                  style={{ color: '#ca222a' }}
                                  checked={checkboxCheckHandler(
                                    'brand',
                                    brand.name
                                  )}
                                />
                              }
                              label={brand.name}
                              name="brand"
                              value={brand.name}
                              onChange={(e) =>
                                updateFilterQueryHandler(
                                  e.target.name,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>{' '}
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          COLOR
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          {colors.map((color) => (
                            <FormControlLabel
                              key={color}
                              control={
                                <Checkbox
                                  style={{ color: '#ca222a' }}
                                  checked={checkboxCheckHandler('color', color)}
                                />
                              }
                              style={{ textTransform: 'capitalize' }}
                              label={color}
                              name="color"
                              value={color}
                              onChange={(e) =>
                                updateFilterQueryHandler(
                                  e.target.name,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>{' '}
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          PRICE
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid
                          container
                          spacing={1}
                          className={Styles.sliderContainer}
                        >
                          <Grid item md={3}>
                            <Input
                              value={lowPrice}
                              size="small"
                              onChange={(e) => handleLowPriceChange(e)}
                              // onBlur={handleBlur}
                              inputProps={{
                                step: 10,
                                min: minPrice,
                                max: maxPrice,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                              }}
                            />
                          </Grid>
                          <Grid item className={Styles.slider} md={6}>
                            <Slider
                              min={minPrice}
                              max={maxPrice}
                              step={10}
                              style={{ color: '#ca222a' }}
                              value={price}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item md={3}>
                            <Input
                              value={highPrice}
                              size="small"
                              onChange={(e) => handleHighPriceChange(e)}
                              // onBlur={handleBlur}
                              inputProps={{
                                step: 10,
                                min: minPrice,
                                max: maxPrice,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                              }}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>{' '}
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          GENDER
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          {genders.map((gender) => (
                            <FormControlLabel
                              key={gender}
                              control={
                                <Checkbox
                                  style={{ color: '#ca222a' }}
                                  checked={checkboxCheckHandler(
                                    'gender',
                                    gender
                                  )}
                                />
                              }
                              style={{ textTransform: 'capitalize' }}
                              label={gender}
                              name="gender"
                              value={gender}
                              onChange={(e) =>
                                updateFilterQueryHandler(
                                  e.target.name,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          MATERIAL
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          {materials.map((material) => (
                            <FormControlLabel
                              key={material}
                              control={
                                <Checkbox
                                  style={{ color: '#ca222a' }}
                                  checked={checkboxCheckHandler(
                                    'material',
                                    material
                                  )}
                                />
                              }
                              style={{ textTransform: 'capitalize' }}
                              label={material}
                              name="material"
                              value={material}
                              onChange={(e) =>
                                updateFilterQueryHandler(
                                  e.target.name,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>{' '}
                  <ListItem>
                    <Accordion className={Styles.filterAccordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={Styles.filterAccordionName}
                      >
                        <Typography
                          style={{ color: '#ca222a' }}
                          variant="h6"
                          component="h6"
                        >
                          SHAPE
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          {shapes.map((shape) => (
                            <FormControlLabel
                              key={shape}
                              control={
                                <Checkbox
                                  style={{ color: '#ca222a' }}
                                  checked={checkboxCheckHandler('shape', shape)}
                                />
                              }
                              style={{ textTransform: 'capitalize' }}
                              label={shape}
                              name="shape"
                              value={shape}
                              onChange={(e) =>
                                updateFilterQueryHandler(
                                  e.target.name,
                                  e.target.value,
                                  e.target.checked
                                )
                              }
                            />
                          ))}
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={(e) => handleFilterQuery(e)}
                      variant="contained"
                      className={Styles.button}
                      // color="primary"Filter
                      // fullWidth
                    >
                      Filter
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Grid>
          ) : (
            <Grid item md={3} xs={12}>
              <Accordion style={{ backgroundColor: 'transparent' }}>
                <AccordionSummary>
                  <Grid container spacing={4}>
                    <Grid item md={2}>
                      <FontAwesomeIcon icon={faFilter} />
                    </Grid>
                    <Grid item md={10}>
                      <h4> Filter</h4>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item md={3} xs={12}>
                    <div className={Styles.filterBarMob}>
                      <List>
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                GLASSES TYPE
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'type',
                                        'sunglasses'
                                      )}
                                    />
                                  }
                                  label="Sun Glasses"
                                  name="type"
                                  value="sunglasses"
                                  onChange={(e) =>
                                    updateFilterQueryHandler(
                                      e.target.name,
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'type',
                                        'eyeglasses'
                                      )}
                                    />
                                  }
                                  label="Eye Glasses"
                                  name="type"
                                  value="eyeglasses"
                                  onChange={(e) =>
                                    updateFilterQueryHandler(
                                      e.target.name,
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
                                />
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                BRANDS
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox style={{ color: '#ca222a' }} />
                                  }
                                  label="Sun Glasses"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox style={{ color: '#ca222a' }} />
                                  }
                                  label="Eye Glasses"
                                />
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>{' '}
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                COLOR
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                {colors.map((color) => (
                                  <FormControlLabel
                                    key={color}
                                    control={
                                      <Checkbox
                                        style={{ color: '#ca222a' }}
                                        checked={checkboxCheckHandler(
                                          'color',
                                          color
                                        )}
                                      />
                                    }
                                    style={{ textTransform: 'capitalize' }}
                                    label={color}
                                    name="color"
                                    value={color}
                                    onChange={(e) =>
                                      updateFilterQueryHandler(
                                        e.target.name,
                                        e.target.value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                ))}
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>{' '}
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                PRICE
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid
                                container
                                spacing={1}
                                className={Styles.sliderContainer}
                              >
                                <Grid item md={3}>
                                  <Input
                                    value={lowPrice}
                                    size="small"
                                    onChange={(e) => handleLowPriceChange(e)}
                                    inputProps={{
                                      step: 10,
                                      min: minPrice,
                                      max: maxPrice,
                                      type: 'number',
                                      'aria-labelledby': 'input-slider',
                                    }}
                                  />
                                </Grid>
                                <Grid item className={Styles.slider} md={6}>
                                  <Slider
                                    min={minPrice}
                                    max={maxPrice}
                                    step={10}
                                    style={{ color: '#ca222a' }}
                                    value={price}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item md={3}>
                                  <Input
                                    value={highPrice}
                                    size="small"
                                    onChange={(e) => handleHighPriceChange(e)}
                                    // onBlur={handleBlur}
                                    inputProps={{
                                      step: 10,
                                      min: minPrice,
                                      max: maxPrice,
                                      type: 'number',
                                      'aria-labelledby': 'input-slider',
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>{' '}
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                GENDER
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                {genders.map((gender) => (
                                  <FormControlLabel
                                    key={gender}
                                    control={
                                      <Checkbox
                                        style={{ color: '#ca222a' }}
                                        checked={checkboxCheckHandler(
                                          'gender',
                                          gender
                                        )}
                                      />
                                    }
                                    style={{ textTransform: 'capitalize' }}
                                    label={gender}
                                    name="gender"
                                    value={gender}
                                    onChange={(e) =>
                                      updateFilterQueryHandler(
                                        e.target.name,
                                        e.target.value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                ))}
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                MATERIAL
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                {materials.map((material) => (
                                  <FormControlLabel
                                    key={material}
                                    control={
                                      <Checkbox
                                        style={{ color: '#ca222a' }}
                                        checked={checkboxCheckHandler(
                                          'material',
                                          material
                                        )}
                                      />
                                    }
                                    style={{ textTransform: 'capitalize' }}
                                    label={material}
                                    name="material"
                                    value={material}
                                    onChange={(e) =>
                                      updateFilterQueryHandler(
                                        e.target.name,
                                        e.target.value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                ))}
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>{' '}
                        <ListItem>
                          <Accordion className={Styles.filterAccordion}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              className={Styles.filterAccordionName}
                            >
                              <Typography
                                style={{ color: '#ca222a' }}
                                variant="h6"
                                component="h6"
                              >
                                SHAPE
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                {shapes.map((shape) => (
                                  <FormControlLabel
                                    key={shape}
                                    control={
                                      <Checkbox
                                        style={{ color: '#ca222a' }}
                                        checked={checkboxCheckHandler(
                                          'shape',
                                          shape
                                        )}
                                      />
                                    }
                                    style={{ textTransform: 'capitalize' }}
                                    label={shape}
                                    name="shape"
                                    value={shape}
                                    onChange={(e) =>
                                      updateFilterQueryHandler(
                                        e.target.name,
                                        e.target.value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                ))}
                              </FormGroup>
                            </AccordionDetails>
                          </Accordion>
                        </ListItem>
                        <ListItem>
                          <Button
                            onClick={(e) => handleFilterQuery(e)}
                            variant="contained"
                            className={Styles.button}
                            // color="primary"Filter
                            // fullWidth
                          >
                            Filter
                          </Button>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )}
          <Grid item md={9} xs={12} id="eyewear" className={Styles.productPane}>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} sm={6} xs={12} key={product.sku}>
                  <Card>
                    <NextLink href={`/product/${product.slug}`} passHref>
                      <Link>
                        <CardActionArea>
                          <CardMedia
                            className={Styles.card}
                            component="img"
                            image={product.featuredImage}
                            title={`${product.brandName} ${
                              product.type
                            } ${``} - ${``} ${product.sku}`}
                          ></CardMedia>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="h5"
                              style={{
                                color: 'black',
                                textDecoration: 'none !important',
                                textTransform: 'capitalize !important',
                              }}
                            >
                              {`${product.brandName} ${
                                product.type
                              } ${``} - ${``} ${product.sku}`}{' '}
                            </Typography>
                            {/* <br></br> */}
                            <Typography
                              variant="body1"
                              style={{ color: 'black' }}
                              component="h6"
                            >
                              {product.brandName}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                    </NextLink>
                    <br></br>
                    <CardActions className={Styles.cardAction}>
                      {product.discountedPrice === 0 ||
                      !product.discountedPrice ? (
                        <Typography>
                          <strong>{product.price} EGP</strong>
                        </Typography>
                      ) : (
                        <Typography style={{ display: 'flex' }}>
                          <div className={Styles.lineThrough}>
                            {product.price}
                          </div>
                          <strong>
                            {product.price - product.discountedPrice} EGP
                          </strong>
                        </Typography>
                      )}
                      <Button
                        size="small"
                        onClick={() => addToCartHandler(product)}
                      >
                        <FontAwesomeIcon
                          style={{ color: '#ca222a' }}
                          icon={faShoppingBag}
                          size="2x"
                        />
                      </Button>
                      <Button
                        size="small"
                        onClick={() => addToWishlistHandler(product)}
                      >
                        <FontAwesomeIcon
                          style={{ color: '#ca222a' }}
                          icon={faHeart}
                          size="2x"
                        />
                      </Button>
                    </CardActions>
                    <br></br>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <HamedAbdallahWhiteSpace />
    </>
  );
};

export async function getServerSideProps({ query }) {
  await db.connect();

  const { type, gender, material, shape, brand, price, color } = query;

  let products = await Product.find({}).lean();

  let maxPrice = Math.max.apply(
    Math,
    products.map(function (o) {
      return o.price - o.discountedPrice;
    })
  );

  let minPrice = Math.min.apply(
    Math,
    products.map(function (o) {
      return o.price - o.discountedPrice;
    })
  );

  if (brand) {
    products = products.filter((product) => {
      {
        return product.brandName === brand;
      }
    });
  }
  if (price) {
    const priceArr = price.split(',');

    products = products.filter((product) => {
      return (
        product.price - product.discountedPrice >= priceArr[0] &&
        product.price - product.discountedPrice <= priceArr[1]
      );
    });
  }
  if (type) {
    products = products.filter((product) => {
      {
        return product.type === type;
      }
    });
  }
  if (gender) {
    products = products.filter((product) => {
      {
        return product.gender === gender;
      }
    });
  }
  if (material) {
    products = products.filter((product) => {
      {
        return product.material === material;
      }
    });
  }
  if (shape) {
    products = products.filter((product) => {
      {
        return product.shape === shape;
      }
    });
  }
  if (color) {
    products = products.filter((product) => {
      {
        return product.color === color;
      }
    });
  }

  products = products.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const allProducts = JSON.parse(JSON.stringify(products));

  let brands = await Brand.find({}).lean();
  const allBrands = JSON.parse(JSON.stringify(brands));
  await db.disconnect();

  return {
    props: {
      products: allProducts,
      brands: allBrands,
      queryFilterProp: query,
      maxPrice,
      minPrice,
    },
  };
}

export default shop;
