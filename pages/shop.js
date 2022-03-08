import Styles from '../styles/pages/shop.module.css';
import {
  HamedAbdallahWhiteSpace,
  HamedAbdallahProductCard,
} from '../components/index.js';
import Carousel from 'react-bootstrap/Carousel';

import {
  Grid,
  Typography,
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
  useMediaQuery,
  Input,
} from '@material-ui/core';
import Image from 'next/image';
import db from '../utils/db';
import Product from '../models/Product';
import Brand from '../models/Brand';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const shop = (props) => {
  const matches = useMediaQuery(`(min-width: 1024px)`);

  const { queryFilterProp, brands, maxPrice, minPrice } = props;
  const [products, setProducts] = useState(props.products);

  const [productsToShow, setProductsToShow] = useState(
    props.products.slice(0, 9)
  );

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
    'green',
    'hazel',
    'light-blue',
    'pink',
    'purple',
    'red',
    'silver',
    'transparent',
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

  const loadMoreHandler = async () => {
    const newProducts = products.slice(0, productsToShow.length + 6);
    setProductsToShow(newProducts);
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
          console.log('element', element);
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

    window.location.href = `/shop${queryParams}`;
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

  const updateQuery = async (e) => {
    e.preventDefault();

    const returnVal = queryFilter.type.includes(e.target.value);

    if (!returnVal) {
      let queryParams = `?`;

      await updateFilterQueryHandler(e.target.name, e.target.value, true);
      queryParams = queryParams.concat(`type=${e.target.value}#eyewear`);

      window.location.href = `/shop${queryParams}`;
    }
  };

  return (
    <div className={Styles.root}>
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
        <HamedAbdallahWhiteSpace />

        <div className={Styles.typeBlock}>
          <div className={Styles.typeButtonBase}>
            <Button
              className={Styles.typeButton_sunglasses}
              name="type"
              value="sunglasses"
              onClick={(e) => updateQuery(e)}
            >
              <Typography component="h1" className={Styles.typeButtonText}>
                Sunglasses
              </Typography>
            </Button>
          </div>
          <div className={Styles.typeButtonBase}>
            <Button
              className={Styles.typeButton_eyeglasses}
              name="type"
              value="eyeglasses"
              onClick={(e) => updateQuery(e)}
            >
              <Typography component="h1" className={Styles.typeButtonText}>
                Optical
                <br></br>
                Eyewear
              </Typography>
            </Button>
          </div>
        </div>
        {/* Filter Grid */}
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
                            label="Optical Eyewear"
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
                                  label="Optical Eyewear"
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

          {/* Products Grid */}
          <Grid item md={9} xs={12} id="eyewear" className={Styles.productPane}>
            <>
              <Grid container spacing={6}>
                {productsToShow.map((product) => (
                  <Grid item md={4} sm={6} xs={12} key={product.sku}>
                    <HamedAbdallahProductCard
                      product={product}
                      brand={product.brand}
                    />
                  </Grid>
                ))}
              </Grid>
              {productsToShow.length === 0 ? (
                <div className={Styles.removeFilterButton}>
                  <div className={Styles.removeFilterContent}>
                    <Typography variant="h4" component="h4">
                      Check Back Later
                    </Typography>
                    <br></br>
                    <Button className={Styles.button} href="/shop#eyewear">
                      Remove Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={Styles.loadMoreBtnBase}>
                  <Button className={Styles.button} onClick={loadMoreHandler}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <HamedAbdallahWhiteSpace />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  await db.connect();

  const { type, gender, material, shape, brand, price, color } = query;
  let products = await Product.find({})
    .populate({ path: 'brand', Model: Brand })
    .lean();

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
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const allProducts = JSON.parse(JSON.stringify(products));
  let brands = await Brand.find({}).lean();
  const allBrands = JSON.parse(JSON.stringify(brands));
  await db.disconnect();

  if (query.gender && !Array.isArray(query.gender)) {
    let arr = [];
    arr.push(query.gender);

    query.gender = arr;
  }

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
