/* eslint-disable guard-for-in */
import { LitElement, html, css } from 'lit-element';
// import apiKey from '../../assets/GOOGLE_API_KEY.js';   // Uncomment for implementing Google Maps API using api_key
// import { formatDate } from '@lion/localize';
import { MinMaxDate, IsDateDisabled } from '@lion/form-core';

export class VehicleDetail extends LitElement {
  static get properties() {
    return {
      vehicle: { type: Object },
      location_url: { type: String },
      google_api_key: { type: String },
      timeSlots: { type: Array },
      updatedTimeSlots: { type: Array },
      selectedDate: { type: Date },
      selectedTime: { type: String },
      userObj: { type: Object },
      bookedSlotsForFutureDates: { type: Object },
      slotsAvailable: { type: Array },
      datesNotAvailable: { type: Array },
      loadDateTime: { type: Boolean },
      showTimeSlotDropdown: { type: Boolean },
    };
  }

  firstUpdated() {
    this.getBookedSlotInformation();

    // Uncomment for implementing Google Maps API using api_key
    //   this.google_api_key = apiKey.api_key;
    //   this.location_url = `https://www.google.com/maps/embed/v1/place?q=${this.vehicle.warehouse_location.lat},+${this.vehicle.warehouse_location.long}&zoom=7&key=${this.google_api_key}`;
  }

  constructor() {
    super();
    this.loadDateTime = false;
    this.showTimeSlotDropdown = false;
    this.selectedDate = new Date().toLocaleDateString('en-CA');
    this.datesNotAvailable = [];
    this.updatedTimeSlots = [];
    this.timeSlots = [
      '0800',
      '0830',
      '0900',
      '0930',
      '1000',
      '1030',
      '1100',
      '1130',
      '1200',
      '1230',
      '1300',
      '1330',
      '1400',
      '1430',
      '1500',
      '1530',
      '1600',
      '1630',
    ];
  }

  static get styles() {
    return css``;
  }

  /**
   * EventHandler : Google Maps Location
   * Select the Static Gooogle Maps URLs based on the warehouse
   */
  _getLocationUrl() {
    switch (this.vehicle.warehouse_id) {
      case '1':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491161.6201323394!2d-61.880472020605644!3d47.1517722669922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA3JzUyLjAiTiA2McKwMzInNTIuOCJX!5e0!3m2!1sen!2shu!4v1624124437034!5m2!1sen!2shu';

      case '2':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048504.815062617!2d5.920694892489735!3d16.117896928131966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDU3JzEzLjkiTiA3wrAwMyc0NC45IkU!5e0!3m2!1sen!2shu!4v1624124530615!5m2!1sen!2shu';

      case '3':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d282201.5197642751!2d-2.917322328164766!3d39.118193566948946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDA3JzQwLjQiTiAywrA0Mic1MC4zIlc!5e0!3m2!1sen!2shu!4v1624117953060!5m2!1sen!2shu';

      case '4':
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20168100.929967623!2d96.47684861257753!3d-72.02956954141905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNzDCsDUwJzM2LjciUyAxMzLCsDEzJzI0LjQiRQ!5e0!3m2!1sen!2shu!4v1624124604396!5m2!1sen!2shu';

      default:
        return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d491161.6201323394!2d-61.880472020605644!3d47.1517722669922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDA3JzUyLjAiTiA2McKwMzInNTIuOCJX!5e0!3m2!1sen!2shu!4v1624124437034!5m2!1sen!2shu';
    }
  }

  /**
   * EventHandler : Appointment Date
   * Capture the selected date from DatePicker and store
   */
  _dateChanged(e) {
    this.selectedDate = new Date(e.target.modelValue);
    this.selectedDate = this.selectedDate.toLocaleDateString('en-CA');
    this.showTimeSlotDropdown = false;
  }

