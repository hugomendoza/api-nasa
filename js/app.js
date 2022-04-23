const inputGrid = document.getElementById("grid");
const cards = document.querySelector(".card-grid");
const formSubmit = document.querySelector(".form");
const sectionCards = document.querySelector(".search")
const titleResult = document.querySelector(".header__result strong");
const modal = document.querySelector(".modal");
const cardsResult = document.querySelectorAll(".card--grid"); 

inputGrid.addEventListener("change", () => {
  cards.classList.toggle("card-grid--list")
})

const cardComponent = (media_type, thumbnail, photographer, title, date_created, urlFormat) => {
  let card =
  `
    <article
      class="card card--grid"
      data-media="${media_type}"
      data-name="${title}"
      data-resource="${urlFormat}"
      data-creator="${photographer}"
      data-created="${date_created}"
      data-thumbnail="${thumbnail}"
    >
      <figure class="card__picture card__picture__ssssss">
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

const videoModal = (urlFormat, thumbnail) => {
  let videoComponent =
    `
      <video
        style="pointer-events: auto;"
        src="${urlFormat}~orig.mp4"
        poster="${thumbnail}"
        class="card__thumbnail"
        controls
      >
        Tu navegador no admite el elemento <code>video</code>.
      </video>
      <img
        loading="lazy"
        src="./img/ico-play.svg"
        alt="icono play"
        class="card__play"
      >
    `
  return videoComponent
}

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
      <img src="${urlFormat}~large.jpg" class="card__thumbnail"" />
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

const handleTimeStamp = (arg) => {
  let timestamp = arg
  const date = new Date(timestamp * 1000).toLocaleString("en-GB", {timeZone: "UTC"});
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return timeConvert = year + "/" + month  + "/" + day
}

const handleApi = (arg) => {
  removeAllChildNodes(cards); 
  fetch(arg)
    .then(response => response.json())
    .then(data => {
      const dataApi = data.collection.items
      for (let i = 0; i < dataApi.length; i++) {
        const dataInner = dataApi[i].data
        const { media_type, nasa_id, photographer, title, date_created } = dataInner[0]
        console.log(dataInner[0])
        const dateCreated = toTimestamp(date_created)
        const dateEnd = handleTimeStamp(dateCreated)
        const typeThumbnail = "~thumb.jpg"
        const urlFormat = `https://images-assets.nasa.gov/${media_type}/${nasa_id}/${nasa_id}`
        const thumbnail = `${urlFormat}${typeThumbnail}`
        sectionCards.classList.add("search--active")
        cards.innerHTML += cardComponent(media_type, thumbnail, photographer, title, dateEnd, urlFormat)
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
    const urlFormat = e.target.getAttribute("data-resource")
    const media = e.target.getAttribute("data-media")
    const thumbnail = e.target.getAttribute("data-thumbnail")
    document.querySelector(".modal__name").innerHTML = name
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




