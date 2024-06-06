class CurrentDate extends HTMLElement {
  name: string;

  constructor() {
    super();
    this.name = "World";
  }

  // component attributes
  static get observedAttributes() {
    return ["name"];
  }

  // attribute change
  attributeChangedCallback(property: "name", oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  // The browser calls this method when the element is
  // added to the DOM.
  connectedCallback() {
    // Create a Date object representing the current date.
    const now = new Date();

    // Format the date to a human-friendly string, and set the
    // formatted date as the text content of this element.
    this.textContent = `This is a web component: ${now.toLocaleDateString()}`;
  }
}

// Register the CurrentDate component using the tag name <current-date>.
customElements.define("current-date", CurrentDate);
