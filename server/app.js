const express = require('express');

const fs = require('fs');

const cors = require('cors');

const app = express();

app.use(cors());

const carsRawData = fs.readFileSync('assets/fowlersCarsStock.json');
const carsData = JSON.parse(carsRawData);

/**
 * Get data of all the Cars in stock.
 */
app.get('/getAllCarsData', (req, res) => {
  res.json(carsData);
});

/**
 * Get data of all the Cars in specific Warehouse.
 * @param {Number} Warehouse Id
 */
app.get('/getCarsDataFromWarehouse/:id', (req, res) => {
  res.json(carsData.find(warehouse => warehouse._id === req.params.id));
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
