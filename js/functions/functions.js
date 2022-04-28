export const handleTimeStamp = (arg, timeConvert) => {
  let timestamp = arg
  const time = new Date(timestamp * 1000);
  
  const year = time.getUTCFullYear();
  const month = time.toLocaleString("En-en", {month: "long"})
  const day = time.getDate();
  
  return timeConvert = day +" " + month  + ", " + year
}

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const toTimestamp = (strDate) => {
  const datum = Date.parse(strDate);
  return datum/1000;
}