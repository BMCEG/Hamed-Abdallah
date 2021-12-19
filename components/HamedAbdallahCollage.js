import Styles from '../styles/components/collage.module.css';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';

const HamedAbdallahCollage = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.row}>
        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a
            href="/shop?gender=boys"
            className={Styles.block__img}
            style={{
              backgroundImage: `url('/glasses-1.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          ></a>
          <div className={Styles.block_caption}>
            <Typography
              variant="h2"
              component="h2"
              className={Styles.block_title}
            >
              <strong>Boys</strong>
              <br></br>
              Eyewear
            </Typography>
          </div>
        </div>

        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a
            className={Styles.block__img}
            style={{
              backgroundImage: `url('/glasses-2.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            href="/shop?gender=male"
          ></a>
          <div className={Styles.block_caption}>
            <Typography
              variant="h2"
              component="h2"
              className={Styles.block_title}
            >
              <strong>Men</strong>
              <br></br>
              Eyewear
            </Typography>
          </div>
        </div>
      </div>
      {/* <br></br> */}
      <div className={Styles.row}>
        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a
            className={Styles.block__img}
            style={{
              backgroundImage: `url('/glasses-3.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            href="/shop?type=sunglasses"
          ></a>
          <div className={Styles.block_caption}>
            <Typography
              variant="h2"
              component="h2"
              className={Styles.block_title}
            >
              <strong>Hottest</strong>
              <br></br>
              Sunglasses
            </Typography>
          </div>
        </div>

        <div className={Styles.block}>
          <div className={Styles.block__bg}></div>
          <a
            className={Styles.block__img}
            style={{
              backgroundImage: `url('/glasses-4.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            href="/shop?type=eyeglasses"
          ></a>
          <div className={Styles.block_caption}>
            <Typography
              variant="h2"
              component="h2"
              className={Styles.block_title}
            >
              <strong>Hottest</strong>
              <br></br>
              eyeglasses
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamedAbdallahCollage;
