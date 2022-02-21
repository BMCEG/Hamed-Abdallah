import {
  Button,
  Box,
  List,
  ListItem,
  Drawer,
  Grid,
  Typography,
  Card,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import React, { useState, useContext } from 'react';
import Styles from '../../styles/pages/admin/dashboard.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '../../utils/Store';
import Moment from 'react-moment';
import db from '../../utils/db.js';
import Order from '../../models/Order';
import User from '../../models/User';
import Product from '../../models/Product';

function Dashboard(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const { orders, returns, lowStockProducts } = props;

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
          <br></br>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item md={4} xs={12}>
              <Card className={Styles.newOrdersCard}>
                <Typography variant="h5" component="h5">
                  New Orders:
                </Typography>
                <div className={Styles.newOrdersCount}>
                  <Typography
                    style={{ fontWeight: '800' }}
                    variant="h1"
                    component="h1"
                  >
                    {orders.length}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {orders.length === 1 ? 'Unread Order' : `Unread Orders`}
                  </Typography>
                  <br></br>
                  <Table style={{ width: '100%' }}>
                    <TableHead>
                      <TableCell>Order ID</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Link</TableCell>
                    </TableHead>
                    {orders.length > 0 ? (
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow>
                            <TableCell>{order.shortID}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.totalPrice} EGP</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                href={`/admin/orders/${order._id}`}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : null}
                  </Table>
                </div>
              </Card>
            </Grid>
            {/* Centre Column */}
            <Grid item md={4} xs={12}>
              <Card className={Styles.newOrdersCard}>
                <Typography variant="h5" component="h5">
                  New Returns:
                </Typography>
                <div className={Styles.newOrdersCount}>
                  <Typography
                    style={{ fontWeight: '800' }}
                    variant="h1"
                    component="h1"
                  >
                    {returns.length}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {returns.length === 1 ? 'Unread Order' : `Unread Orders`}
                  </Typography>
                  <br></br>
                  <Table style={{ width: '100%' }}>
                    <TableHead>
                      <TableCell>Order ID</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Link</TableCell>
                    </TableHead>
                    {returns.length > 0 ? (
                      <TableBody>
                        {returns.map((order) => (
                          <TableRow>
                            <TableCell>{order.shortID}</TableCell>
                            <TableCell>{order.user.name}</TableCell>
                            <TableCell>{order.totalPrice} EGP</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                href={`/admin/orders/${order._id}`}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : null}
                  </Table>
                </div>
              </Card>
            </Grid>
            {/* Right Column */}
            <Grid item md={4} xs={12}>
              <Card className={Styles.newOrdersCard}>
                <Typography variant="h5" component="h5">
                  Products Low on Stock:
                </Typography>
                <div className={Styles.newOrdersCount}>
                  <Typography
                    style={{ fontWeight: '800' }}
                    variant="h1"
                    component="h1"
                  >
                    {lowStockProducts.length}
                  </Typography>
                  <Typography variant="h5" component="h5">
                    {lowStockProducts.length === 1 ? 'Product' : `Products`}
                  </Typography>
                  <br></br>
                  <Table style={{ width: '100%' }}>
                    <TableHead>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Link</TableCell>
                    </TableHead>
                    {lowStockProducts.length > 0 ? (
                      <TableBody>
                        {lowStockProducts.map((prod) => (
                          <TableRow>
                            <TableCell>{prod.name}</TableCell>
                            <TableCell>{prod.price}</TableCell>
                            <TableCell>{prod.stock}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                href={`/admin/products/${prod.slug}`}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : null}
                  </Table>
                </div>
              </Card>
            </Grid>
          </Grid>
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
  let unreadOrders = orders.filter(
    (order) =>
      order.isRead === false &&
      order.status !== 'returnPending' &&
      order.status !== 'returned'
  );
  const allOrders = JSON.parse(JSON.stringify(unreadOrders));

  let unreadReturns = orders.filter(
    (order) =>
      (order.isRead === false && order.status === 'returnPending') ||
      order.status === 'returned'
  );
  const allReturns = JSON.parse(JSON.stringify(unreadReturns));

  let products = await Product.find({ stock: { $lte: 2 } });
  let lowStockProducts = JSON.parse(JSON.stringify(products));
  console.log(lowStockProducts);
  await db.disconnect();

  return {
    props: {
      returns: allReturns,
      orders: allOrders,
      lowStockProducts: lowStockProducts,
    },
  };
}

export default Dashboard;
