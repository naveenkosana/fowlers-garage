import { LitElement, html, css } from 'lit-element';

export class HomePage extends LitElement {
  static get properties() {
    return {
      carsData: { type: Array },
      onlyCarsData: { type: Array },
      paginatedCarsData: { type: Array },
      pageCount: { type: Number },
      currentPage: { type: Number },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.carsData = [];
    this.onlyCarsData = [];
    this.paginatedCarsData = [];
    this.pageCount = 1;
    this.currentPage = 1;
    this.pageSize = 12;
  }

  firstUpdated() {
    fetch('http://localhost:5000/getAllCarsData')
      .then(res => res.json())
      .then(res => {
        this.carsData = res;
        res.forEach(warehouse => {
          this.onlyCarsData.push(...warehouse?.cars?.vehicles);
          this.onlyCarsData.sort((a, b) =>
            a.date_added.localeCompare(b.date_added)
          );
          this.paginateCarsList();
        });
      });
  }

  paginateCarsList() {
    this.pageCount = Math.ceil(this.onlyCarsData.length / this.pageSize);
    this.paginatedCarsData = this.onlyCarsData.slice(
      0,
      this.onlyCarsData.length < this.pageSize
        ? this.onlyCarsData.length
        : this.pageSize
    );
  }

  _onPageClick(event) {
    this.paginatedCarsData = [
      ...this.onlyCarsData.slice(
        (event.target.current - 1) * this.pageSize,
        this.onlyCarsData.length < event.target.current * this.pageSize
          ? this.onlyCarsData.length
          : event.target.current * this.pageSize
      ),
    ];
    window.scroll({ top: 0 });
  }

  render() {
    const { paginatedCarsData } = this;
    return html`
      <link rel="stylesheet" href="./src/styles/home-page-styles.css" />
      <div class="cars-data-container">
        <div class="controls-panel">
          <p>Sort By: Date Added ascending</p>
        </div>
        <div class="car-data-panel">
          ${paginatedCarsData.map(
            car => html`
              <div class="car-card">
                <img src="${car.img_url}" alt="Car" />
                <div class="card-container">
                  <h3><b>${car.make} ${car.model}</b></h3>
                  <p><b>€ ${car.price}</b></p>
                </div>
                <div class="card-container">
                  <p>Model: ${car.year_model}</p>
                  <p>${car.licensed ? 'Licensed' : 'Not Licensed'}</p>
                </div>
              </div>
            `
          )}
        </div>
        <div class="home-pagination-panel">
          <lion-pagination
            id="home-pagination-component"
            count="${this.pageCount}"
            current="${this.currentPage}"
            @current-changed=${e => this._onPageClick(e)}
          ></lion-pagination>
        </div>
      </div>
    `;
  }
}
