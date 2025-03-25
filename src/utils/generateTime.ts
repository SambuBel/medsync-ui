export function generateHalfHourIntervals(startTime: string, endTime: string): string[] {
    const result: string[] = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
  
    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);
  
    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);
  
    while (start < end) {
      result.push(start.toTimeString().slice(0, 5));
      start.setMinutes(start.getMinutes() + 30);
    }
  
    return result;
  }
  