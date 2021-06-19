import { LitElement, html, css } from 'lit-element';

export class VehicleDetail extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
    };
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
          Vehicle Detail: ${this.vehicle.warehouse_name}
        </div>
        <div class="vehicle-detail-dialog-footer"></div>
      </div>
    `;
  }
}
