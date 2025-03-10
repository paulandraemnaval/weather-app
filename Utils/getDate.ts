export function getDateFromApiResponse(date: string): string {
  const dateString = date.split(" ")[0];
  const dateObj = new Date(dateString);
  const today = new Date();
  const daysAgo = Math.floor(
    (today.getTime() - dateObj.getTime()) / (1000 * 3600 * 24)
  );

  if (daysAgo <= 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "Yesterday";
  }
  return `${daysAgo} days ago`;
}
