import { LitElement, html, css } from 'lit-element';

export class VehicleDetail extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
      location_url: { type: String },
      google_api_key: { type: String },
    };
  }

  firstUpdated() {
    this.google_api_key = 'AIzaSyD67_28pP5M4KzCc2OnLv87i72kmDVcnsc';
    this.location_url = `https://www.google.com/maps/embed/v1/place?q=${this.vehicle.warehouse_location.lat},+${this.vehicle.warehouse_location.long}&key=${this.google_api_key}`;
  }

  static get styles() {
    return css`
      .vehicle-detail-dialog {
        width: 70vw;
        height: 70vh;
        background-color: white;
        display: flex;
        flex-direction: column;
      }

      .vehicle-detail-dialog .vehicle-detail-dialog-header {
        display: inline-flex;
        justify-content: flex-end;
      }

      .vehicle-detail-dialog .vehicle-detail-dialog-body {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      .vehicle-detail-dialog-body div {
        width: 33%;
      }

      .vehicle-detail-dialog-body .vehicle-image-container img {
        width: 100%;
      }

      .vehicle-detail-dialog-body .vehicle-map-location iframe {
        width: 100%;
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
          <div class="vehicle-image-container">
            <img src="${this.vehicle.img_url}" alt="Car" />
          </div>
          <div class="vehicle-map-location">
            <iframe
              width="600"
              height="450"
              title="vehicle-location"
              style="border:0"
              loading="lazy"
              allowfullscreen
              src=${this.location_url}
            ></iframe>
          </div>
          <div class="vehicle-details">
            <ul>
              <li>Car - ${this.vehicle.make} ${this.vehicle.model}</li>
              <li>Model - ${this.vehicle.year_model}</li>
              <li>Price - ${this.vehicle.price}</li>
              <li>Warehouse - ${this.vehicle.warehouse_name}</li>
              <li>Location - ${this.vehicle.cars_location}</li>
            </ul>
          </div>
        </div>
        <div class="vehicle-detail-dialog-footer"></div>
      </div>
    `;
  }
}
