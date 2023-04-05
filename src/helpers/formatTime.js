export const formatTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  return date;
};
