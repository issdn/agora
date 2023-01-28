export const prettyDate = (date: string) => {
  let prettyDate = new Date(date.replace(/\s/g, "T")).toLocaleDateString();
  return prettyDate;
};
