import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../../utils/Store';
import db from '../../../utils/db';
import { useMediaQuery } from '@mui/material';
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
  ListItem,
  Typography,
  Drawer,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

import Styles from '../../../styles/pages/admin/order.module.css';
import User from '../../../models/User';

export default function BrandScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { user } = props;

  if (!user) {
    return (
      <div>
        <h1> User not found</h1>
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

  const returnStatusHandler = async () => {
    await axios
      .post(
        `/api/admin/returns/status`,
        {
          returnID: returnObj._id,
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
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={6} xs={12}></Grid>
            </Grid>
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
  const rawUser = await User.findById({ _id: id }).lean();
  const user = JSON.parse(JSON.stringify(rawUser));

  await db.disconnect();

  return {
    props: {
      user,
    },
  };
}
