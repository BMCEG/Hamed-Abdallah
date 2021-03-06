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
import Contact from '../../models/Contact';
import { Store } from '../../utils/Store';
import { HamedAbdallahAdminDrawer } from '../../components';
import Moment from 'react-moment';

function AdminUsers(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { contacts } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const columns = [
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'E-Mail', field: 'email' },
    { title: 'Mobile Number', field: 'mobile' },
    { title: 'Message', field: 'message' },
    {
      title: 'Date',
      field: 'createdAt',
      render: (rowData) => (
        <Moment format="dddd DD/MM/YYYY hh:ss">{rowData.createdAt}</Moment>
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
            Contacts
          </Typography>
          <br></br>
          <div>
            <MaterialTable
              className={Styles.table}
              title="Table"
              icons={tableIcons}
              columns={columns}
              data={contacts}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();

  let contacts = await Contact.find({}).lean();

  const allContacts = JSON.parse(JSON.stringify(contacts));
  await db.disconnect();

  return {
    props: {
      contacts: allContacts,
    },
  };
}

export default AdminUsers;
