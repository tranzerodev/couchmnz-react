export function validateWorkingDays(weeks) {
  const keys = Object.keys(weeks);
  for (let i = 0; i < keys.length; i++) {
    const day = weeks[keys[i]]
    if (day && day.startTime && day.endTime) {
      return true;
    }
  }
  return false;
}
