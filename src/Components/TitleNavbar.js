import { LitElement, html, css } from 'lit-element';

export class TitleNavbar extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      userObj: { type: Object },
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
        background: #c8d8e4;
        color: #2b6777;
        font-weight: bold;
      }

      #welcome-btn {
        width: 14vw;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
      }
    `;
  }

  constructor() {
    super();
    this.title = "Fowler's Garage";
  }

  _signOut() {
    const event = new CustomEvent('signout-event', {
      detail: {
        signout: true,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="navbar-buttons">
        <h1>${this.title}</h1>
        <span id="welcome-btn">
          <p>Welcome ${this.userObj.username}</p>
          <lion-button @click=${this._signOut}>Sign Out</lion-button>
        </span>
      </div>
    `;
  }
}
