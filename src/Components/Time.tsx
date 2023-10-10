import useCurrentDateEffect from "../hooks/useCurrentDateEffect";
import styles from "../styles/components/time.module.scss";
type TimeUtility = {
  format: (date: Date) => string;
  formatHours: (hours: number) => string;
  formatSegment: (segment: number) => string;
};

const TimeFormat: TimeUtility = {
  formatHours: (hours: number): string => {
    return hours % 12 === 0 ? `12` : `${hours % 12}`;
  },
  formatSegment: (segment: number): string => {
    return segment < 10 ? `0${segment}` : `${segment}`;
  },
  format: (date: Date): string => {
    const hours: string = TimeFormat.formatHours(date.getHours());
    const minutes: number = date.getMinutes();
    const seconds: string = date.getSeconds().toString();

    return `${hours}:${TimeFormat.formatSegment(minutes)}`;
  },
};

function DigitalClock() {
  const date: Date = useCurrentDateEffect();

  return <span className={styles.time}>{TimeFormat.format(date)}</span>;
}

export default DigitalClock;
