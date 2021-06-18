const express = require('express');

const fs = require('fs');

const cors = require('cors');

const app = express();

app.use(cors());

const carsRawData = fs.readFileSync('assets/fowlersCarsStockWithImgs.json');
const carsData = JSON.parse(carsRawData);
const onlyCarsData = [];
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
