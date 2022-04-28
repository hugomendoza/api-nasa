export const imageModal = (urlFormat) => {
  let imageComponent =
    `
      <img
        src="${urlFormat}~thumb.jpg"
        class="card__thumbnail"
      />
    `
  return imageComponent
}