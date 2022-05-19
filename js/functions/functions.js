//Components
import { audioModal } from "../components/audioModal.js";
import { imageModal } from "../components/imageModal.js";
import { videoModal } from "../components/videoModal.js";

//Variables
const modal = document.querySelector(".modal");
const modalName = document.querySelector(".modal__name");
const modalDate = document.querySelector(".modal__date");
const modalCreator = document.querySelector(".modal__creator");
const modalDescription = document.querySelector(".modal__text-description");
const cardModal = document.querySelector(".card--modal");
const modalDownload = document.querySelector(".modal__download");
const body = document.body

export const handleTimeStamp = (arg, timeConvert) => {
  let timestamp = arg
  const time = new Date(timestamp * 1000);
  
  const year = time.getUTCFullYear();
  const month = time.toLocaleString("En-en", {month: "long"})
  const day = time.getDate();
  
  return timeConvert = day +" " + month  + ", " + year
}

export const toTimestamp = (strDate) => {
  const datum = Date.parse(strDate);
  return datum/1000;
}

export const clickCard = (datos) => {
  const array = document.querySelectorAll(".card")
    array.forEach((card, index) => {
      card.addEventListener("click", () => {
        const { title, date_created, photographer, description, nasa_id, media_type } = datos[index]
        modal.classList.add("modal--active")
        body.classList.add("no-scroll")
        const dateCreated = toTimestamp(date_created)
        const dateEnd = handleTimeStamp(dateCreated)
        modalName.innerHTML = title
        modalDate.innerHTML = dateEnd
        modalCreator.innerHTML = `${photographer ? photographer : "Nasa"}`
        modalDescription.innerHTML = description
        const urlFormat = `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}`
        const typeThumbnail = "~thumb.jpg"
        const thumbnail = `${urlFormat}${typeThumbnail}`
        switch (media_type) {
          case "video":
            cardModal.innerHTML = videoModal(urlFormat, thumbnail)
            modalDownload.setAttribute("href", `${urlFormat}~orig.mp4`)
            break;
          case "audio":
            cardModal.innerHTML = audioModal(urlFormat)
            modalDownload.setAttribute("href", `${urlFormat}~orig.mp3`)
            break;
          default:
            cardModal.innerHTML = imageModal(urlFormat)
            modalDownload.setAttribute("href", `${urlFormat}~thumb.jpg`)
            break;
        }
      })
  })
}