export const isTimeForAppointment = (dateStr: string) => {
  const appointmentTime = new Date(dateStr).getTime(); // UTC
  const now = Date.now(); // también UTC

  // 15 min antes y 30 min después
  const min = appointmentTime - 15 * 60 * 1000;
  const max = appointmentTime + 30 * 60 * 1000;

  const result = now >= min && now <= max;

  console.log("DATE STR: ", dateStr);
  console.log("APPOINTMENT TIME:", appointmentTime, new Date(appointmentTime));
  console.log("NOW:", now, new Date(now));
  console.log("RANGO:", new Date(min), "↔", new Date(max));
  console.log("CHECK:", result);

  return result;
};
