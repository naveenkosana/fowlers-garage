const express = require('express');

const fs = require('fs');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());

const carsRawData = fs.readFileSync('assets/fowlersCarsStockWithImgs.json');
const carsData = JSON.parse(carsRawData);
const onlyCarsData = [];

const testDriveSlotsFileUrl = 'assets/testDriveAppointments.json';
const testDriveSlots = fs.readFileSync(testDriveSlotsFileUrl);
const testDriveSlotsData = JSON.parse(testDriveSlots);

/* Include Warehouse details for every car object available */
carsData.forEach(warehouse => {
  const carsWithWarehouseDetails = warehouse?.cars?.vehicles.map(vehicle => ({
    ...vehicle,
    warehouse_id: warehouse._id,
    warehouse_name: warehouse.name,
    warehouse_location: warehouse.location,
    cars_location: warehouse.cars.location,
  }));
  onlyCarsData.push(...carsWithWarehouseDetails);
});

/**
 * Get data of all the Cars in stock.
 */
app.get('/getAllCarsData', (req, res) => {
  res.json(onlyCarsData);
});

/**
 * Get data of all the Cars in specific Warehouse.
 * @param {Number} Warehouse Id
 */
app.get('/getCarsDataFromWarehouse/:id', (req, res) => {
  res.json(carsData.find(warehouse => warehouse._id === req.params.id));
});

/**
 * Get Booked Slots Information of Car
 * @param {Number} Car Id
 */
app.get('/getSlots/:id', (req, res) => {
  res.json(
    testDriveSlotsData.find(car => car.car_id === parseInt(req.params.id, 10))
  );
});

const _formatDate = d => {
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  const year = d.getFullYear().toString();

  month = month.length < 2 ? `0${month}` : month;
  day = day.length < 2 ? `0${day}` : day;

  return [year, month, day].join('-');
};

/**
 * Add Test Drive slot information for a specific car
 */
app.post('/createSlot', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const newSlotFromClient = req.body;

  const newSlot = {
    time: newSlotFromClient.time,
    status: 'booked',
  };

  // const newDate = new Date(newSlotFromClient.time);

  // // newDate = newDate.toLocaleDateString('en-CA')
  // // // eslint-disable-next-line no-unused-vars
  const dateKey = _formatDate(new Date(newSlotFromClient.time));

  testDriveSlotsData
    .find(car => car.car_id === parseInt(newSlotFromClient.car_id, 10))
    .booked_slots[dateKey].slots.push(newSlot);

  const rawJson = JSON.stringify(testDriveSlotsData);

  fs.writeFile(testDriveSlotsFileUrl, rawJson, 'utf8', err => {
    if (err) throw err;
    console.log('Added!!');
  });

  return res.json('true');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
