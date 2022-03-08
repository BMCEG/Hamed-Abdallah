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
  CircularProgress,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../../utils/db';
import MaterialTable from 'material-table';
import tableIcons from '../../components/MaterialTableIcons';
import axios from 'axios';
import Offer from '../../models/Offer';
import { Store } from '../../utils/Store';
import { HamedAbdallahAdminDrawer } from '../../components';
import Moment from 'react-moment';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

function AdminOffers(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { offers } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [loadingState, setLoadingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const columns = [
    { title: 'Name', field: 'name' },
    {
      title: 'Value',
      field: 'value',
      render: (rowData) => <>{rowData.value}% Off</>,
    },
    {
      title: 'Start Date',
      field: 'startDate',
      render: (rowData) => (
        <Moment
          format="dddd DD MMM
       YYYY"
        >
          {rowData.startDate}
        </Moment>
      ),
    },
    {
      title: 'End Date',
      field: 'endDate',
      render: (rowData) => (
        <Moment
          format="dddd DD MMM
       YYYY"
        >
          {rowData.endDate}
        </Moment>
      ),
    },
  ];

  const submitHandler = async ({ name, value, startDate, endDate }) => {
    closeSnackbar();
    setLoadingState(true);

    const offer = await axios
      .post(`/api/admin/offers/create`, {
        name,
        value,
        startDate,
        endDate,
      })
      .then((res) => {
        enqueueSnackbar(`Offer ${name} has been created successfully`, {
          variant: 'success',
        });
        setLoadingState(false);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
            Offers
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={offers}
              actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: 'Delete Offer',
                  onClick: async (event, rowData) => {
                    await axios
                      .post(`/api/admin/offers/delete`, {
                        _id: rowData._id,
                      })
                      .then((res) => {
                        enqueueSnackbar(`Offer has been deleted successfully`, {
                          variant: 'success',
                        });
                      });
                    window.location.reload();
                  },
                },
                {
                  icon: tableIcons.Add,
                  tooltip: 'Add Offer',
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
        className={Styles.modal}
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
            Create New Offer
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
                      name="startDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="startDate"
                          label="Start Date"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ type: 'date' }}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={6} xs={12}>
                <List>
                  <ListItem>
                    <Controller
                      name="value"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="value"
                          label="Value"
                          inputProps={{ type: 'Number' }}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>{' '}
                  <ListItem>
                    <Controller
                      name="endDate"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="endDate"
                          label="End Date"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ type: 'date' }}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            <br></br>
            <div className={Styles.createModalTitle}>
              <Button variant="contained" type="submit">
                {loadingState ? <CircularProgress /> : `Add Offer`}{' '}
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

  let offers = await Offer.find({}).lean();

  const allOffers = JSON.parse(JSON.stringify(offers));
  await db.disconnect();

  return {
    props: {
      offers: allOffers,
    },
  };
}

export default AdminOffers;
