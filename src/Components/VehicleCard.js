import { LitElement, html, css } from 'lit-element';

export class VehicleCard extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
    };
  }

  static get styles() {
    return css`
      .car-card img {
        width: 100%;
        border-top-right-radius: 5%;
        border-top-left-radius: 5%;
      }

      .car-card .card-container {
        text-align: left;
        /* position: relative;
            left:7%; */
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: calc(6px + 1vmin);
      }

      .car-card .card-container h3,
      .car-card .card-container p {
        margin: 3%;
      }
    `;
  }

  render() {
    return html`
      <div class="car-card">
        <img src="${this.vehicle.img_url}" alt="Car" />
        <div class="card-container">
          <h3><b>${this.vehicle.make} ${this.vehicle.model}</b></h3>
          <p><b>€ ${this.vehicle.price}</b></p>
        </div>
        <div class="card-container">
          <p>Model: ${this.vehicle.year_model}</p>
          <p>${this.vehicle.licensed ? 'Licensed' : 'Not Licensed'}</p>
        </div>
      </div>
    `;
  }
}
