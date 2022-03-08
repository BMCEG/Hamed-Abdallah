import { useEffect, useState } from 'react';
import Styles from '../styles/components/counter.module.css';

const HamedAbdallahCoutner = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(props.date);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, [props]);

  return (
    <div className={Styles.counterContainer}>
      <div className={Styles.timer_segment}>
        <span className={Styles.time}>{days}</span>
        <span className={Styles.label}> Days</span>
      </div>
      <span className={Styles.divider}>:</span>
      <div className={Styles.timer_segment}>
        <span className={Styles.time}>{hours}</span>
        <span className={Styles.label}> Hours</span>
      </div>
      <span className={Styles.divider}>:</span>
      <div className={Styles.timer_segment}>
        <span className={Styles.time}>{minutes}</span>
        <span className={Styles.label}> Minutes</span>
      </div>
      <span className={Styles.divider}>:</span>
      <div className={Styles.timer_segment}>
        <span className={Styles.time}>{seconds}</span>
        <span className={Styles.label}> Seconds</span>
      </div>
    </div>
  );
};

export default HamedAbdallahCoutner;
