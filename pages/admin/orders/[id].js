import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../../utils/Store';
import db from '../../../utils/db';
import { ReactPhotoCollage } from 'react-photo-collage';
import { useMediaQuery } from '@mui/material';
import tableIcons from '../MaterialTableIcons';
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
  TextField,
  ListItem,
  Typography,
  Select,
  MenuItem,
  Switch,
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
import {
  faShoppingBag,
  faHeart,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import Styles from '../../../styles/pages/admin/order.module.css';
import MaterialTable from 'material-table';
import Order from '../../../models/Order';

export default function BrandScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { order } = props;

  if (!order) {
    return (
      <div>
        <h1>Order not found</h1>
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

  const paidStatusHandler = async () => {
    await axios
      .post(
        `/api/admin/orders/paid`,
        {
          orderID: order._id,
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
  const deliveredStatusHandler = async () => {
    await axios
      .post(
        `/api/admin/orders/delivered`,
        {
          orderID: order._id,
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

  const onSubmitHandler = async () => {
    const editedBrand = await axios
      .post(
        `/api/admin/orders/edit`,
        {
          orderID: order._id,
          //   editedName,
          //   brandProducts,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((res) => {
        alert('Successfully edited');
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
                            Order Details:
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            User Name: {order.user.name}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Payment Method: {order.paymentMethod}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Is Paid: {order.isPaid ? 'True' : 'False'}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Is Delivered: {order.isDelivered ? 'True' : 'False'}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Order Created At:{' '}
                            <Moment format="dddd DD MMM YYYY">
                              {order.createdAt}
                            </Moment>
                          </Typography>
                        </ListItem>
                        <hr></hr>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Cart Price: {order.itemsPrice} EGP
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Shipping Price: {order.shippingPrice} EGP
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Total Price: {order.totalPrice} EGP
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                              <Button
                                variant="contained"
                                onClick={paidStatusHandler}
                              >
                                Change Paid Status
                              </Button>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Button
                                variant="contained"
                                onClick={deliveredStatusHandler}
                              >
                                Change Delivered Status
                              </Button>
                            </Grid>
                          </Grid>
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
                            Name: {order.shippingAddress.fullName}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Mobile Number: {order.shippingAddress.phone}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Address: {order.shippingAddress.address}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            City: {order.shippingAddress.city}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            Postal Code: {order.shippingAddress.postalCode}
                          </Typography>
                        </ListItem>
                        {/* </ListItem> */}
                      </List>
                    </Card>
                  </ListItem>
                </List>
                {/* <Image
                  className={Styles.featuredImage}
                  alt={brand.name}
                  src={`/uploads/${brand.logo}`}
                  width={350}
                  height={350}
                /> */}
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
                      {order.orderItems.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell>
                            <Button
                              variant="text"
                              href={`/product/${item.slug}`}
                            >
                              <Image
                                src={`/uploads/products/${item.featuredImage}`}
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
  const rawOrder = await Order.findById({ _id: id }).lean().populate('user');
  const order = JSON.parse(JSON.stringify(rawOrder));

  //   const rawBrandProducts = await Product.find({ brand: id }).lean();
  //   const brandProducts = JSON.parse(JSON.stringify(rawBrandProducts));

  await db.disconnect();

  return {
    props: {
      order,
    },
  };
}
