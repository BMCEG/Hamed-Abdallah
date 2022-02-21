import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Modal,
} from '@material-ui/core';
import React, { useState } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../../utils/db';
import MaterialTable from 'material-table';
import tableIcons from '../../components/MaterialTableIcons';
import axios from 'axios';
import Brand from '../../models/Brand';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

function AdminBrands(props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { brands } = props;

  const columns = [
    {
      title: 'Brand Logo',
      field: 'logo',
      render: (rowData) => (
        <Image
          className={Styles.logo_image}
          alt={rowData.name}
          src={rowData.logo}
          width={152.5}
          height={87.5}
        />
      ),
    },
    {
      title: 'Brand Name',
      field: 'name',
    },
    {
      title: 'Created On',
      field: 'createdAt',
    },
    {
      title: 'Actions',
      field: '',
      render: (rowData) => (
        <Button variant="contained" href={`/admin/brands/${rowData._id}`}>
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
  const submitHandler = async ({ name, image }) => {
    closeSnackbar();

    const formData = new FormData();
    formData.append('id', 'brands');
    formData.append('file', logoImage);

    const img = await axios.post('/api/images/index2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const brand = await axios
      .post(`/api/admin/brands/create`, {
        name,
        logo: img.data.url,
      })
      .then((res) => {
        enqueueSnackbar(`${name} has been uploaded successfully`, {
          variant: 'success',
        });

        window.location.reload();
      })
      .catch((err) => {
        enqueueSnackbar(err, {
          variant: 'error',
        });
      });
  };

  const handleChange = (event) => {
    setLogoImage(event.target.files[0]);
  };

  return (
    <div className={Styles.container}>
      <Grid container>
        <Grid item md={1}>
          <Button onClick={toggleDrawer(true)}>
            <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
          </Button>
          <Drawer anchor={'left'} open={isOpened} onClose={toggleDrawer(false)}>
            <Box className={Styles.box}>
              <List>
                <ListItem>
                  <Image
                    alt="Hamed Abdallah"
                    src={'/Hamed-logo-Fullcolor.png'}
                    width={152.5}
                    height={87.5}
                  />
                </ListItem>
                <hr></hr>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin">
                    DASHBOARD
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/products">
                    PRODUCTS
                  </Button>
                </ListItem>
                <ListItem selected>
                  <Button className={Styles.boxButton} href="/admin/brands">
                    BRANDS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/orders">
                    ORDERS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/returns">
                    RETURNS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/contacts">
                    CONTACTS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/users">
                    USERS
                  </Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Grid>
        <Grid item md={11} className={Styles.layout}>
          <Typography variant="h4" component="h4">
            Brands
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={brands}
              actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: 'Delete Brand',
                  onClick: async (event, rowData) => {
                    await axios.post(`/api/admin/brands/delete`, {
                      _id: rowData._id,
                    });
                    alert('Brand has been deleted successfully');
                    window.location.reload();
                  },
                },
                {
                  icon: tableIcons.Add,
                  tooltip: 'Add Brand',
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
            Create New Brand
          </Typography>
          <br></br>
          <form
            onSubmit={handleSubmit(submitHandler)}
            encType="multipart/form-data"
          >
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
                  name="image"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input onChange={handleChange} type="file"></input>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <div className={Styles.createModalTitle}>
                  <Button type="submit" variant="contained">
                    Add Brand
                  </Button>
                </div>
              </ListItem>
            </List>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();

  let brands = await Brand.find({}).lean();

  const allBrands = JSON.parse(JSON.stringify(brands));
  await db.disconnect();

  return {
    props: {
      brands: allBrands,
    },
  };
}

export default AdminBrands;
