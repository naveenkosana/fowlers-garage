# Fowlers Garage

### Intro to the Users:

Welcome to Fowler's Garage. A one stop shop to explore second hand cars. We aim to give the cars one more chance to rule the roads! Using this application, you can choose cars ranging from Toyota to Porsche all under one roof. If you like a car and want to do a test drive, you can very well do that. We provide an option to book appointment from the available time slots on any selected date within next 30days. Please mind that you can only choose cars which are available and licensed for a test drive. Why wait.. Go ahead and start exploring the beasts!!

## Quickstart

To get started:

1. Clone this repository to your local or download the repository and then extract it.
2. Make sure you have NodeJS (npm) installed on your system.
3. Run the command `npm install` in the repository directory (fowlers-garage-main)
4. Navigate to the folder named "server" inside the project and run the command `npm install` to install server side code (NodeJS) dependencies.
5. Navigate to the server folder, and in your terminal run the command `node app.js` to run the express server which serves as the backend for this application
6. Go one folder up and inside the fowlers-garage-main folder, run `npm start` command for starting the client side application. Navigate to `http://localhost:8000/`. The app will automatically reload if you change any of the source files.
7. The application features a static login page and you can enter the following username/password combinations to Login:
   `user1/password`
   `user2/password`
   `user3/password`
8. That's it! You are all setup to use the application on your local.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features

1. The application uses a login feature though it is static and doesn't create any user session. However, appointments booked for any test drive will be mapped to the user who logged in.
2. Home page will initially load all the available vehicles across all the warehouses and will be sorted and arranged according to the Date added in ascending order.
3. Pagination has been added, so only 12 items (3x4) grid will be shown in a single page. You can navigate to other pages using the pagination toolbar provided in the bottom part of the page
4. There are other sort options provided on the top right of tha page, in the dort dropdown. Using this, you can sort the cars based on price (low to high and vice-versa), model year (old to new and vice-versa), etc. Choosing any the items in the dropdown will result in re-rendering of the sorted cars page.
5. Cars which are not licensed are blurred out and a flag 'Not Available' is shown on the card with red color. These cards are not clickable. However, cars which are available will be in "Available" state and can be clicked to view the details.
6. Some random free-to-use images from Internet have been added to the cars randomly to improve the look of the application.
7. When clicked on an available car, You can view the details of the car along with the car image and the warehouse location in an embedded Google Map. The Map was initially implemented using Google Map API using an API key, but as the key can't be added to the public Git repo, only a static map has been embedded showing the location of the warehouses which was provided in the json data file.
8. A datepicker has been included to select a date for a test drive. The datepicker will show only the next 30 days and weekends are disabled. Also, if all the timeslots on a particular date are completely booked, that particular date would also be disabled in the datepicker.
9. Once a date has been picked and "Select a Slot" button is clicked, the timepicker dropdown will be enabled. It will show all the timeslots (30min gap) that are available for the selected date. Timeslots which are already selected by other users are not shown in the timepicker. After selecting a timeslot, clicking on "Book" button will book the appointment and store the details in the server.

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Technologies Used

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

[Lion Web Components](https://lion-web.netlify.app/components/)

[lit-html](https://lit-html.polymer-project.org/) and [lit-element](https://lit-element.polymer-project.org/)

[npm](http://npmjs.com/)

[Open Web Components](https://github.com/open-wc)

[ESLint](https://eslint.org/)

[prettier](https://prettier.io/)

[ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)


###Developed by
Naveen Kosana
