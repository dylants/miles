const fs = require('fs');
const readline = require('readline');
const _ = require('lodash');

const Driver = require('./Driver');
const Trip = require('./Trip');

const drivers = {};

function addDriver(instructions) {
  const driver = Driver.createFromInstruction(instructions);
  drivers[driver.name] = driver;
}

function addTrip(instructions) {
  const trip = Trip.createFromInstruction(instructions);
  drivers[trip.driverName].addTrip(trip);
}

function processInstruction(instruction) {
  const instructions = instruction.split(' ');
  const command = instructions[0];
  switch (command) {
    case 'Driver':
      addDriver(instructions);
      break;
    case 'Trip':
      addTrip(instructions);
      break;
    default:
      break;
  }
}

function printDriverReport({ name, totalMilesDriven, averageSpeed }) {
  const string = totalMilesDriven
    ? `${name}: ${totalMilesDriven} miles @ ${averageSpeed} mph`
    : `${name}: 0 miles`;
  console.log(string); // eslint-disable-line no-console
}

function report() {
  const driverReports = [];
  const driverNames = Object.keys(drivers);
  driverNames.forEach(driverName => {
    const driver = drivers[driverName];
    driverReports.push(driver.generateDriverData());
  });

  const sortedDriverReports = _.orderBy(
    driverReports,
    'totalMilesDriven',
    'desc',
  );
  sortedDriverReports.forEach(printDriverReport);
}

const inputFilePath = process.argv[2];
if (!inputFilePath) {
  throw new Error('Input file is required');
}

const input = fs.createReadStream(inputFilePath);
const rl = readline.createInterface({
  crlfDelay: Infinity,
  input,
});

rl.on('line', processInstruction);
rl.on('close', report);
