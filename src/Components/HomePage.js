import { LitElement, html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

export class HomePage extends LitElement {
  static get properties() {
    return {
      carsData: { type: Array },
      paginatedCarsData: { type: Array },
      pageCount: { type: Number },
      currentPage: { type: Number },
      userObj: { type: Object },
    };
  }

  constructor() {
    super();
    this.carsData = [];
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
        this.carsData.sort((a, b) => a.date_added.localeCompare(b.date_added));
        this.paginateCarsList();
      });
  }

  /**
   * Initial Function that creates the first page of the pagination.
   */
  paginateCarsList() {
    this.pageCount = Math.ceil(this.carsData.length / this.pageSize);
    this.paginatedCarsData = this.carsData.slice(
      0,
      this.carsData.length < this.pageSize
        ? this.carsData.length
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
        this.carsData.sort((a, b) => a.date_added.localeCompare(b.date_added));
        break;
      case 'dateDescending':
        this.carsData.sort((a, b) => b.date_added.localeCompare(a.date_added));
        break;
      case 'priceAscending':
        this.carsData.sort((a, b) => a.price - b.price);
        break;
      case 'priceDescending':
        this.carsData.sort((a, b) => b.price - a.price);
        break;
      case 'yearModelAscending':
        this.carsData.sort((a, b) => a.year_model - b.year_model);
        break;
      case 'yearModelDescending':
        this.carsData.sort((a, b) => b.year_model - a.year_model);
        break;
      default:
        this.carsData.sort((a, b) => a.date_added.localeCompare(b.date_added));
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
      ...this.carsData.slice(
        (event.target.current - 1) * this.pageSize,
        this.carsData.length < event.target.current * this.pageSize
          ? this.carsData.length
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
          ${repeat(
            paginatedCarsData,
            vehicle => vehicle._id,
            vehicle =>
              html`
                <vehicle-card .userObj=${this.userObj} .vehicle=${vehicle}>
                </vehicle-card>
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
