import { useState, useEffect } from "react";
const useCurrentDateEffect = (): Date => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      const update: Date = new Date();

      if (update.getSeconds() !== date.getSeconds()) {
        setDate(update);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [date]);

  return date;
};

export default useCurrentDateEffect;
