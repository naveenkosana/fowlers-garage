import { LitElement, html } from 'lit-element';

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

  /**
   * Initial Function that creates the first page of the pagination.
   */
  paginateCarsList() {
    this.pageCount = Math.ceil(this.onlyCarsData.length / this.pageSize);
    this.paginatedCarsData = this.onlyCarsData.slice(
      0,
      this.onlyCarsData.length < this.pageSize
        ? this.onlyCarsData.length
        : this.pageSize
    );
  }

  /**
   * EventHandler : Sort by parameter
   * Sort the vehicles based on the event emitted from Filter Panel Component and re-render the view
   */
  _handleSort(event) {
    const { sortParameter } = event.detail;
    switch (sortParameter) {
      case 'dateAscending':
        this.onlyCarsData.sort((a, b) =>
          a.date_added.localeCompare(b.date_added)
        );
        break;
      case 'dateDescending':
        this.onlyCarsData.sort((a, b) =>
          b.date_added.localeCompare(a.date_added)
        );
        break;
      case 'priceAscending':
        this.onlyCarsData.sort((a, b) => a.price - b.price);
        break;
      case 'priceDescending':
        this.onlyCarsData.sort((a, b) => b.price - a.price);
        break;
      case 'yearModelAscending':
        this.onlyCarsData.sort((a, b) => a.year_model - b.year_model);
        break;
      case 'yearModelDescending':
        this.onlyCarsData.sort((a, b) => b.year_model - a.year_model);
        break;
      default:
        this.onlyCarsData.sort((a, b) =>
          a.date_added.localeCompare(b.date_added)
        );
        break;
    }

    this.paginateCarsList(); // to paginate the sorted vehicle list
    this.shadowRoot.getElementById('home-pagination-component').first(); // to navigate to the first page of vehicle list after sorting
  }

  /**
   * EventHandler : Pagination Click
   * Show vehicles based on the page selected
   */
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
          <filter-panel
            .carsData=${this.carsData}
            @sort-event="${e => this._handleSort(e)}"
          >
          </filter-panel>
        </div>
        <div class="car-data-panel">
          ${paginatedCarsData.map(
            vehicle => html`
              <vehicle-card .vehicle=${vehicle}> </vehicle-card>
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
