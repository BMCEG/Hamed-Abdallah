import Image from 'next/image';
import Styles from '../styles/components/nav.module.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Cookies from 'js-cookie';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Store } from '../utils/Store';
import { Badge, MenuItem, Menu } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Marquee from 'react-fast-marquee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import HamedAbdallahCounter from './HamedAbdallahCounter';

const DynamicComponentWithNoSSR = dynamic(
  () => import('./HamedAbdallahCounter'),
  { ssr: false }
);

const HamedAbdallahNav = () => {
  const [validOffer, setValidOffer] = useState({});
  const [validOfferFlag, setValidOfferFlag] = useState(false);

  useEffect(async () => {
    await axios
      .get(`/api/offers/valid`)
      .then((res) => {
        if (res.status === 200) {
          setValidOffer(res.data.validOffer[0]);
          setValidOfferFlag(res.data.validOfferFlag);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBurgerEl, setAnchorBurgerEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const burgerClickHandler = (e) => {
    setAnchorBurgerEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect && redirect !== 'backdropClick') {
      router.push(redirect);
    }
  };
  const burgerCloseHandler = (e, redirect) => {
    setAnchorBurgerEl(null);
    if (redirect && redirect !== 'backdropClick') {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };

  const matches = useMediaQuery('(min-width:1024px');

  return (
    <AppBar position="static" className={Styles.nav}>
      {matches ? (
        <>
          <Toolbar className={Styles.toolbar}>
            <Button color="inherit" href="/">
              <Image
                src="/Hamed-logo-White.png"
                alt="Vercel Logo"
                width={76}
                height={41}
              />
            </Button>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/about">
              About
            </Button>
            <Button className={Styles.shopBtn} color="inherit" href="/shop">
              Shop
            </Button>
            <Button color="inherit" href="/contact">
              Contact Us
            </Button>

            <Button href="/cart">
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  <FontAwesomeIcon
                    style={{ color: 'white ' }}
                    icon={faShoppingBag}
                    size="2x"
                  />
                </Badge>
              ) : (
                // 'Cart'
                <FontAwesomeIcon
                  style={{ color: 'white ' }}
                  icon={faShoppingBag}
                  size="2x"
                />
                // <FontAwesomeIcon icon={faShoppingBag} />
              )}
            </Button>
            {userInfo ? (
              <>
                <Button
                  color="inherit"
                  aria-controls="simple-menu"
                  onClick={loginClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  {/* <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>
                  Profile
                </MenuItem> */}
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/order-history')}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/returns')}
                  >
                    Returns
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/reviews')}
                  >
                    Reviews
                  </MenuItem>{' '}
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/wishlist')}
                  >
                    Wishlist
                  </MenuItem>
                  {/* <hr></hr> */}
                  {userInfo.isAdmin ? (
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/admin')}
                    >
                      Admin
                    </MenuItem>
                  ) : null}
                  <hr></hr>
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button href="/login">
                <FontAwesomeIcon
                  style={{ color: 'white' }}
                  icon={faUser}
                  size="2x"
                />
              </Button>
            )}
          </Toolbar>
          {validOfferFlag ? (
            <div className={Styles.belowNav}>
              <div className={Styles.belowNavContainer}>
                <Marquee speed={70} gradientWidth={10} style={{ width: '50%' }}>
                  <Typography component="h6" className={Styles.belowNavText}>
                    Don't miss our special{' '}
                    <strong style={{ marginLeft: 5, marginRight: 5 }}>
                      {validOffer.name}
                    </strong>{' '}
                    offer!
                  </Typography>
                </Marquee>
                <div className={Styles.belowNavCounter}>
                  <HamedAbdallahCounter date={validOffer.endDate} />
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <Toolbar className={Styles.toolbarMob}>
            <Button color="inherit" href="/">
              <Image
                src="/Hamed-logo-White.png"
                alt="Vercel Logo"
                width={76}
                height={41}
              />
            </Button>
            <div className={Styles.mobNavRight}>
              <Button href="/cart">
                {cart.cartItems.length > 0 ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
                    <FontAwesomeIcon
                      style={{ color: 'white ' }}
                      icon={faShoppingBag}
                      size="2x"
                    />
                  </Badge>
                ) : (
                  // 'Cart'
                  <FontAwesomeIcon
                    style={{ color: 'white ' }}
                    icon={faShoppingBag}
                    size="2x"
                  />
                  // <FontAwesomeIcon icon={faShoppingBag} />
                )}
              </Button>
              {userInfo ? (
                <>
                  <Button
                    color="inherit"
                    aria-controls="simple-menu"
                    onClick={loginClickHandler}
                  >
                    <FontAwesomeIcon
                      style={{ color: 'white' }}
                      icon={faUser}
                      size="2x"
                    />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    {/* <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                    Profile
                  </MenuItem> */}
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/returns')}
                    >
                      Returns
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/reviews')}
                    >
                      Reviews
                    </MenuItem>{' '}
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/wishlist')}
                    >
                      Wishlist
                    </MenuItem>
                    {/* <hr></hr> */}
                    {userInfo.isAdmin ? (
                      <MenuItem
                        onClick={(e) => loginMenuCloseHandler(e, '/admin')}
                      >
                        Admin
                      </MenuItem>
                    ) : null}
                    <hr></hr>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button href="/login">
                  <FontAwesomeIcon
                    style={{ color: 'white' }}
                    icon={faUser}
                    size="2x"
                  />
                </Button>
              )}
              <Menu
                id="simple-menu"
                anchorEl={anchorBurgerEl}
                keepMounted
                open={Boolean(anchorBurgerEl)}
                onClose={burgerCloseHandler}
              >
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/')}>
                  Home
                </MenuItem>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/about')}>
                  About
                </MenuItem>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/shop')}>
                  Shop
                </MenuItem>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/contact')}>
                  Contact Us
                </MenuItem>{' '}
              </Menu>
              <Button onClick={burgerClickHandler}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ color: 'white' }}
                  size="2x"
                />
              </Button>
            </div>
          </Toolbar>
          {validOfferFlag ? (
            <div className={Styles.belowNavMob}>
              <div className={Styles.belowNavContainerMob}>
                <Marquee speed={45} gradientWidth={10}>
                  <Typography component="h6" className={Styles.belowNavTextMob}>
                    Don't miss our special{' '}
                    <strong style={{ marginLeft: 2, marginRight: 2 }}>
                      {validOffer.name}
                    </strong>{' '}
                    offer!
                  </Typography>
                </Marquee>
                <div className={Styles.belowNavCounterMob}>
                  <HamedAbdallahCounter date={validOffer.endDate} />
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </AppBar>
  );
};

export default dynamic(() => Promise.resolve(HamedAbdallahNav), { ssr: false });
