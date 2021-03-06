import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../../utils/Store';
import db from '../../../utils/db';
import Product from '../../../models/Product';
import { ReactPhotoCollage } from 'react-photo-collage';
import { useMediaQuery } from '@mui/material';

import {
  HamedAbdallahWhiteSpace,
  HamedAbdallahAdminDrawer,
} from '../../../components';
import {
  Button,
  Card,
  Grid,
  List,
  TextField,
  ListItem,
  Typography,
  Select,
  MenuItem,
  Switch,
  Drawer,
} from '@material-ui/core';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faHeart,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import Styles from '../../../styles/pages/admin/product.module.css';

export default function ProductScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isOpened, setIsOpened] = useState(false);

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();
  const { slug } = router.query;
  const { product } = props;

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }
  const fileInput = React.useRef();
  const filesInput = React.useRef();

  const [editedName, setEditedName] = useState(product.name);
  const [editedSku, setEditedSku] = useState(product.sku);
  const [editedBrand, setEditedBrand] = useState(product.brandName);
  const [editedSlug, setEditedSlug] = useState(product.slug);
  const [editedColor, setEditedColor] = useState(product.color);
  const [editedMaterial, setEditedMaterial] = useState(product.material);
  const [editedShape, setEditedShape] = useState(product.shape);
  const [editedGender, setEditedGender] = useState(product.gender);
  const [editedType, setEditedType] = useState(product.type);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedDiscountedPrice, setEditedDiscountedPrice] = useState(
    product.discountedPrice
  );
  const [editedStock, setEditedStock] = useState(product.stock);
  const [editedStatus, setEditedStatus] = useState(product.status);
  const [editedFeaturedImage, setEditedFeaturedImage] = useState();
  const [editedDescription, setEditedDescripton] = useState(
    product.description
  );

  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'editedName':
        return setEditedName(e.target.value);
      case 'editedSku':
        return setEditedSku(e.target.value);
      case 'editedSlug':
        return setEditedSlug(e.target.value);
      case 'editedBrand':
        return setEditedBrand(e.target.value);
      case 'editedDescription':
        return setEditedDescripton(e.target.value);
      case 'editedColor':
        return setEditedColor(e.target.value);
      case 'editedMaterial':
        return setEditedMaterial(e.target.value);
      case 'editedShape':
        return setEditedShape(e.target.value);
      case 'editedGender':
        return setEditedGender(e.target.value);
      case 'editedType':
        return setEditedType(e.target.value);
      case 'editedPrice':
        return setEditedPrice(e.target.value);
      case 'editedDiscountedPrice':
        return setEditedDiscountedPrice(e.target.value);
      case 'editedStock':
        return setEditedStock(e.target.value);
      case 'editedStatus':
        return setEditedStatus(e.target.checked);
      case 'editedFeaturedImage':
        return setEditedFeaturedImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async () => {
    const editedProduct = await axios
      .post(`/api/admin/products/edit`, {
        productID: product._id,
        editedName,
        editedSku,
        editedSlug,
        editedBrand,
        editedDescription,
        editedColor,
        editedMaterial,
        editedShape,
        editedGender,
        editedType,
        editedPrice,
        editedDiscountedPrice,
        editedStock,
        editedStatus,
      })
      .then((res) => {
        enqueueSnackbar('Product edited successfully', {
          variant: 'success',
        });
        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
  };

  const productImages = [];
  product.images.map((img) => {
    productImages.push({ source: `${img}` });
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpened(open);
  };

  return (
    <Grid container>
      <Grid item md={1}>
        <Button onClick={toggleDrawer(true)}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
        </Button>
        <Drawer anchor={'left'} open={isOpened} onClose={toggleDrawer(false)}>
          <HamedAbdallahAdminDrawer />
        </Drawer>
      </Grid>
      <Grid item md={11}>
        <div className={Styles.root}>
          <div className={Styles.container}>
            <HamedAbdallahWhiteSpace />
            <Grid container spacing={4}>
              <Grid item md={5} xs={12}>
                <Typography variant="h5" component="h5">
                  Featured Image:
                </Typography>
                <div className={Styles.featuredImageTile}>
                  {/* <h2>{product.featuredImage}</h2> */}
                  <Image
                    className={Styles.featuredImage}
                    alt={product.name}
                    src={product.featuredImage}
                    width={'1000'}
                    priority={true}
                    height={'1000'}
                  />
                </div>
                <br></br>
                <Typography variant="h5" component="h5">
                  Other Images:
                </Typography>
                <div className={Styles.otherImages}>
                  {productImages.map((img) => (
                    <div className={Styles.otherImageTile}>
                      {/* <h2>{img.source}</h2> */}
                      <Image
                        className={Styles.featuredImage}
                        alt={img}
                        src={img.source}
                        width="500"
                        height="300"
                        priority={true}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item md={7} xs={12}>
                <List>
                  <ListItem>
                    {' '}
                    <Typography
                      style={{ width: '100%' }}
                      variant="h6"
                      component="h6"
                    >
                      Name:{' '}
                      <TextField
                        value={editedName}
                        variant="filled"
                        name="editedName"
                        fullWidth
                        onChange={changeHandler}
                      ></TextField>
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <Typography variant="h6" component="h6">
                      SKU:{' '}
                      <TextField
                        value={editedSku}
                        variant="filled"
                        name="editedSku"
                        onChange={changeHandler}
                      ></TextField>
                    </Typography>
                    <Typography variant="h6" component="h6">
                      Brand:{' '}
                      <TextField
                        value={editedBrand}
                        variant="filled"
                        name="editedBrand"
                        onChange={changeHandler}
                      ></TextField>
                    </Typography>
                    <Typography variant="h6" component="h6">
                      Slug:{' '}
                      <TextField
                        value={editedSlug}
                        variant="filled"
                        name="editedSlug"
                        onChange={changeHandler}
                      ></TextField>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      style={{ width: '100%' }}
                      variant="h6"
                      component="h6"
                    >
                      Description:{' '}
                      <TextField
                        value={editedDescription}
                        fullWidth
                        multiline
                        rows={4}
                        variant="filled"
                        name="editedDescription"
                        onChange={changeHandler}
                      ></TextField>
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <Typography
                      style={{ width: '90%' }}
                      variant="h6"
                      component="h6"
                    >
                      Color:{' '}
                      <Select
                        value={editedColor}
                        variant="filled"
                        style={{ width: '90%' }}
                        name="editedColor"
                        fullWidth
                        onChange={changeHandler}
                      >
                        <MenuItem value="beige">Beige</MenuItem>
                        <MenuItem value="black">Black</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="brown">Brown</MenuItem>
                        <MenuItem value="gold">Gold</MenuItem>
                        <MenuItem value="grey">Grey</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                        <MenuItem value="hazel">Hazel</MenuItem>
                        <MenuItem value="light-blue">Light Blue</MenuItem>
                        <MenuItem value="pink">Pink</MenuItem>
                        <MenuItem value="purple">Purple</MenuItem>
                        <MenuItem value="red">Red</MenuItem>
                        <MenuItem value="silver">Silver</MenuItem>
                        <MenuItem value="transparent">Transparent</MenuItem>
                        <MenuItem value="white">White</MenuItem>
                        <MenuItem value="yellow">Yellow</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </Typography>{' '}
                    <Typography
                      style={{ width: '90%' }}
                      variant="h6"
                      component="h6"
                    >
                      Material:{' '}
                      <Select
                        value={editedMaterial}
                        variant="filled"
                        name="editedMaterial"
                        fullWidth
                        style={{ width: '90%' }}
                        onChange={changeHandler}
                      >
                        <MenuItem value="plastic">Plastic</MenuItem>
                        <MenuItem value="metal">Metal</MenuItem>
                        <MenuItem value="plastic/metal">Plastic/Metal</MenuItem>
                      </Select>
                    </Typography>{' '}
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ width: '90%' }}
                    >
                      Shape:{' '}
                      <Select
                        style={{ width: '90%' }}
                        value={editedShape}
                        variant="filled"
                        name="editedShape"
                        fullWidth
                        onChange={changeHandler}
                      >
                        <MenuItem value="cat-eye">Cat-Eye</MenuItem>
                        <MenuItem value="mask">Mask</MenuItem>
                        <MenuItem value="oval">Oval</MenuItem>
                        <MenuItem value="rectangle">Rectangle</MenuItem>
                        <MenuItem value="round">Round</MenuItem>
                        <MenuItem value="sport">Sport</MenuItem>
                        <MenuItem value="square">Square</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <Typography
                      style={{ width: '90%' }}
                      variant="h6"
                      component="h6"
                    >
                      Gender:{' '}
                      <Select
                        value={editedGender}
                        variant="filled"
                        style={{ width: '90%' }}
                        name="editedGender"
                        fullWidth
                        onChange={changeHandler}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="kids">Kids</MenuItem>
                        <MenuItem value="unisex">Unisex</MenuItem>
                      </Select>
                    </Typography>{' '}
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ width: '90%' }}
                    >
                      Type:{' '}
                      <Select
                        style={{ width: '90%' }}
                        value={editedType}
                        variant="filled"
                        name="editedType"
                        fullWidth
                        onChange={changeHandler}
                      >
                        <MenuItem key="sunglasses" value="sunglasses">
                          Sunglasses
                        </MenuItem>
                        <MenuItem key="eyeglasses" value="eyeglasses">
                          Eyeglasses
                        </MenuItem>
                      </Select>
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <Typography variant="h6" component="h6">
                      Price
                      <TextField
                        value={editedPrice}
                        variant="filled"
                        name="editedPrice"
                        fullWidth
                        type="number"
                        onChange={changeHandler}
                      ></TextField>{' '}
                    </Typography>{' '}
                    <Typography variant="h6" component="h6">
                      Discount Value
                      <TextField
                        value={editedDiscountedPrice}
                        variant="filled"
                        name="editedDiscountedPrice"
                        fullWidth
                        type="number"
                        onChange={changeHandler}
                      ></TextField>{' '}
                    </Typography>
                  </ListItem>
                  <ListItem className={Styles.inlineList}>
                    <Typography variant="h6" component="h6">
                      Stock
                      <TextField
                        value={editedStock}
                        variant="filled"
                        name="editedStock"
                        fullWidth
                        type="number"
                        onChange={changeHandler}
                      ></TextField>{' '}
                    </Typography>{' '}
                    <Typography variant="h6" component="h6">
                      Active Status
                      <br></br>
                      <Switch
                        name="editedStatus"
                        checked={editedStatus}
                        onChange={changeHandler}
                      />
                    </Typography>
                  </ListItem>
                  <hr></hr>
                  <ListItem className={Styles.inlineList}>
                    <Button
                      variant="contained"
                      disabled
                      color="primary"
                      name="editedFeaturedImage"
                      onClick={() => fileInput.current.click()}
                    >
                      Upload New Featured Image
                    </Button>
                    <input
                      ref={fileInput}
                      type="file"
                      style={{ display: 'none' }}
                    />{' '}
                    <Button
                      variant="contained"
                      disabled
                      color="primary"
                      onClick={() => filesInput.current.click()}
                    >
                      Change Other Images{' '}
                    </Button>
                    <input
                      ref={filesInput}
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                    />{' '}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onSubmitHandler}
                    >
                      Edit Product
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <HamedAbdallahWhiteSpace />
          </div>
        </div>{' '}
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const rawProduct = await Product.findOne({ slug }).lean();
  const product = JSON.parse(JSON.stringify(rawProduct));

  await db.disconnect();

  return {
    props: {
      product,
    },
  };
}
