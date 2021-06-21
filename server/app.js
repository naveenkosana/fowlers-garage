const express = require('express');

const fs = require('fs');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());

const userDataFile = fs.readFileSync('assets/user.json');
const userData = JSON.parse(userDataFile);

const carsRawData = fs.readFileSync('assets/fowlersCarsStockWithImgs.json');
const carsData = JSON.parse(carsRawData);
const onlyCarsData = [];

const testDriveSlotsFileUrl = 'assets/testDriveAppointments.json';

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
 * Check If Valid User.
 */
app.post('/authenticateUser', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const { username, password } = req.body;

  const userIndex = userData.findIndex(user => user.username === username);

  if (userIndex === -1) {
    return res.json('User Not Found');
  }

  if (userData[userIndex].password !== password) {
    return res.json('false');
  }

  const userObj = {
    userId: userData[userIndex]._id,
    username: userData[userIndex].username,
  };

  return res.json(userObj);
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
  const testDriveSlots = fs.readFileSync(testDriveSlotsFileUrl);
  const testDriveSlotsData = JSON.parse(testDriveSlots);
  const carSlotData = testDriveSlotsData.find(
    car => car.car_id === parseInt(req.params.id, 10)
  );

  let today = new Date();
  today = today.toLocaleDateString('en-CA');

  if (carSlotData === undefined) {
    return res.json('No Slot Info Found');
  }

  const carSlotObj = {
    car_id: carSlotData.car_id,
    appointment_info: {},
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const date in carSlotData.appointment_info) {
    if (date >= today) {
      carSlotObj.appointment_info[date] = [];
      carSlotData.appointment_info[date].forEach(d => {
        if (d.status === 'booked')
          carSlotObj.appointment_info[date].push(d.time_text);
      });
    }
  }

  return res.json(carSlotObj);
});

/**
 * Add Test Drive slot information for a specific car
 */
app.post('/createSlot', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const testDriveSlots = fs.readFileSync(testDriveSlotsFileUrl);
  const testDriveSlotsData = JSON.parse(testDriveSlots);
  const newSlotFromClient = req.body;

  const newSlot = {
    user_id: newSlotFromClient.user_id,
    time_text: newSlotFromClient.time_text,
    time: newSlotFromClient.dateTime,
    status: 'booked',
  };

  let newDate = new Date(newSlot.time);
  newDate = newDate.toLocaleDateString('en-CA');

  const carIndex = testDriveSlotsData.findIndex(
    car => car.car_id === parseInt(newSlotFromClient.car_id, 10)
  );

  if (carIndex === -1) {
    // add car and booked slot detail
    testDriveSlotsData.push({
      car_id: parseInt(newSlotFromClient.car_id, 10),
      appointment_info: {
        [newDate]: [newSlot],
      },
    });
  } else {
    // add new slot details to existing car object
    if (testDriveSlotsData[carIndex].appointment_info[newDate] === undefined) {
      testDriveSlotsData[carIndex].appointment_info[newDate] = [];
    }

    testDriveSlotsData[carIndex].appointment_info[newDate].push(newSlot);
  }

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
