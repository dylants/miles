const moment = require('moment');

class Driver {
  constructor(name) {
    this.name = name;
    this.totalMinutesDriven = 0;
    this.totalMilesDriven = 0;
  }

  addTrip(trip) {
    this.totalMinutesDriven += Driver.calculateMinutesBetween(trip);
    this.totalMilesDriven += trip.milesDriven;
  }

  generateDriverData() {
    if (this.totalMilesDriven === 0) {
      return {
        averageSpeed: 0,
        name: this.name,
        totalMilesDriven: this.totalMilesDriven,
      };
    }

    const totalMilesDriven = Math.round(this.totalMilesDriven);
    const averageSpeed = Math.round(
      this.totalMilesDriven / (this.totalMinutesDriven / 60),
    );
    return {
      averageSpeed,
      name: this.name,
      totalMilesDriven,
    };
  }

  static calculateMinutesBetween({ startTime, endTime }) {
    const startMoment = moment(startTime, 'kk:mm');
    const endMoment = moment(endTime, 'kk:mm');
    return moment.duration(endMoment.diff(startMoment)).asMinutes();
  }

  static createFromInstructions(instructions) {
    const name = instructions[1];
    return new Driver(name);
  }
}

module.exports = Driver;
