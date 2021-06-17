import { LitElement, html, css } from 'lit-element';

export class TitleNavbar extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      .navbar-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 7vh;
      }

      .navbar-buttons lion-button {
        cursor: pointer;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.title = "Fowler's Garage";
  }

  render() {
    return html`
      <div class="navbar-buttons">
        <lion-icon
          icon-id="lion:space:spaceHelmet"
          aria-label="Fowler Logo"
        ></lion-icon>
        <h2>${this.title}</h2>
        <lion-button>Sign In / Sign Up</lion-button>
      </div>
    `;
  }
}
