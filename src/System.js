const _ = require('lodash');

const Driver = require('./Driver');
const Trip = require('./Trip');

class System {
  constructor() {
    this.drivers = {};
  }

  addDriver(instructions) {
    const driver = Driver.createFromInstructions(instructions);
    this.drivers[driver.name] = driver;
  }

  addTrip(instructions) {
    const trip = Trip.createFromInstructions(instructions);
    this.drivers[trip.driverName].addTrip(trip);
  }

  processInstruction(instruction) {
    const instructions = instruction.split(' ');
    const command = instructions[0];
    switch (command) {
      case 'Driver':
        this.addDriver(instructions);
        break;
      case 'Trip':
        this.addTrip(instructions);
        break;
      default:
        break;
    }
  }

  generateReports() {
    const driverData = [];
    const driverNames = Object.keys(this.drivers);
    driverNames.forEach(driverName => {
      const driver = this.drivers[driverName];
      driverData.push(driver.generateDriverData());
    });

    const sortedDriverData = _.orderBy(driverData, 'totalMilesDriven', 'desc');

    return sortedDriverData.map(System.generateDriverReport);
  }

  /* istanbul ignore next */
  printReport() {
    const reports = this.generateReports();
    reports.forEach(report => console.log(report)); // eslint-disable-line no-console
  }

  static generateDriverReport({ name, totalMilesDriven, averageSpeed }) {
    return totalMilesDriven
      ? `${name}: ${totalMilesDriven} miles @ ${averageSpeed} mph`
      : `${name}: 0 miles`;
  }
}

module.exports = System;
