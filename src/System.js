const _ = require('lodash');

const Driver = require('./Driver');
const Trip = require('./Trip');

class System {
  constructor() {
    this.drivers = {};
  }

  processDriver(instructions) {
    const driver = Driver.createFromInstructions(instructions);

    // collect the drivers into our map of drivers
    this.drivers[driver.name] = driver;
  }

  processTrip(instructions) {
    const trip = Trip.createFromInstructions(instructions);

    // allow the driver to perform the work of adding a trip
    this.drivers[trip.driverName].addTrip(trip);
  }

  processInstruction(instruction) {
    const instructions = instruction.trim().split(' ');
    const command = instructions[0];
    switch (command) {
      case 'Driver':
        this.processDriver(instructions);
        break;
      case 'Trip':
        this.processTrip(instructions);
        break;
      default:
        // TODO what to do with an unknown command?
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
