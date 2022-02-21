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
      render: (rowData) =>
        rowData.isRead ? rowData.shortID : <strong>{rowData.shortID}</strong>,
    },
    {
      title: 'Number of Items',
      field: 'orderItems',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.orderItems.length
        ) : (
          <strong>{rowData.orderItems.length}</strong>
        ),
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
      title: 'Discount Value',
      field: 'discountValue',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.discountValue
        ) : (
          <strong>{rowData.discountValue}</strong>
        ),
    },
    {
      title: 'Shipping Price',
      field: 'shippingPrice',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.shippingPrice
        ) : (
          <strong>{rowData.shippingPrice}</strong>
        ),
    },
    {
      title: 'VAT',
      field: 'vat',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? rowData.vat : <strong>{rowData.vat}</strong>,
    },
    {
      title: 'Total Price',
      field: 'totalPrice',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          rowData.totalPrice
        ) : (
          <strong>{rowData.totalPrice}</strong>
        ),
    },
    {
      title: 'Order Status',
      field: 'status',
      // type: 'boolean',
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
      title: 'Date Delivered',
      field: 'deliveredAt',
      type: 'numeric',
      render: (rowData) =>
        rowData.isRead ? (
          <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.deliveredAt}</Moment>
        ) : (
          <strong>
            <Moment format="dddd DD/MM/YYYY hh:ss">
              {rowData.deliveredAt}
            </Moment>
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
  let allOrders = JSON.parse(JSON.stringify(orders));
  allOrders = allOrders.filter((order) => {
    return order.status !== 'returnPending' && order.status !== 'returned';
  });
  await db.disconnect();

  return {
    props: {
      orders: allOrders,
    },
  };
}

export default AdminOrders;
