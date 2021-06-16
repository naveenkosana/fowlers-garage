import { LitElement, html, css } from 'lit-element';

export class HomePage extends LitElement {
  static get properties() {
    return {
      carsData: { type: Array },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.carsData = [];
    this.onlyCarsData = [];
  }

  firstUpdated() {
    fetch('http://localhost:5000/getAllCarsData')
      .then(res => res.json())
      .then(res => {
        this.carsData = res;
        res.forEach(warehouse => {
          this.onlyCarsData.push(...warehouse?.cars?.vehicles);
        });
      });
  }

  render() {
    const { onlyCarsData } = this;
    return html`
      <link rel="stylesheet" href="./src/styles/home-page-styles.css" />
      <div class="cars-data-container">
        <div class="controls-panel"></div>
        <div class="car-data-panel">
          ${onlyCarsData.map(
            car => html`
              <div class="car-card">
                <img
                  src="https://via.placeholder.com/200x100?text=Car+Image+Here"
                  alt="Car"
                />
                <div class="card-container">
                  <h4><b> ${car.make} </b></h4>
                  <p>${car.model}</p>
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}
