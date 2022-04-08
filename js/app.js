const inputGrid = document.getElementById("grid");
const cards = document.querySelector(".card-grid");
// let img = `
//   <div>
//     <img
//       src="${cucuFriends[i].image}"
//       alt="${cucuFriends[i].name}"
//     />
//   </div>
// `;
// wrapperCard.insertAdjacentHTML('beforeend', img);

inputGrid.addEventListener("change", () => {
  cards.classList.toggle("card-grid--list")
})

fetch('https://images-api.nasa.gov/search?q=orion')
  .then(response => response.json())
  .then(data => {
    const dataApi = data.collection.items
    // console.log(dataApi)
    for (let i = 0; i < dataApi.length; i++) {
      
      const dataInner = dataApi[i].data
      console.log(dataInner)
      let cardSearch = `
        <article class="card">
          <figure class="card__picture">
            ${dataInner[0].media_type == "audio" ?
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
                  src="https://images-assets.nasa.gov/${dataInner[0].media_type}/${dataInner[0].nasa_id}/${dataInner[0].nasa_id}~thumb.jpg"
                  alt="${dataInner[0].title}"
                  class="card__thumbnail"
                >
              `
            }
            ${dataInner[0].media_type == "video" ?
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
            <p class="card__name">${dataInner[0].title}</p>
            <p class="card__data">
              ${dataInner[0].photographer ? dataInner[0].photographer : "NASA"}
            </p>
            <p class="card__data">
              ${dataInner[0].date_created}
            </p>
            <p class="card__category">${dataInner[0].media_type}</p>
          </blockquote>
        </article>
      `
      cards.insertAdjacentHTML('beforeend', cardSearch);
      // for (let e = 0; e < dataInner.length; e++) {
      //   console.log(dataInner[e].descrption)
      // }
    }
  });