import Styles from '../styles/components/productBall.module.css';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCertificate,
  faWrench,
  faHandshake,
  faGlasses,
} from '@fortawesome/free-solid-svg-icons';

const HamedAbdallahProductBurn = (props) => {
  const burnInfo = props.burnInfo;

  const iconChecker = () => {
    switch (burnInfo.icon) {
      case 'faHandshake':
        return (
          <FontAwesomeIcon
            size="3x"
            icon={faHandshake}
            className={Styles.burnIcon}
          />
        );

      case 'faWrench':
        return (
          <FontAwesomeIcon
            size="3x"
            icon={faWrench}
            className={Styles.burnIcon}
          />
        );

      case 'faCertificate':
        return (
          <FontAwesomeIcon
            size="3x"
            icon={faCertificate}
            className={Styles.burnIcon}
          />
        );

      case 'faGlasses':
        return (
          <FontAwesomeIcon
            size="3x"
            icon={faGlasses}
            className={Styles.burnIcon}
          />
        );
    }
  };
  return (
    <div className={Styles.burnBase}>
      {iconChecker()}
      {/* <br></br> */}
      {/* <br></br> */}
      <Typography className={Styles.burnCaption}>{burnInfo.caption}</Typography>
    </div>
  );
};

export default HamedAbdallahProductBurn;
