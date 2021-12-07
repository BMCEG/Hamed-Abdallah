import Styles from '../styles/components/collage.module.css';
import Image from 'next/image';
import { Button } from '@material-ui/core';

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
        </div>
      </div>
    </div>
  );
};

export default HamedAbdallahCollage;
