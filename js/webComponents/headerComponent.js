export class headerComponent extends HTMLElement {
  
  constructor() {
    super();
    this.title;
    this.subtitle;
    this.src;
  }

  static get observedAttributes() {
    return ["title", "subtitle", "src"]
  }

  attributeChangedCallback(nameAtr, oldValue, newValue) {
    switch (nameAtr) {
      case "title":
        oldValue !== newValue ? this.title = newValue : ""
        break;
      case "subtitle":
        oldValue !== newValue ? this.subtitle = newValue : ""
        break;
      case "src":
        oldValue !== newValue ? this.src = newValue : ""
        break;
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <img
          loading="lazy"
          src="${this.src}"
          alt="Logo Nasa"
          class="header__logo"
        >
        <h1 class="header__title">
          ${this.title}
        </h1>
        <p class="header__subtitle">
          ${this.subtitle}
        </p>
      </header>
    `
  }
}