//webcomponents
import { headerComponent } from "./webComponents/headerComponent.js";
import { inputComponent } from "./webComponents/inputComponent.js";

import { cardFetch } from "./components/cardFetch.js";
import { clickCard } from "./functions/functions.js";

//Variables
const inputGrid = document.getElementById("grid");
const cards = document.querySelector(".card-grid");
const formSubmit = document.querySelector(".form");
const sectionCards = document.querySelector(".search")
const titleResult = document.querySelector(".header__result strong");
const modal = document.querySelector(".modal");
const modalName = document.querySelector(".modal__name");
const modalDate = document.querySelector(".modal__date");
const modalCreator = document.querySelector(".modal__creator");
const modalDescription = document.querySelector(".modal__text-description");
const cardModal = document.querySelector(".card--modal");
const modalDownload = document.querySelector(".modal__download");
const body = document.body
const modalClose = document.querySelector(".modal__close");
const sortSelect = document.getElementById("sort")

//Change grid cards
inputGrid.addEventListener("change", () => {
  cards.classList.toggle("card-grid--list")
})

const handleApi = async (arg) => {
  let datos = [];
  await fetch(arg)
    .then(response => response.json())
    .then(data => {
      const dataApi = data.collection.items
      dataApi.map((e, index) => {
        const dataInner = e.data[0]
        const { media_type, nasa_id, photographer, title, date_created, description } = dataInner
        datos.push({
          media_type,
          nasa_id,
          photographer,
          title,
          date_created,
          description,
          id: index
        });
      })
      return datos
    });
  
  sectionCards.classList.add("search--active")
  
  cards.innerHTML = cardFetch(datos).join('')
  
  sortSelect.addEventListener("change", () => {
    let valueSelect = sortSelect.value.toLowerCase()
    datos.sort((x) => {
      let a = x.media_type.toLowerCase()
      let b = valueSelect
      // return a < b ? 0 : a > b ? 1 : -1;
      if ( a > b ){
        return 1;
      }
      if ( b > a ){
        return 0;
      }
      return -1;
    });
    cards.innerHTML = cardFetch(datos).join('')
    clickCard(datos)
  })

  clickCard(datos)
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

modalClose?.addEventListener("click", () => {
  modal.classList.remove("modal--active")
  body.classList.remove("no-scroll")
  modalName.innerHTML = ""
  modalDate.innerHTML = ""
  modalCreator.innerHTML = ""
  modalDescription.innerHTML = ""
  modalDownload.setAttribute("href", "")
  cardModal.innerHTML = ""
})


window.customElements.define("header-component", headerComponent);
window.customElements.define("input-component", inputComponent);