export const audioModal = (urlFormat) => {
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