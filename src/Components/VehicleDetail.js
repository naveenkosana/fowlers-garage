import { LitElement, html } from 'lit-element';

export class VehicleDetail extends LitElement {
  static get properties() {
    return {
      vehicleData: { type: Object },
    };
  }

  render() {
    return html` <div>Vehicle Detail</div> `;
  }
}
