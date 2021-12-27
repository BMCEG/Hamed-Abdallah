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
import Return from '../../../models/Return';

export default function BrandScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { returnObj } = props;

  if (!returnObj) {
    return (
      <div>
        <h1> Order not found</h1>
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
              <Grid item md={4} xs={12}>
                <List>
                  <ListItem>
                    <Card className={Styles.card}>
                      <List>
                        <ListItem>
                          <Typography variant="h4" component="h4">
                            Return Details:
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            User Name: {returnObj.user.name}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Return Status: {returnObj.returnStatus}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Payment Method: {returnObj.paymentMethod}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Is Returned:{' '}
                            {returnObj.isReturned ? 'True' : 'False'}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Return Created At:{' '}
                            <Moment format="dddd DD MMM YYYY">
                              {returnObj.createdAt}
                            </Moment>
                          </Typography>
                        </ListItem>
                        <hr></hr>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Cart Price: {returnObj.itemsPrice} EGP
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Button
                            variant="contained"
                            onClick={returnStatusHandler}
                          >
                            Change Return Status
                          </Button>
                        </ListItem>
                      </List>
                    </Card>
                  </ListItem>
                  <ListItem>
                    <Card className={Styles.card}>
                      <List>
                        <ListItem>
                          <Typography variant="h4" component="h4">
                            Shipping Details:
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Name: {returnObj.shippingAddress.fullName}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Mobile Number: {returnObj.shippingAddress.phone}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Address: {returnObj.shippingAddress.address}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            City: {returnObj.shippingAddress.city}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Postal Code: {returnObj.shippingAddress.postalCode}
                          </Typography>
                        </ListItem>
                        {/* </ListItem> */}
                      </List>
                    </Card>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={8} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {returnObj.order.orderItems.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>
                            <Button
                              variant="text"
                              href={`/product/${item.slug}`}
                            >
                              <Image
                                src={`${item.featuredImage}`}
                                alt={item.name}
                                width={152.5}
                                height={87.5}
                              />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="text"
                              href={`/product/${item.slug}`}
                            >
                              <Typography>{item.name}</Typography>
                            </Button>
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{item.price} EGP</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
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
  const rawReturn = await Return.findById({ _id: id })
    .lean()
    .populate('user order');
  const returnObj = JSON.parse(JSON.stringify(rawReturn));

  //   const rawBrandProducts = await Product.find({ brand: id }).lean();
  //   const brandProducts = JSON.parse(JSON.stringify(rawBrandProducts));

  await db.disconnect();

  return {
    props: {
      returnObj,
    },
  };
}
