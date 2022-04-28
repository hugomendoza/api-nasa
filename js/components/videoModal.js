export const videoModal = (urlFormat, thumbnail) => {
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
    `
  return videoComponent
}