//Functions
import { handleTimeStamp } from "./functions/functions.js";

//Components
import { cardComponent } from "./components/cardComponent.js";
import { videoModal } from "./components/videoModal.js";

const inputGrid = document.getElementById("grid");
const cards = document.querySelector(".card-grid");
const formSubmit = document.querySelector(".form");
const sectionCards = document.querySelector(".search")
const titleResult = document.querySelector(".header__result strong");
const modal = document.querySelector(".modal");
const cardsResult = document.querySelectorAll(".card--grid"); 
const modalClose = document.querySelector(".modal__close");

inputGrid.addEventListener("change", () => {
  cards.classList.toggle("card-grid--list")
})

const audioModal = (urlFormat) => {
  let audioComponent =
    `
      <audio
        style="pointer-events: auto;"
        src="${urlFormat}~orig.mp3"
        controls
        class="card__thumbnail"
      >
      </audio>
    `
  return audioComponent
}

const imageModal = (urlFormat) => {
  let imageComponent =
    `
      <img src="${urlFormat}~orig.jpg" class="card__thumbnail"" />
    `
  return imageComponent
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

const handleApi = (arg) => {
  removeAllChildNodes(cards); 
  fetch(arg)
    .then(response => response.json())
    .then(data => {
      const dataApi = data.collection.items
      for (let i = 0; i < dataApi.length; i++) {
        const dataInner = dataApi[i].data
        console.log(dataApi)
        const { media_type, nasa_id, photographer, title, date_created, description } = dataInner[0]
        const dateCreated = toTimestamp(date_created)
        const dateEnd = handleTimeStamp(dateCreated)
        const typeThumbnail = "~thumb.jpg"
        const urlFormat = `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}`
        const thumbnail = `${urlFormat}${typeThumbnail}`
        sectionCards.classList.add("search--active")
        cards.innerHTML += cardComponent(media_type, thumbnail, photographer, title, dateEnd, urlFormat, description)
      }
    });
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = document.querySelector("input[name='name']").value;
  const inputsForm = document.querySelectorAll(".form input[type='checkbox']");
  const arrayInputs = [...inputsForm]
  let formatTypes = []
  for (var i=0;i<arrayInputs.length;i++) {
    if (arrayInputs[i].checked) {
      formatTypes.push(arrayInputs[i].value);
    }
  }
  let mediaTypes = formatTypes.join(',');
  let url = `https://images-api.nasa.gov/search?q=${inputText}${formatTypes.length !== 0 ? `&media_type=${mediaTypes}` : ""}`
  titleResult.innerHTML = inputText.toString();
  handleApi(url)
})

cards.addEventListener('click', (e) => {
  if (e.target.closest('.card-grid .card')) {
    modal.classList.add("modal--active")
    const name = e.target.getAttribute("data-name")
    const created = e.target.getAttribute("data-created")
    const creator = e.target.getAttribute("data-creator")
    const urlFormat = e.target.getAttribute("data-resource")
    const description = e.target.getAttribute("data-description")
    const media = e.target.getAttribute("data-media")
    const thumbnail = e.target.getAttribute("data-thumbnail")
    document.querySelector(".modal__name").innerHTML = name
    document.querySelector(".modal__date").innerHTML = created
    document.querySelector(".modal__creator").innerHTML = creator
    document.querySelector(".modal__text-description").innerHTML = description
    const cardModal = document.querySelector(".card--modal")
    if (media === "video") {
      cardModal.innerHTML = videoModal(urlFormat, thumbnail)
    } else if (media === "audio") {
      cardModal.innerHTML = audioModal(urlFormat)
    } else {
      cardModal.innerHTML = imageModal(urlFormat)
    }
  }
});

modalClose?.addEventListener("click", () => {
  modal.classList.remove("modal--active")
  document.querySelector(".modal__name").innerHTML = ""
  document.querySelector(".modal__date").innerHTML = ""
  document.querySelector(".modal__creator").innerHTML = ""
  document.querySelector(".modal__text-description").innerHTML = ""
  const cardModal = document.querySelector(".card--modal")
  cardModal.innerHTML = ""
})




