import { LitElement, html, css } from 'lit-element';

export class FowlersGarage extends LitElement {
  static get properties() {
    return {
      title: { type: String },
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
        //font-size: calc(10px + 1vmin);
        color: #1a2b42;
        max-width: 100vw;
        margin: 0 auto;
        text-align: center;
        background-color: var(--fowlers-garage-background-color);
      }

      main .title-navbar {
        border-bottom: 2px solid black;
        width: 100%;
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
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
  }

  render() {
    return html`
      <main>
        <div class="title-navbar">
          <title-navbar> </title-navbar>
        </div>
        <div class="home-body">
          <home-page> </home-page>
        </div>
      </main>
    `;
  }
}
