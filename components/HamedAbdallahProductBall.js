import Styles from '../styles/components/productBall.module.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import * as React from 'react';

const HamedAbdallahProductBall = (props) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  const ballInfo = props.ballInfo;
  return (
    <div className={Styles.root}>
      <Image
        onMouseOver={handleChange}
        onMouseLeave={handleChange}
        className={Styles.ball}
        width={65}
        height={65}
        alt={ballInfo.name}
        priority={true}
        src={`/${ballInfo.name}/${ballInfo.value}.jpg`}
      />
      <Zoom in={checked}>
        <div className={Styles.captionBase}>
          <Typography className={Styles.caption}>{ballInfo.value}</Typography>
        </div>
      </Zoom>
    </div>
  );
};

export default HamedAbdallahProductBall;
