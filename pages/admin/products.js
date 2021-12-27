import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  Typography,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  InputLabel,
  CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import db from '../../utils/db';
import Product from '../../models/Product';
import MaterialTable from 'material-table';
import tableIcons from '../../components/MaterialTableIcons';
import axios from 'axios';
import Moment from 'react-moment';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Brand from '../../models/Brand';
import { HamedAbdallahAdminDrawer } from '../../components';
function AdminProducts(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [images, setImages] = useState([]);
  const [prodShape, setProdShape] = useState();
  const [prodBrand, setProdBrand] = useState();
  const [prodStatus, setProdStatus] = useState();
  const [prodColor, setProdColor] = useState();
  const [prodGender, setProdGender] = useState();
  const [prodType, setProdType] = useState();
  const [prodMaterial, setProdMaterial] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featuredImage, setfeaturedImage] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { products, brands } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleFeaturedChange = (event) => {
    setfeaturedImage(event.target.files[0]);
  };

  const columns = [
    {
      title: 'Image',
      field: '_id',
      render: (rowData) => (
        <img
          src={rowData.featuredImage}
          style={{ width: 250, borderRadius: '10%' }}
        />
      ),
    },
    { title: 'Name', field: 'name' },
    { title: 'Brand', field: 'brandName' },
    { title: 'Type', field: 'type' },
    { title: 'Stock', field: 'stock', type: 'numeric' },
    { title: 'Price', field: 'price', type: 'numeric' },
    {
      title: 'Date Added',
      field: 'createdAt',
      type: 'numeric',
      render: (rowData) => (
        <Moment
          format="dddd DD MMM
         YYYY hh:mm:ss"
        >
          {rowData.createdAt}
        </Moment>
      ),
    },
    {
      title: 'Actions',
      field: '',
      render: (rowData) => (
        <Button variant="contained" href={`/admin/products/${rowData.slug}`}>
          Details
        </Button>
      ),
    },
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpened(open);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const submitHandler = async ({
    name,
    description,
    slug,
    stock,
    price,
    sku,
    status,
  }) => {
    closeSnackbar();
    setLoadingState(true);

    const formData = new FormData();
    for (var i = 0; i < images.length; i++) {
      formData.append('files', images[i]);
      formData.append('id', slug);
    }
    formData.append('productName', 'LMAO');

    const otherFormData = new FormData();
    otherFormData.append('file', featuredImage);
    otherFormData.append('id', slug);

    const featuredImg = await axios.post('/api/images/index2', otherFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    let otherImagesUrls = [];
    const imagesArr = await axios
      .post('/api/images/multiple2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        otherImagesUrls = res.data;
        console.log('res.data', res.data);
      });

    const product = await axios
      .post(`/api/admin/products/create`, {
        name,
        description,
        brand: prodBrand,
        color: prodColor,
        shape: prodShape,
        slug,
        sku,
        gender: prodGender,
        material: prodMaterial,
        type: prodType,
        stock,
        featuredImage: featuredImg.data.url,
        price,
        status: prodStatus,
        images: otherImagesUrls.imagesArr,
      })
      .then((res) => {
        enqueueSnackbar(`${name} has been uploaded successfully`, {
          variant: 'success',
        });
        setLoadingState(false);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (event) => {
    setImages(event.target.files);
  };

  return (
    <div className={Styles.container}>
      <Grid container>
        <Grid item md={1}>
          <Button onClick={toggleDrawer(true)}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
          </Button>
          <Drawer anchor={'left'} open={isOpened} onClose={toggleDrawer(false)}>
            <HamedAbdallahAdminDrawer />
          </Drawer>
        </Grid>
        <Grid item md={11} className={Styles.layout}>
          <Typography variant="h4" component="h4">
            Products
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={products}
              actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: 'Delete User',
                  onClick: async (event, rowData) => {
                    await axios.post(`/api/products/delete`, {
                      _id: rowData._id,
                    });
                    alert('Product has been deleted successfully');
                    window.location.reload();
                  },
                },
                {
                  icon: tableIcons.Add,
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: (event, rowData) => {
                    setIsModalOpen(true);
                  },
                },
              ]}
            />
          </div>
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={Styles.createModal}>
          <Typography
            id="modal-modal-title"
            className={Styles.createModalTitle}
            variant="h6"
            component="h2"
          >
            Create New Product
          </Typography>
          <br></br>
          <form
            onSubmit={handleSubmit(submitHandler)}
            encType="multipart/form-data"
          >
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <List>
                  <ListItem>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="name"
                          label="Name"
                          inputProps={{ type: 'text' }}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>{' '}
                  <ListItem>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={4}
                          id="description"
                          label="Product Description"
                          inputProps={{ type: 'text' }}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>{' '}
                  <ListItem>
                    <TextField
                      id="brand"
                      label="Product Brand"
                      variant="outlined"
                      fullWidth
                      select
                      onChange={(e) => setProdBrand(e.target.value)}
                    >
                      {brands.map((brand) => (
                        <MenuItem value={brand._id}>{brand.name}</MenuItem>
                      ))}
                    </TextField>
                  </ListItem>{' '}
                  <ListItem>
                    <TextField
                      id="type"
                      label="Product Type"
                      variant="outlined"
                      fullWidth
                      select
                      onChange={(e) => setProdType(e.target.value)}
                    >
                      <MenuItem value="sunglasses">Sunglasses</MenuItem>
                      <MenuItem value="eyeglasses">Eyeglasses</MenuItem>
                    </TextField>
                  </ListItem>{' '}
                  <ListItem>
                    <TextField
                      id="color"
                      label="Product Color"
                      variant="outlined"
                      fullWidth
                      select
                      onChange={(e) => setProdColor(e.target.value)}
                    >
                      <MenuItem value="black">Black</MenuItem>
                      <MenuItem value="grey">Grey</MenuItem>
                      <MenuItem value="yellow">Yellow</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="shape"
                      label="Product Shape"
                      variant="outlined"
                      fullWidth
                      select
                      onChange={(e) => setProdShape(e.target.value)}
                    >
                      <MenuItem value="round">Round</MenuItem>
                      <MenuItem value="square">Square</MenuItem>
                      <MenuItem value="cat-eye">Cat-Eye</MenuItem>
                      <MenuItem value="rectangle">Rectangle</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </ListItem>
                  <ListItem>
                    Active Status
                    <Switch
                      defaultChecked
                      onChange={(e) => setProdStatus(e.target.checked)}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <Controller
                    name="slug"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="slug"
                        label="Product Slug"
                        inputProps={{ type: 'text' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="sku"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="slug"
                        label="Product SKU"
                        inputProps={{ type: 'text' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <TextField
                    id="gender"
                    label="Product Gender"
                    variant="outlined"
                    fullWidth
                    select
                    onChange={(e) => setProdGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="boys">Boys</MenuItem>
                    <MenuItem value="girls">Girls</MenuItem>
                  </TextField>
                </ListItem>{' '}
                <ListItem>
                  <TextField
                    id="material"
                    label="Product Material"
                    variant="outlined"
                    fullWidth
                    select
                    onChange={(e) => setProdMaterial(e.target.value)}
                  >
                    <MenuItem value="plastic">Plastic</MenuItem>
                    <MenuItem value="metal">Metal</MenuItem>
                    <MenuItem value="titanium">Titanium</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    {/* {...field} */}
                  </TextField>
                </ListItem>{' '}
                <ListItem>
                  <Controller
                    name="stock"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="stock"
                        label="Stock"
                        inputProps={{ type: 'number' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>{' '}
                <ListItem>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="price"
                        label="Price"
                        inputProps={{ type: 'number' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="featuredImage"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <label for="featuredImage">
                          Product Featured Image:{' '}
                        </label>{' '}
                        <input
                          onChange={handleFeaturedChange}
                          type="file"
                        ></input>
                      </>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="images"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <label for="images">Product Images: </label>{' '}
                        <input
                          // label="IMAGES"
                          onChange={handleChange}
                          type="file"
                          id="images"
                          multiple
                        ></input>
                      </>
                    )}
                  ></Controller>
                </ListItem>{' '}
              </Grid>
            </Grid>
            <br></br>
            <div className={Styles.createModalTitle}>
              <Button variant="contained" type="submit">
                {loadingState ? <CircularProgress /> : `Add Product`}{' '}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();

  let products = await Product.find({}).lean();
  let brands = await Brand.find({}).lean();

  const allProducts = JSON.parse(JSON.stringify(products));
  const allBrands = JSON.parse(JSON.stringify(brands));
  await db.disconnect();

  return {
    props: {
      products: allProducts,
      brands: allBrands,
    },
  };
}

export default AdminProducts;
