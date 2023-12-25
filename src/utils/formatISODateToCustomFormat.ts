function formatISODateToCustomFormat(isoString: string): string {
  const myDate = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate: string = myDate.toLocaleDateString("en-US", options);

  return formattedDate;
}
export default formatISODateToCustomFormat;
