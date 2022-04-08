const inputGrid = document.getElementById("grid");
const cards = document.querySelector(".card-grid");
const formSubmit = document.querySelector(".form");
const sectionCards = document.querySelector(".search")
const titleResult = document.querySelector(".header__result strong")

inputGrid.addEventListener("change", () => {
  cards.classList.toggle("card-grid--list")
})

const cardComponent = (media_type, thumbnail, photographer, title, date_created) => {
  let card =
  `
    <article class="card">
      <figure class="card__picture">
        ${media_type === "audio" ?
          `
            <img
              loading="lazy"
              src="./img/nasa-podcast.jpg"
              alt="icono play"
              class="card__thumbnail"
            >
          `
          :
          `
            <img
              loading="lazy"
              src="${thumbnail}"
              alt="${title}"
              class="card__thumbnail"
            >
          `
        }
        ${media_type == "video" ?
          `
            <img
              loading="lazy"
              src="./img/ico-play.svg"
              alt="icono play"
              class="card__play"
            >
          `
          :
          ""
        }
      </figure>
      <blockquote class="card__description">
        <p class="card__name">${title}</p>
        <p class="card__data">
          ${photographer ? photographer : "NASA"}
        </p>
        <p class="card__data">
          ${date_created}
        </p>
        <p class="card__category">${media_type}</p>
      </blockquote>
    </article>
  `
  return card
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const handleApi = (arg) => {
  removeAllChildNodes(cards); 
  fetch(arg)
    .then(response => response.json())
    .then(data => {
      const dataApi = data.collection.items
      // console.log(dataApi)
      for (let i = 0; i < dataApi.length; i++) {
        
        const dataInner = dataApi[i].data
        const {media_type, nasa_id, photographer, title, date_created} = dataInner[0]
        const thumbnail = `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}~thumb.jpg`
        // console.log(dataInner)
        sectionCards.classList.add("search--active")
        cards.innerHTML += cardComponent(media_type, thumbnail, photographer, title, date_created)
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
