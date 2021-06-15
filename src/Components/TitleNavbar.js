import { LitElement, html, css } from 'lit-element';

export class TitleNavbar extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.title = "Fowler's Garage";
  }

  render() {
    return html` <h2>${this.title}</h2> `;
  }
}
