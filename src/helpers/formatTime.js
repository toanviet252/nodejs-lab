/* 
const formatTimeLocale = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  };

  const locale = i18n.language;
  const rs = new Intl.DateTimeFormat(locale, options).format(new Date(date));
  return rs;
};
export default formatTimeLocale;

*/
export const formatTime = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  return date;
};
