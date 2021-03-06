import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import db from '../../utils/db';
import MaterialTable from 'material-table';
import tableIcons from '../../components/MaterialTableIcons';
import axios from 'axios';
import User from '../../models/User';
import { Store } from '../../utils/Store';
import { HamedAbdallahAdminDrawer } from '../../components';

function AdminUsers(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { users } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const columns = [
    {
      title: 'Name',
      field: 'name',
    },
    // {title: 'Return Type'}
    // {
    //   title: 'Number of Items',
    //   field: 'orderItems',
    //   render: (rowData) => rowData.orderItems.length,
    // },
    { title: 'Email', field: 'email' },
    { title: 'Mobile Number', field: 'mobile' },
    { title: 'is Admin', field: 'isAdmin', type: 'boolean' },
    // { title: 'Shipping Phone', field: 'shippingAddress.phone' },
    // { title: 'Items Price', field: 'itemsPrice', type: 'numeric' },

    // { title: 'Return Status', field: 'returnStatus' },
    // { title: 'Date Created', field: 'createdAt', type: 'numeric' },
    // {
    //   title: 'Date Returned',
    //   field: 'returnedAt',
    //   type: 'numeric',
    // },
    {
      title: 'Actions',
      field: '',
      render: (rowData) => (
        <Button variant="contained" onClick={() => adminHandler(rowData._id)}>
          Make Admin
        </Button>
      ),
    },
  ];

  const adminHandler = async (userID) => {
    await axios
      .post(
        `/api/admin/users/admin`,
        {
          userID,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
            Users
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={users}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();

  let users = await User.find({}).lean();

  const allUsers = JSON.parse(JSON.stringify(users));
  await db.disconnect();

  return {
    props: {
      users: allUsers,
    },
  };
}

export default AdminUsers;
