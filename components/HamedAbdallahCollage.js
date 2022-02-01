import Styles from '../styles/components/collage.module.css';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';

const HamedAbdallahCollage = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.row}>
        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a href="/shop?gender=kids">
            <div
              className={Styles.block__img}
              style={{
                backgroundImage: `url('/glasses-1.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>

            <div className={Styles.block_caption}>
              <Typography className={Styles.block_title}>
                <strong>Kids</strong>
                <br></br>
                Eyewear
              </Typography>
            </div>
          </a>
        </div>

        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a href="/shop?gender=male">
            <div
              className={Styles.block__img}
              style={{
                backgroundImage: `url('/glasses-2.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className={Styles.block_caption}>
              <Typography className={Styles.block_title}>
                <strong>Men</strong>
                <br></br>
                Eyewear
              </Typography>
            </div>
          </a>
        </div>
      </div>
      {/* <br></br> */}
      <div className={Styles.row}>
        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a href="/shop?type=sunglasses">
            <div
              className={Styles.block__img}
              style={{
                backgroundImage: `url('/glasses-3.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className={Styles.block_caption}>
              <Typography className={Styles.block_title}>
                <strong>Hottest</strong>
                <br></br>
                Sunglasses
              </Typography>
            </div>
          </a>
        </div>

        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a href="/shop?type=eyeglasses">
            <div
              className={Styles.block__img}
              style={{
                backgroundImage: `url('/glasses-4.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className={Styles.block_caption}>
              <Typography className={Styles.block_title}>
                <strong>Elegant</strong>
                <br></br>
                Eyeglasses
              </Typography>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HamedAbdallahCollage;
