//Functions
import { handleTimeStamp, toTimestamp } from "../functions/functions.js";

// Component
import { cardComponent } from "./cardComponent.js";


export const cardFetch = (arg) => arg.map((data) => {
  const { media_type, nasa_id, photographer, title, date_created, description, id } = data
  const dateCreated = toTimestamp(date_created)
  const dateEnd = handleTimeStamp(dateCreated)
  const typeThumbnail = "~thumb.jpg"
  const urlFormat = `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}`
  const thumbnail = `${urlFormat}${typeThumbnail}`
  return cardComponent(media_type, thumbnail, photographer, title, dateEnd, urlFormat, description, id)
})