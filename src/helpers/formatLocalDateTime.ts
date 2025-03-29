export const formatLocalDateTime = (utcDateString: string) => {
    const date = new Date(utcDateString);
    return date.toLocaleString("es-AR", {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  