  /**
   * EventHandler : Book Appointment
   * Get the Date and Time selected by user and send the request to server to store the slot details
   */
  _bookTimeSlot() {
    if (
      this.shadowRoot.getElementById('testdrive-date-picker').modelValue ===
        '' ||
      this.shadowRoot.getElementById('time-slot-lion-select').modelValue === ''
    ) {
      alert('Please select both the Date and Time and click on Book');
    } else {
      const timeSlot = this.shadowRoot.getElementById(
        'time-slot-lion-select'
      ).modelValue;
      const newSlot = {
        user_id: this.userObj.userId,
        time_text: timeSlot,
        dateTime: `${this.selectedDate} ${timeSlot.substring(
          0,
          2
        )}:${timeSlot.substring(2, 4)}`,
        car_id: this.vehicle._id,
      };

      fetch('http://localhost:5000/createSlot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Slot Booked Successfully');
          this._closeDialog();
        })
        .catch(error => {
          console.error('Error:', error);
          alert(
            "We're currently experiencing some issues. Please try again later"
          );
        });
    }
  }

  /**
   * EventHandler : Appointment Information
   * Fetch the appointment information for the selected vehicle and filter the available dates and timeslots
   */
  getBookedSlotInformation() {
    if (
      this.shadowRoot.getElementById('testdrive-date-picker')?.modelValue === ''
    ) {
      alert('Please select the Date to view the available slots');
    } else {
      fetch(`http://localhost:5000/getSlots/${this.vehicle._id}`)
        .then(res => res.json())
        .then(res => {
          this.bookedSlotsForFutureDates = res;
          this.collectDatesAvailable();
          this.collectTimeSlotsAvailable();
        });
    }
  }

  _closeDialog() {
    const event = new Event('close-overlay', { bubbles: true });
    this.dispatchEvent(event);
    this.showTimeSlotDropdown = false;
  }

  /**
   * Refresh the available dates information which would re-render the datepicker
   */
  collectDatesAvailable() {
    // eslint-disable-next-line no-restricted-syntax
    for (const date in this.bookedSlotsForFutureDates.appointment_info) {
      if (
        this.bookedSlotsForFutureDates.appointment_info[date].length ===
        this.timeSlots.length
      ) {
        this.datesNotAvailable.push(new Date(date).toLocaleDateString('en-CA'));
      }
    }
    this.loadDateTime = true;
  }

  /**
   * Refresh the available time slots information for the selected Date and display the timepicker
   */
  collectTimeSlotsAvailable() {
    if (
      this.bookedSlotsForFutureDates.appointment_info !== undefined &&
      this.bookedSlotsForFutureDates.appointment_info[this.selectedDate] !==
        undefined
    ) {
      this.updatedTimeSlots = this.timeSlots.filter(
        time =>
          this.bookedSlotsForFutureDates.appointment_info[
            this.selectedDate
          ].findIndex(tm => tm === time) === -1
      );
    } else {
      this.updatedTimeSlots = this.timeSlots;
    }

    this.showTimeSlotDropdown = true;
  }

  /**
   * Disable the dates which have all the time slots booked and also weekends.
   */
  // eslint-disable-next-line class-methods-use-this
  _disableDates(d) {
    return (
      d.getDay() === 6 ||
      d.getDay() === 0 ||
      d.toLocaleDateString('en-CA') ===
        this.datesNotAvailable.find(dt => dt === d.toLocaleDateString('en-CA'))
    );
  }

  render() {
    const placementRightConfig = { popperConfig: { placement: 'right' } };
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 1));
    const maxDate = new Date(today.setDate(today.getDate() + 30));
    let _datePickerTemplate;
    let _timePickerTemplate;
    if (this.showTimeSlotDropdown) {
      _timePickerTemplate = html`
        <div id="time-selection-dropdown-container">
          <h4>Select an available time:</h4>
          <div id="time-selection-dropdown">
            <lion-select id="time-slot-lion-select" name="book-time-slot">
              <select id="time-slot-select" slot="input">
                <option selected hidden value>Please select</option>
                ${this.updatedTimeSlots.map(
                  timeSlot => html`
                    <option value=${timeSlot}>
                      ${`${timeSlot.substring(0, 2)}:${timeSlot.substring(
                        2,
                        4
                      )}`}
                    </option>
                  `
                )}
              </select>
            </lion-select>
            <lion-button @click=${this._bookTimeSlot}>Book</lion-button>
          </div>
        </div>
      `;
    }

    if (this.loadDateTime) {
      _datePickerTemplate = html`
        <div class="vehicle-detail-testdrive vehicle-detail-right-half">
          <h3>Book a Slot for Test Drive</h3>
          <div id="lion-datepicker">
            <lion-input-datepicker
              id="testdrive-date-picker"
              label="Test Drive Date"
              help-text="You can book an appointment for the next 30days."
              .config=${placementRightConfig}
              @model-value-changed=${e => this._dateChanged(e)}
              .validators=${[
                new MinMaxDate({
                  min: minDate,
                  max: maxDate,
                }),
                new IsDateDisabled(d => this._disableDates(d)),
              ]}
            >
            </lion-input-datepicker>
            <lion-button @click=${this.getBookedSlotInformation}
              >Select a Slot</lion-button
            >
          </div>
          <!-- Time Picker Template Here -->
          ${_timePickerTemplate}
        </div>
      `;
    }
    return html`
      <link rel="stylesheet" href="./src/styles/vehicle-detail.css" />
      <div class="vehicle-detail-dialog">
        <div class="vehicle-detail-dialog-header">
          <button class="close-button" @click=${this._closeDialog}>⨯</button>
        </div>
        <div class="vehicle-detail-dialog-body">
          <div class="vehicle-detail-left vehicle-detail-half">
            <div class="vehicle-image-container vehicle-detail-left-half">
              <img src="${this.vehicle.img_url}" alt="Car" />
            </div>
            <div class="vehicle-details vehicle-detail-left-half">
              <h3>${this.vehicle.make} ${this.vehicle.model}</h3>
              <div class="vehicle-general-details">
                <span style="color:Green"> Available </span>
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
          </div>
          <div class="vehicle-detail-right vehicle-detail-half">
            <!-- Datepicker here -->
            ${_datePickerTemplate}
            <div class="vehicle-map-location vehicle-detail-right-half">
              <iframe
                width="100%"
                height="100%"
                title="vehicle-location"
                style="border:0"
                loading="lazy"
                allowfullscreen
                src=${this._getLocationUrl()}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
