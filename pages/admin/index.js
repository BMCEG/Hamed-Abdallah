import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '../../utils/Store';
import Moment from 'react-moment';

export default function Index() {
  const [isOpened, setIsOpened] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

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
                <ListItem selected>
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
            Dashboard
          </Typography>
          <hr></hr>
          <Typography
            style={{ textAlign: 'right', marginRight: '50px' }}
            variant="h5"
            component="h5"
          >
            Hello {userInfo ? userInfo.name : 'User'}
          </Typography>{' '}
          <Typography
            style={{ textAlign: 'right', marginRight: '50px' }}
            variant="h6"
            component="h6"
          >
            <Moment format="dddd DD MMM YYYY" />
            <br></br>
            <Moment format="hh:mm:ss" />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
