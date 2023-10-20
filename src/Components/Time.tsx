import useCurrentDateEffect from "../hooks/useCurrentDateEffect";
import styles from "../styles/components/time.module.scss";
import { TimeFormat } from "../util/TimeUtility";

function DigitalClock() {
  const date: Date = useCurrentDateEffect();

  return <span className={styles.time}>{TimeFormat.format(date)}</span>;
}

export default DigitalClock;
