function unixTimestampToFormatted(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formattedTimestampToUnix(formattedTimestamp) {
  const dateObject = new Date(formattedTimestamp);
  const unixTimestamp = dateObject.getTime();
  
  return unixTimestamp;
}

function formattedTimestampToDate(formattedTimestamp) {
  return unixTimestampToFormatted(formattedTimestampToDate(formattedTimestamp))
}

const convert = {
  unixToDate: (unixTimestamp) => unixTimestampToFormatted(unixTimestamp),
  formattedToUnix: (formattedTimestamp) => formattedTimestampToUnix(formattedTimestamp),
  formattedToDate: (formattedTimestamp) => formattedTimestampToDate(formattedTimestamp)
};

export default convert;
