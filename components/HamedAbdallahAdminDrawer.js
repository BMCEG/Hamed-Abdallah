import { Button, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Styles from '../styles/components/drawer.module.css';
import Image from 'next/image';
export default function HamedAbdallahAdminDrawer() {
  return (
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
        <ListItem>
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
        <ListItem>
          <Button className={Styles.boxButton} href="/admin/offers">
            Offers
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
