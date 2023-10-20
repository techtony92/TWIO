type TimeUtility = {
  format: (date: Date) => string;
  formatHours: (hours: number) => string;
  formatSegment: (segment: number) => string;
  formatMeridiem: (segment: number) => string;
};

type TimeZoneUtility = () => string;

export const getTimeZone: TimeZoneUtility = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const TimeFormat: TimeUtility = {
  formatHours: (hours: number): string => {
    return hours % 12 === 0 ? `12` : `${hours % 12}`;
  },
  formatSegment: (segment: number): string => {
    return segment < 10 ? `0${segment}` : `${segment}`;
  },
  formatMeridiem: (segment: number): string => {
    return segment >= 12 ? `pm` : `am`;
  },
  format: (date: Date): string => {
    const hours: string = TimeFormat.formatHours(date.getHours());
    const minutes: number = date.getMinutes();
    const seconds: string = date.getSeconds().toString();
    const meridiem: string = TimeFormat.formatMeridiem(date.getHours());
    return `${hours}:${TimeFormat.formatSegment(minutes)}  ${meridiem}`;
  },
};
