import { LitElement, html, css } from 'lit-element';

export class VehicleCard extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
      userObj: { type: Object },
    };
  }

  static get styles() {
    return css`
      .car-card img {
        width: 100%;
        border-top-right-radius: 6%;
        border-top-left-radius: 6%;
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
      ${this.vehicle.licensed
        ? html`<lion-dialog .config="$">
            <div class="car-card" slot="invoker">
              <img src="${this.vehicle.img_url}" alt="Car" />
              <div class="card-container">
                <h3><b>${this.vehicle.make} ${this.vehicle.model}</b></h3>
                <p><b>€ ${this.vehicle.price}</b></p>
              </div>
              <div class="card-container">
                <p>Model: ${this.vehicle.year_model}</p>
                <p style="color: Green">Available</p>
              </div>
            </div>
            <vehicle-detail
              slot="content"
              .userObj=${this.userObj}
              .vehicle=${this.vehicle}
            ></vehicle-detail>
          </lion-dialog>`
        : html`<div class="car-card" style="opacity:0.5; cursor:default">
            <img src="${this.vehicle.img_url}" alt="Car" />
            <div class="card-container">
              <h3><b>${this.vehicle.make} ${this.vehicle.model}</b></h3>
              <p><b>€ ${this.vehicle.price}</b></p>
            </div>
            <div class="card-container">
              <p>Model: ${this.vehicle.year_model}</p>
              <p style="color: Red">Not Available</p>
            </div>
          </div> `}
    `;
  }
}
