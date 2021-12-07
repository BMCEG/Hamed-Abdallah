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
import tableIcons from './MaterialTableIcons';
import axios from 'axios';
import Return from '../../models/Return';

function AdminReturns(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { returns } = props;

  const columns = [
    {
      title: 'Return ID',
      field: '_id',
    },
    // {title: 'Return Type'}
    // {
    //   title: 'Number of Items',
    //   field: 'orderItems',
    //   render: (rowData) => rowData.orderItems.length,
    // },
    { title: 'User', field: 'user' },
    { title: 'Shipping Address', field: 'shippingAddress.address' },
    { title: 'Shipping Phone', field: 'shippingAddress.phone' },
    { title: 'Items Price', field: 'itemsPrice', type: 'numeric' },

    { title: 'Return Status', field: 'returnStatus' },
    { title: 'Date Created', field: 'createdAt', type: 'numeric' },
    {
      title: 'Date Returned',
      field: 'returnedAt',
      type: 'numeric',
    },
    {
      title: 'Actions',
      field: '',
      render: (rowData) => (
        <Button variant="contained" href={`/product/${rowData.slug}`}>
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
            <Box className={Styles.box}>
              <List>
                <ListItem>
                  <Image
                    alt="Hamed Abdallah"
                    src={'/placeholder1.png'}
                    width={100}
                    height={100}
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
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/orders">
                    ORDERS
                  </Button>
                </ListItem>
                <ListItem selected>
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
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/reviews">
                    REVIEWS
                  </Button>
                </ListItem>
                <ListItem>
                  <Button className={Styles.boxButton} href="/admin/branches">
                    BRANCHES
                  </Button>
                </ListItem>
              </List>
            </Box>
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
              ]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();

  let returns = await Return.find({}).lean();

  const allReturns = JSON.parse(JSON.stringify(returns));
  await db.disconnect();

  return {
    props: {
      returns: allReturns,
    },
  };
}

export default AdminReturns;
