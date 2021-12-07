import Image from 'next/image';
import Styles from '../styles/components/nav.module.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Cookies from 'js-cookie';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Store } from '../utils/Store';
import { Badge, MenuItem, Menu } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '@mui/material';

const HamedAbdallahNav = () => {
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
        <Toolbar className={Styles.toolbar}>
          <Button color="inherit" href="/">
            <Image
              src="/Hamed-logo-White.png"
              alt="Vercel Logo"
              width={152}
              height={82}
            />
          </Button>
          <Button color="inherit" href="/">
            Home
          </Button>
          <Button color="inherit" href="/about">
            About
          </Button>
          <Button color="inherit" href="/shop">
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
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/returns')}>
                  Returns
                </MenuItem>
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/reviews')}>
                  Reviews
                </MenuItem>{' '}
                <MenuItem
                  onClick={(e) => loginMenuCloseHandler(e, '/wishlist')}
                >
                  Wishlist
                </MenuItem>
                {/* <hr></hr> */}
                {userInfo.isAdmin ? (
                  <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/admin')}>
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
      ) : (
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
      )}
    </AppBar>
  );
};

export default dynamic(() => Promise.resolve(HamedAbdallahNav), { ssr: false });
