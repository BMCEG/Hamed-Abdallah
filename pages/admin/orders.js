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
import DataTable from 'react-data-table-component';
import db from '../../utils/db';
import Order from '../../models/Order';
import MaterialTable from 'material-table';
import tableIcons from '../../components/MaterialTableIcons';
import axios from 'axios';
import Moment from 'react-moment';
import User from '../../models/User';

function AdminOrders(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { orders } = props;

  const columns = [
    {
      title: 'Order ID',
      field: 'shortID',
    },
    {
      title: 'Number of Items',
      field: 'orderItems',
      render: (rowData) => rowData.orderItems.length,
    },
    { title: 'User', field: 'user.name' },
    { title: 'Shipping Name', field: 'shippingAddress.fullName' },
    { title: 'Shipping Address', field: 'shippingAddress.address' },
    { title: 'Shipping Phone', field: 'shippingAddress.phone' },
    { title: 'Items Price', field: 'itemsPrice', type: 'numeric' },
    { title: 'Discount Value', field: 'discountValue', type: 'numeric' },
    { title: 'Shipping Price', field: 'shippingPrice', type: 'numeric' },
    { title: 'VAT', field: 'vat', type: 'numeric' },
    { title: 'Total Price', field: 'totalPrice', type: 'numeric' },
    { title: 'Is Paid', field: 'isPaid', type: 'boolean' },
    {
      title: 'Date Created',
      field: 'createdAt',
      type: 'numeric',
      render: (rowData) => (
        <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.createdAt}</Moment>
      ),
    },
    {
      title: 'Date Delivered',
      field: 'deliveredAt',
      type: 'numeric',
      render: (rowData) => (
        <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.deliveredAt}</Moment>
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
    // {
    //   title: 'Actions',
    //   field: '',
    //   render: (rowData) => (
    //     <Button variant="contained" href={`/product/${rowData.slug}`}>
    //       Details
    //     </Button>
    //   ),
    // },
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
            <Box className={Styles.box}>
              <List>
                <ListItem>
                  <Image
                    alt="Hamed Abdallah"
                    src={'/Hamed-logo-Fullcolor.png'}
                    width={152.5}
                    height={175}
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
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/brands">
                    BRANDS
                  </Button>
                </ListItem>
                <ListItem selected>
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
            Orders
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={orders}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  let orders = await Order.find({})
    .lean()
    .populate({ path: 'user', Model: User });
  console.log(orders);
  const allOrders = JSON.parse(JSON.stringify(orders));
  await db.disconnect();

  return {
    props: {
      orders: allOrders,
    },
  };
}

export default AdminOrders;
