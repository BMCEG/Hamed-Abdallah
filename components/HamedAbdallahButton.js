import Styles from '../styles/components/button.module.css';
import { Button } from '@material-ui/core';

const HamedAbdallahButton = (props) => {
  return (
    <Button href={props.href} className={Styles.button}>
      {props.text}
    </Button>
  );
};

export default HamedAbdallahButton;
