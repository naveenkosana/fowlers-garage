import { LitElement, html, css } from 'lit-element';

export class FowlersGarage extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      showHomePage: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        /*font-size: calc(10px + 1vmin);*/
        /*color: #1a2b42;*/
        color: #ffffff;
        max-width: 100vw;
        margin: 0 auto;
        text-align: center;
        /* background-color: var(--fowlers-garage-background-color); */
        background-color: #2b6777;
      }

      main .title-navbar {
        border-bottom: 2px solid black;
        width: 100%;
        position: fixed;
        height: 7vh;
        z-index:2;
        background-color:#2b6777;
      }

      main .home-body {
        position: relative;
        top: 7vh;
        background-color:#ffffff;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
        position: relative;
        top: 3vh;
      }

      .app-footer a {
        color:#ffffff
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.showHomePage = false;
  }

  _handleHomePageView(e) {
    console.log('here');
    this.showHomePage = e.detail.showHomePage;
    this.userObj = e.detail.userObj;
  }

  _signout() {
    this.showHomePage = false;
  }

  render() {
    if (this.showHomePage) {
      return html`
        <main>
          <div class="title-navbar">
            <title-navbar
              @signout-event=${this._signout}
              .userObj=${this.userObj}
            >
            </title-navbar>
          </div>
          <div class="home-body">
            <home-page .userObj=${this.userObj}> </home-page>
          </div>
        </main>
      `;
    }

    return html`
      <login-page @login-success="${this._handleHomePageView}"></login-page>
    `;
  }
}
