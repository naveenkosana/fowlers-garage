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
      <ul>
        ${onlyCarsData.map(car => html` <div>${car.make}</div> `)}
      </ul>
    `;
  }
}
