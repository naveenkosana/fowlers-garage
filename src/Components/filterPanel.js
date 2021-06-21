import { LitElement, html, css } from 'lit-element';

export class FilterPanel extends LitElement {
  static get properties() {
    return {
      carsData: { type: Array },
    };
  }

  static get styles() {
    return css`
      #filter-panel-sort-dropdown lion-select-invoker {
        border: 1px solid black;
        cursor: pointer;
        color: #2b6777;
        background-color: #c8d8e4;
      }

      #filter-panel-sort-dropdown lion-option[checked],
      #filter-panel-sort-dropdown lion-option[active] {
        background-color: #2b6777;
        color: #c8d8e4;
      }

      #filter-panel-sort-dropdown lion-option:hover {
        background-color: #ffffff;
        color: #2b6777;
      }

      #filter-panel-sort-dropdown lion-option {
        background-color: #c8d8e4;
        color: #2b6777;
      }
    `;
  }

  /**
   * EventHandler && EventDispatcher : Sort Parameter
   * Capture the sort parameter selected from dropdown and dispatch the event to Home Page component to re-render the view
   */
  _sortChanged(e) {
    const event = new CustomEvent('sort-event', {
      detail: {
        sortParameter: e.target.modelValue,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <lion-select-rich
        id="filter-panel-sort-dropdown"
        name="sortBy"
        @model-value-changed=${this._sortChanged}
      >
        <lion-option .choiceValue=${'dateAscending'}
          >Date Added - Old to New</lion-option
        >
        <lion-option .choiceValue=${'dateDescending'}
          >Date Added - New to Old</lion-option
        >
        <lion-option .choiceValue=${'priceAscending'}
          >Price - Low to High</lion-option
        >
        <lion-option .choiceValue=${'priceDescending'}
          >Price - High to Low</lion-option
        >
        <lion-option .choiceValue=${'yearModelAscending'}
          >Model - Oldest to Newest</lion-option
        >
        <lion-option .choiceValue=${'yearModelDescending'}
          >Model - Newest to Oldest</lion-option
        >
      </lion-select-rich>
    `;
  }
}
