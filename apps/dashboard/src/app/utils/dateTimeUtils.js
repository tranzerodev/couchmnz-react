// Timestamp will Total seconds since 1970/01/01

export const convertTimestampToDate = timestamp => {
  const date = new Date(timestamp * 1000);
  return date;
};

export const convertDateToTimestamp = date => Math.floor(date / 1000);

