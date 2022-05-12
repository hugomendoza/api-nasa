export const cardComponent = (media_type, thumbnail, photographer, title, date_created, urlFormat, description) => {
  const descriptionStore = description.replace(/"/g, `'`)
  let card =
  `
    <article
      class="card card--grid"
      data-media="${media_type}"
      data-name="${title}"
      data-resource="${urlFormat}"
      data-creator="${photographer ? photographer : "NASA"}"
      data-created="${date_created}"
      data-thumbnail="${thumbnail}"
      data-description="${descriptionStore}"
    >
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

