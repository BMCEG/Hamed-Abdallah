import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Store } from '../../../utils/Store';
import db from '../../../utils/db';
import { ReactPhotoCollage } from 'react-photo-collage';
import { useMediaQuery } from '@mui/material';
import tableIcons from '../../../components/MaterialTableIcons';
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
import User from '../../../models/User';
import Product from '../../../models/Product';

export default function BrandScreen(props) {
  const matches = useMediaQuery('(min-width:1024px');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isOpened, setIsOpened] = useState(false);
  const [note, setNote] = useState('');

  const router = useRouter();
  const { id } = router.query;
  const { order } = props;
  const [status, setStatus] = useState(order.status);
  const [isPaid, setIsPaid] = useState(order.isPaid);
  const [isRead, setIsRead] = useState(order.isRead);

  const handlePaymentChange = async (event) => {
    setIsPaid(event.target.checked);
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
        // window.location.reload();
        enqueueSnackbar('Order payment Status changed successfully', {
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  const handleReadChange = async (event) => {
    setIsRead(event.target.checked);
    await axios
      .post(
        `/api/admin/orders/read`,
        {
          orderID: order._id,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((res) => {
        // window.location.reload();
        enqueueSnackbar('Order read status changed successfully', {
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  if (!order) {
    return (
      <div>
        <h1>Order not found</h1>
      </div>
    );
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpened(open);
  };

  const submitNoteHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/admin/orders/notes',
        {
          userInfo,
          orderID: order._id,
          note,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      enqueueSnackbar('Note added successfully', { variant: 'success' });
      window.location.reload();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  const changeHandler = async (e) => {
    setStatus(e.target.value);

    await axios
      .post(
        `/api/admin/orders/status`,
        {
          orderID: order._id,
          status: e.target.value,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          enqueueSnackbar('Order Status changed successfully', {
            variant: 'success',
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(err.message, { variant: 'error' });
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
                            <strong>User Name:</strong> {order.user.name}
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Payment Method:</strong>{' '}
                            {order.paymentMethod}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Order Created At:</strong>{' '}
                            <Moment format="dddd DD MMM YYYY">
                              {order.createdAt}
                            </Moment>
                          </Typography>
                        </ListItem>
                        {/*  */}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Status:</strong>
                          </Typography>
                          <Select
                            value={status}
                            variant="filled"
                            label="Change Status"
                            fullWidth
                            onChange={changeHandler}
                          >
                            <MenuItem disabled value="none">
                              Change Order Status
                            </MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="processing">Processing</MenuItem>
                            <MenuItem value="shipping">Shipping</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                            <MenuItem value="returnPending">
                              Return Pending
                            </MenuItem>
                            <MenuItem value="returned">Returned</MenuItem>
                          </Select>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Is Paid:</strong>{' '}
                            <Switch
                              checked={isPaid}
                              onChange={handlePaymentChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Is Read:</strong>{' '}
                            <Switch
                              checked={isRead}
                              onChange={handleReadChange}
                              inputProps={{ 'aria-label': 'controlled' }}
                            />
                          </Typography>
                        </ListItem>{' '}
                        <hr></hr>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Cart Price:</strong> {order.itemsPrice} EGP
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Shipping Price:</strong>{' '}
                            {order.shippingPrice} EGP
                          </Typography>
                        </ListItem>{' '}
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong>Total Price:</strong> {order.totalPrice} EGP
                          </Typography>
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
                            <strong> Name:</strong>{' '}
                            {order.shippingAddress.fullName}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong> Mobile Number:</strong>{' '}
                            {order.shippingAddress.phone}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong> Address 1:</strong>{' '}
                            {order.shippingAddress.address1}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong> Address 2:</strong>{' '}
                            {order.shippingAddress.address2}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong> City:</strong> {order.shippingAddress.city}
                          </Typography>{' '}
                        </ListItem>
                        <ListItem>
                          <Typography variant="body1" component="body1">
                            <strong> Postal Code:</strong>{' '}
                            {order.shippingAddress.postalCode}
                          </Typography>
                        </ListItem>
                        {/* </ListItem> */}
                      </List>
                    </Card>
                  </ListItem>
                  <ListItem>
                    <Card className={Styles.card}>
                      <List>
                        <ListItem>
                          <Typography variant="h4" component="h4">
                            Comments:
                          </Typography>
                        </ListItem>
                        {order.notes.map((note, idx) => (
                          <ListItem key={idx}>
                            <div className={Styles.noteBase}>
                              <Typography
                                variant="subtitle1"
                                component="subtitle1"
                              >
                                {note.note}
                              </Typography>
                              <hr></hr>
                              <div className={Styles.noteInfo}>
                                <Typography
                                  variant="subtitle2"
                                  component="subtitle2"
                                >
                                  {note.author}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  component="subtitle2"
                                >
                                  <Moment format="dddd DD/MM/YYYY hh:mm">
                                    {note.date}
                                  </Moment>
                                </Typography>
                              </div>
                            </div>
                          </ListItem>
                        ))}
                        <hr></hr>
                        <ListItem>
                          <TextField
                            variant="filled"
                            fullWidth
                            onChange={(e) => setNote(e.target.value)}
                            id="review"
                            // className={Styles.reviewInput}
                            label="Add Note..."
                            rows={5}
                            multiline
                            inputProps={{
                              maxLength: 500,
                              type: 'text',
                            }}
                          ></TextField>{' '}
                        </ListItem>
                        <ListItem>
                          <Button
                            variant="contained"
                            className={Styles.reviewBtn}
                            onClick={submitNoteHandler}
                          >
                            Add Review
                          </Button>
                        </ListItem>
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
                      {order.orderItems.map((item) => (
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
                          {item.discountedPrice === 0 ? (
                            <TableCell align="right">{item.price}</TableCell>
                          ) : (
                            <TableCell align="right">
                              <div className={Styles.lineThrough}>
                                {item.price}
                              </div>
                              {item.price - item.discountedPrice} EGP
                            </TableCell>
                          )}
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
  const rawOrder = await Order.findById({ _id: id })
    .lean()
    .populate({ path: 'user', Model: User })
    .populate({ path: 'orderItems', Model: Product });
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
