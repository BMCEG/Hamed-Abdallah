import Styles from '../styles/components/footer.module.css';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';
import { useMediaQuery } from '@mui/material';

const HamedAbdallahFooter = () => {
  const matches = useMediaQuery('(min-width:1024px');

  return (
    <div className={Styles.upper}>
      <div className={Styles.root}>
        <div className={Styles.container}>
          {matches ? (
            <>
              {/* <div className={Styles.footer__links}> */}
              <Image
                alt="Hamed Abdallah Logo"
                src="/Hamed-logo-Fullcolor.png"
                width={200}
                height={200}
                priority={true}
                className={Styles.footer__logo}
              />
              {/* </div> */}
              <div className={Styles.vertical__line} />
              <div className={Styles.footer__links}>
                <Button
                  className={Styles.footer__links__btn}
                  href="/"
                  variant="text"
                >
                  Home
                </Button>
                <Button
                  className={Styles.footer__links__btn}
                  href="/about"
                  variant="text"
                >
                  About Us
                </Button>
                <Button
                  className={Styles.footer__links__btn}
                  href="/shop"
                  variant="text"
                >
                  Products
                </Button>
              </div>
              <div className={Styles.vertical__line} />
              <div className={Styles.footer__links}>
                <Button
                  className={Styles.footer__links__btn}
                  href="/cart"
                  variant="text"
                >
                  Cart
                </Button>
                <Button
                  className={Styles.footer__links__btn}
                  href="/order-history"
                  variant="text"
                >
                  Account
                </Button>
                <Button
                  className={Styles.footer__links__btn}
                  href="/contact"
                  variant="text"
                >
                  Contact Us
                </Button>
              </div>
              <div className={Styles.vertical__line} />
              <div className={Styles.footer__links}>
                <Button className={Styles.footer__links__btn} variant="text">
                  Terms and Conditions
                </Button>
                <Button className={Styles.footer__links__btn} variant="text">
                  FAQs
                </Button>
                <div className={Styles.footer__links__follow} variant="text">
                  <Button className={Styles.footer__links__follow__btn}>
                    <Image
                      alt="Hamed Abdallah Facebook"
                      // style={{ color: 'red !important' }}
                      src="/facebook.png"
                      width={30}
                      height={30}
                    />
                  </Button>
                  <Button className={Styles.footer__links__follow__btn}>
                    <Image
                      alt="Hamed Abdallah Facebook"
                      src="/twitter.png"
                      width={30}
                      height={30}
                    />
                  </Button>
                  <Button className={Styles.footer__links__follow__btn}>
                    <Image
                      alt="Hamed Abdallah Facebook"
                      src="/instagram.png"
                      width={30}
                      height={30}
                    />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={Styles.footerMob}>
              <div className={Styles.footerMobLogo}>
                <Image
                  alt="Hamed Abdallah Logo"
                  src="/Hamed-logo-Fullcolor.png"
                  width={152.5}
                  height={87.5}
                  priority={true}
                />
              </div>
              <br></br>
              <div className={Styles.footer__links__follow__mob} variant="text">
                <Button className={Styles.footer__links__follow__btn}>
                  <Image
                    alt="Hamed Abdallah Facebook"
                    src="/facebook.png"
                    width={30}
                    height={30}
                  />
                </Button>
                <Button className={Styles.footer__links__follow__btn}>
                  <Image
                    alt="Hamed Abdallah Facebook"
                    src="/twitter.png"
                    width={30}
                    height={30}
                  />
                </Button>
                <Button className={Styles.footer__links__follow__btn}>
                  <Image
                    alt="Hamed Abdallah Facebook"
                    src="/instagram.png"
                    width={30}
                    height={30}
                  />
                </Button>
              </div>
            </div>
          )}
        </div>
        <br></br>
        <div className={Styles.below__footer}>
          <Typography className={Styles.below__footer__text}>
            ALL RIGHTS RESERVED © 2021{' '}
            <a
              style={{ color: '#ca222a' }}
              target="_blank"
              href="https://www.bmceg.com"
            >
              BUSINESS MAP CONSULTANTS
            </a>{' '}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HamedAbdallahFooter;
