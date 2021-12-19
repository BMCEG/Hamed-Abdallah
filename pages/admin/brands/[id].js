import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../../utils/Store';
import db from '../../../utils/db';
// import Product from '../../../models/Product';
import Brand from '../../../models/Brand';
import { ReactPhotoCollage } from 'react-photo-collage';
import { useMediaQuery } from '@mui/material';
import tableIcons from '../MaterialTableIcons';
import Moment from 'react-moment';

import {
  HamedAbdallahAdminDrawer,
  HamedAbdallahWhiteSpace,
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

import Styles from '../../../styles/pages/admin/brand.module.css';
import Product from '../../../models/Product';
import MaterialTable from 'material-table';

export default function BrandScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { brand, brandProducts } = props;

  if (!brand) {
    return (
      <div>
        <h1>Brand not found</h1>
      </div>
    );
  }
  const fileInput = React.useRef();
  const filesInput = React.useRef();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpened(open);
  };

  const [editedName, setEditedName] = useState(brand.name);

  const columns = [
    {
      title: 'Image',
      field: '_id',
      render: (rowData) => (
        <img
          src={`/uploads/products/${rowData.images[0]}`}
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

  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'editedName':
        return setEditedName(e.target.value);
    }
  };

  const onSubmitHandler = async () => {
    const editedBrand = await axios
      .post(
        `/api/admin/brands/edit`,
        {
          brandID: brand._id,
          editedName,
          brandProducts,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((res) => {
        alert('Successfully edited');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
              <Grid item md={4} xs={12}>
                <Image
                  className={Styles.featuredImage}
                  alt={brand.name}
                  src={`/uploads/${brand.logo}`}
                  width={350}
                  height={350}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <List>
                  <ListItem>
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
                  <ListItem>
                    <Grid container spacing={2}>
                      <Grid item md={6} xs={12}>
                        <Button variant="contained" fullWidth>
                          Change Brand Image
                        </Button>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Button
                          variant="contained"
                          onClick={onSubmitHandler}
                          fullWidth
                        >
                          Edit Brand
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <br></br>
            <div>
              <MaterialTable
                className={Styles.table}
                title="Table"
                icons={tableIcons}
                columns={columns}
                data={brandProducts}
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
            <HamedAbdallahWhiteSpace />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  await db.connect();
  const rawBrand = await Brand.findById({ _id: id }).lean();
  const brand = JSON.parse(JSON.stringify(rawBrand));

  const rawBrandProducts = await Product.find({ brand: id }).lean();
  const brandProducts = JSON.parse(JSON.stringify(rawBrandProducts));

  await db.disconnect();

  return {
    props: {
      brand,
      brandProducts,
    },
  };
}
