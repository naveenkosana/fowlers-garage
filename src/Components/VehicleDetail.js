import { LitElement, html, css } from 'lit-element';
// eslint-disable-next-line import/no-unresolved
import apiKey from '../../assets/GOOGLE_API_KEY.js';

export class VehicleDetail extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
      location_url: { type: String },
      google_api_key: { type: String },
    };
  }

  firstUpdated() {
    this.google_api_key = apiKey.api_key;
    this.location_url = `https://www.google.com/maps/embed/v1/place?q=${this.vehicle.warehouse_location.lat},+${this.vehicle.warehouse_location.long}&zoom=7&key=${this.google_api_key}`;
  }

  static get styles() {
    return css`
      .vehicle-detail-dialog {
        width: 70vw;
        height: 70vh;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .vehicle-detail-dialog .vehicle-detail-dialog-header {
        display: inline-flex;
        justify-content: flex-end;
      }

      .vehicle-detail-dialog .vehicle-detail-dialog-body {
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: space-evenly;
      }

      .vehicle-detail-dialog-body .vehicle-detail-half {
        width: 50%;
      }

      .vehicle-detail-dialog-body
        .vehicle-detail-left
        .vehicle-image-container
        img {
        height: 90%;
        outline: 1px solid rgba(0, 0, 0, 0.2);
      }

      .vehicle-detail-dialog-body
        .vehicle-detail-left
        .vehicle-map-location
        iframe {
        height: 80%;
        width: 80%;
        outline: 1px solid rgba(0, 0, 0, 0.2);
      }

      .vehicle-detail-left {
        display: flex;
        flex-direction: column;
      }

      .vehicle-detail-left .vehicle-detail-left-half {
        height: 50%;
        text-align: center;
      }

      .vehicle-detail-right .vehicle-detail-right-half {
        height: 50%;
      }

      .vehicle-general-details {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
      }

      .vehicle-general-details span {
        padding-top: 1%;
        width: 45%;
        height: 4vh;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    `;
  }

  _closeDialog() {
    const event = new Event('close-overlay', { bubbles: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="vehicle-detail-dialog">
        <div class="vehicle-detail-dialog-header">
          <button class="close-button" @click=${this._closeDialog}>⨯</button>
        </div>
        <div class="vehicle-detail-dialog-body">
          <div class="vehicle-detail-left vehicle-detail-half">
            <div class="vehicle-image-container vehicle-detail-left-half">
              <img src="${this.vehicle.img_url}" alt="Car" />
            </div>
            <div class="vehicle-map-location vehicle-detail-left-half">
              <iframe
                width="100%"
                height="100%"
                title="vehicle-location"
                style="border:0"
                loading="lazy"
                allowfullscreen
                src=${this.location_url}
              ></iframe>
            </div>
          </div>
          <div class="vehicle-detail-right vehicle-detail-half">
            <div class="vehicle-details vehicle-detail-right-half">
              <h3>General Details</h3>
              <div class="vehicle-general-details">
                <span><b> ${this.vehicle.make} ${this.vehicle.model}</b></span>
                <span><b> € ${this.vehicle.price} </b></span>
                <span>${this.vehicle.year_model} Model</span>
                <span>Automatic Transmission</span>
                <span
                  >${this.vehicle.warehouse_name} -
                  ${this.vehicle.cars_location}</span
                >
                <span>Added on ${this.vehicle.date_added}</span>
              </div>
            </div>
            <div
              class="vehicle-detail-testdrive vehicle-detail-right-half"
            ></div>
          </div>
        </div>
        <!-- <div class="vehicle-detail-dialog-footer"></div> -->
      </div>
    `;
  }
}
