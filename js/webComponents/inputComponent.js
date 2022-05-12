export class inputComponent extends HTMLElement {
  constructor() {
    super();
    this.type;
    this.name;
    this.id;
    this.value;
    this.label;
  }

  static get observedAttributes() {
    return ["type", "name", "id", "value", "label" ]
  }

  attributeChangedCallback(nameAtr, oldValue, newValue) {
    switch (nameAtr) {
      case "type":
        oldValue !== newValue ? this.type = newValue : ""
        break;
      case "name":
        oldValue !== newValue ? this.name = newValue : ""
        break;
      case "id":
        oldValue !== newValue ? this.id = newValue : ""
        break;
      case "value":
        oldValue !== newValue ? this.value  = newValue : ""
        break;
      case "label":
        oldValue !== newValue ? this.label  = newValue : ""
        break;
    }
  }

  connectedCallback() {
    this.innerHTML = `
      <fieldset class="flex items-center">
        <input
          type="${this.type}"
          name="${this.name}"
          id="${this.id}"
          value="${this.value}"
        >
        <label for="${this.label}">${this.label}</label>
      </fieldset>
    `
  }
}