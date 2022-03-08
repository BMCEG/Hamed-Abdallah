import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  Typography,
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
// import Return from '../../models/Return';
import Order from '../../models/Order';
import User from '../../models/User';
import Moment from 'react-moment';
import { HamedAbdallahAdminDrawer } from '../../components';

function AdminReturns(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { returns } = props;

  const columns = [
    {
      title: 'Order ID',
      field: 'shortID',
      render: (rowData) =>
        rowData.isRead ? rowData.shortID : <strong>{rowData.shortID}</strong>,
    },
    {
      title: 'User',
      field: 'user.name',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.user.name
        ) : (
          <strong>{rowData.user.name}</strong>
        ),
    },
    {
      title: 'Shipping Name',
      field: 'shippingAddress.fullName',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.shippingAddress.fullName
        ) : (
          <strong>{rowData.shippingAddress.fullName}</strong>
        ),
    },
    {
      title: 'Shipping Address',
      field: 'shippingAddress.address1',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.shippingAddress.address1
        ) : (
          <strong>{rowData.shippingAddress.address1}</strong>
        ),
    },
    {
      title: 'Shipping City',
      field: 'shippingAddress.city',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.shippingAddress.city
        ) : (
          <strong>{rowData.shippingAddress.city}</strong>
        ),
    },
    {
      title: 'Shipping Phone',
      field: 'shippingAddress.phone',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.shippingAddress.phone
        ) : (
          <strong>{rowData.shippingAddress.phone}</strong>
        ),
    },
    {
      title: 'Items Price',
      field: 'itemsPrice',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.itemsPrice
        ) : (
          <strong>{rowData.itemsPrice}</strong>
        ),
    },

    {
      title: 'Return Status',
      field: 'status',
      render: (rowData) =>
        rowData.isRead ? rowData.status : <strong>{rowData.status}</strong>,
    },
    {
      title: 'Date Created',
      field: 'createdAt',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.createdAt}</Moment>
        ) : (
          <strong>
            <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.createdAt}</Moment>
          </strong>
        ),
    },
    {
      title: 'Actions',
      field: '',
      render: (rowData) => (
        <Button variant="contained" href={`/admin/orders/${rowData._id}`}>
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
            Returns
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={returns}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  let returns = await Order.find({})
    .lean()
    .populate({ path: 'user', Model: User });
  let allReturns = JSON.parse(JSON.stringify(returns));
  allReturns = allReturns.filter((order) => {
    return order.status === 'returnPending' || order.status === 'returned';
  });
  await db.disconnect();

  return {
    props: {
      returns: allReturns,
    },
  };
}
export default AdminReturns;
