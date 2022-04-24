export const handleTimeStamp = (arg, timeConvert) => {
  let timestamp = arg
  const time = new Date(timestamp * 1000);
  
  const year = time.getUTCFullYear();
  const month = time.toLocaleString("En-en", {month: "long"})
  const day = time.getDate();
  // console.log(day +" - " + month  + " - " + year)
  return timeConvert = day +" " + month  + ", " + year
}