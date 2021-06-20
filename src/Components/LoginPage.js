import { LitElement, html, css } from 'lit-element';

export class LoginPage extends LitElement {
  static get properties() {
    return {
      userName: { type: String },
      password: { type: String },
      showHomePage: { type: Boolean },
      userObj: { type: Object },
    };
  }

  static get styles() {
    return css`
      .website-title {
        height: 20vh;
      }
      .container {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        height: 60vh;
      }
    `;
  }

  constructor() {
    super();
    this.showHomePage = false;
  }

  /**
   * EventHandler : Login Success
   * Check if the provided credentials are valid and then show the Home Page if valid
   */
  _checkLogin() {
    const userInfo = {
      username: this.shadowRoot.getElementById('username-input').value,
      password: this.shadowRoot.getElementById('password-input').value,
    };

    fetch('http://localhost:5000/authenticateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(res => {
        if (res === 'false' || res === 'User Not Found') {
          alert('Invalid Username/Password. Please try again.');
        } else {
          console.log('Login Successful');
          this.showHomePage = true;
          this.userObj = res;
          this._fireShowHomePage();
        }
      });
  }

  /**
   * EventHandler && EventDispatcher : Login Success
   * Capture the sort parameter selected from dropdown and dispatch the event to Home Page component to re-render the view
   */
  _fireShowHomePage() {
    const event = new CustomEvent('login-success', {
      detail: {
        showHomePage: this.showHomePage,
        userObj: this.userObj,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="website-title">
        <h1>Fowler's Garage</h1>
      </div>
      <div class="container">
        <label for="username"
          ><h3><b>Username</b></h3></label
        >
        <input
          id="username-input"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label for="password"
          ><h3><b>Password</b></h3></label
        >
        <input
          id="password-input"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <lion-button type="submit" @click=${this._checkLogin}
          >Login</lion-button
        >
      </div>
    `;
  }
}
