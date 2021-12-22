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
  });
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [lowPrice, setLowPrice] = useState(minPrice);
  const [highPrice, setHighPrice] = useState(maxPrice);

  const [filterAnchor, setFilterAnchor] = useState(false);
  const router = useRouter();

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
      console.log('QUERYFILTER', queryFilter);
    } else {
      console.log('queryFilter', queryFilter);
      let updated;

      if (Array.isArray(queryFilter[queryName])) {
        console.log('queryFilter[queryName]', queryFilter[queryName]);
        updated = queryFilter[queryName].filter((element) => {
          console.log(element);
          return element !== queryValue;
        });
        console.log('updated', updated);
      } else {
        updated = '';
      }

      console.log('queryFilter 2', queryFilter);

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
          height={800}
        />
        <Image
          src="/wave-red-top.png"
          alt="placeholder"
          width={1980}
          height={250}
        />
      </div>
      <div className={Styles.container}>
        <HamedAbdallahWhiteSpace />
        <br></br>

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
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler('gender', 'male')}
                              />
                            }
                            label="Men"
                            name="gender"
                            value="male"
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
                                  'gender',
                                  'female'
                                )}
                              />
                            }
                            label="Women"
                            name="gender"
                            value="female"
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
                                checked={checkboxCheckHandler('gender', 'boys')}
                              />
                            }
                            label="Boys"
                            name="gender"
                            value="boys"
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
                                  'gender',
                                  'girls'
                                )}
                              />
                            }
                            label="Girls"
                            name="gender"
                            value="girls"
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
                          MATERIAL
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler(
                                  'material',
                                  'metal'
                                )}
                              />
                            }
                            label="Metal"
                            name="material"
                            value="metal"
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
                                  'material',
                                  'acetate'
                                )}
                              />
                            }
                            label="Acetate"
                            name="material"
                            value="acetate"
                            onChange={(e) =>
                              updateFilterQueryHandler(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />{' '}
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler(
                                  'material',
                                  'injected'
                                )}
                              />
                            }
                            label="Injected"
                            name="material"
                            value="injected"
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
                                  'material',
                                  'titanium'
                                )}
                              />
                            }
                            label="Titanium"
                            name="material"
                            value="titanium"
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
                                  'material',
                                  'plastic'
                                )}
                              />
                            }
                            label="Plastic"
                            name="material"
                            value="plastic"
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
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler(
                                  'shape',
                                  'square'
                                )}
                              />
                            }
                            label="Square"
                            name="shape"
                            value="square"
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
                                  'shape',
                                  'rectangle'
                                )}
                              />
                            }
                            label="Rectangle"
                            name="shape"
                            value="rectangle"
                            onChange={(e) =>
                              updateFilterQueryHandler(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />{' '}
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler('shape', 'round')}
                              />
                            }
                            label="Round"
                            name="shape"
                            value="round"
                            onChange={(e) =>
                              updateFilterQueryHandler(
                                e.target.name,
                                e.target.value,
                                e.target.checked
                              )
                            }
                          />{' '}
                          <FormControlLabel
                            control={
                              <Checkbox
                                style={{ color: '#ca222a' }}
                                checked={checkboxCheckHandler('shape', 'oval')}
                              />
                            }
                            label="Oval"
                            name="shape"
                            value="oval"
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
                                  'shape',
                                  'cat-eye'
                                )}
                              />
                            }
                            label="Cat-Eye"
                            name="shape"
                            value="cat-eye"
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
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'gender',
                                        'male'
                                      )}
                                    />
                                  }
                                  label="Men"
                                  name="gender"
                                  value="male"
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
                                        'gender',
                                        'female'
                                      )}
                                    />
                                  }
                                  label="Women"
                                  name="gender"
                                  value="female"
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
                                        'gender',
                                        'boys'
                                      )}
                                    />
                                  }
                                  label="Boys"
                                  name="gender"
                                  value="boys"
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
                                        'gender',
                                        'girls'
                                      )}
                                    />
                                  }
                                  label="Girls"
                                  name="gender"
                                  value="girls"
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
                                MATERIAL
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'material',
                                        'metal'
                                      )}
                                    />
                                  }
                                  label="Metal"
                                  name="material"
                                  value="metal"
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
                                        'material',
                                        'acetate'
                                      )}
                                    />
                                  }
                                  label="Acetate"
                                  name="material"
                                  value="acetate"
                                  onChange={(e) =>
                                    updateFilterQueryHandler(
                                      e.target.name,
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
                                />{' '}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'material',
                                        'injected'
                                      )}
                                    />
                                  }
                                  label="Injected"
                                  name="material"
                                  value="injected"
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
                                        'material',
                                        'titanium'
                                      )}
                                    />
                                  }
                                  label="Titanium"
                                  name="material"
                                  value="titanium"
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
                                        'material',
                                        'plastic'
                                      )}
                                    />
                                  }
                                  label="Plastic"
                                  name="material"
                                  value="plastic"
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
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'shape',
                                        'square'
                                      )}
                                    />
                                  }
                                  label="Square"
                                  name="shape"
                                  value="square"
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
                                        'shape',
                                        'rectangle'
                                      )}
                                    />
                                  }
                                  label="Rectangle"
                                  name="shape"
                                  value="rectangle"
                                  onChange={(e) =>
                                    updateFilterQueryHandler(
                                      e.target.name,
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
                                />{' '}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'shape',
                                        'round'
                                      )}
                                    />
                                  }
                                  label="Round"
                                  name="shape"
                                  value="round"
                                  onChange={(e) =>
                                    updateFilterQueryHandler(
                                      e.target.name,
                                      e.target.value,
                                      e.target.checked
                                    )
                                  }
                                />{' '}
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      style={{ color: '#ca222a' }}
                                      checked={checkboxCheckHandler(
                                        'shape',
                                        'oval'
                                      )}
                                    />
                                  }
                                  label="Oval"
                                  name="shape"
                                  value="oval"
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
                                        'shape',
                                        'cat-eye'
                                      )}
                                    />
                                  }
                                  label="Cat-Eye"
                                  name="shape"
                                  value="cat-eye"
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
          <Grid item md={9} xs={12} id="eyewear">
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item md={4} sm={6} xs={12} key={product.name}>
                  <Card>
                    <NextLink href={`/product/${product.slug}`} passHref>
                      <Link>
                        <CardActionArea>
                          <CardMedia
                            className={Styles.card}
                            component="img"
                            image={`/uploads/${product.featuredImage}`}
                            title={product.name}
                          ></CardMedia>
                          <CardContent>
                            <Typography
                              variant="h5"
                              component="h5"
                              style={{
                                color: 'black',
                                textDecoration: 'none !important',
                              }}
                            >
                              {product.name}
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
                      <Typography>
                        <strong>L.E {product.price}</strong>
                      </Typography>
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
      {/* <div className={Styles.brandsCarousel}>
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
          className={Styles.brands}
          pagination={false}
          transitionMs={2000}
        >
          {brands.map((brand) => (
            <Image
              key={brand.name}
              alt="Hamed Abdallah Brand"
              src={`/uploads/${brand.logo}`}
              width={75}
              height={75}
            />
          ))}
        </Carousel>
      </div> */}
      <HamedAbdallahWhiteSpace />
    </>
  );
};

export async function getServerSideProps({ query }) {
  await db.connect();

  const { type, gender, material, shape, brand, price } = query;
  // console.log(price);/

  let products = await Product.find({}).lean();

  let maxPrice = Math.max.apply(
    Math,
    products.map(function (o) {
      return o.price;
    })
  );

  let minPrice = Math.min.apply(
    Math,
    products.map(function (o) {
      return o.price;
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
      return product.price >= priceArr[0] && product.price <= priceArr[1];
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
