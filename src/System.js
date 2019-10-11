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
    // we need to sort the list of driver data by the miles driven -- most to least
    const sortedDriverData = _.orderBy(this.drivers, 'miles', 'desc');

    // return the list of generated report sentences for each driver
    return sortedDriverData.map(System.generateDriverReport);
  }

  /* istanbul ignore next */
  printReport() {
    const reports = this.generateReports();
    reports.forEach(report => console.log(report)); // eslint-disable-line no-console
  }

  static generateDriverReport({ name, miles, speed }) {
    return miles
      ? `${name}: ${miles} miles @ ${speed} mph`
      : `${name}: 0 miles`;
  }
}

module.exports = System;
