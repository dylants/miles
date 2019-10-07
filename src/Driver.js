const moment = require('moment');

class Driver {
  constructor(name) {
    this.name = name;
    this.totalMinutesDriven = 0;
    this.totalMilesDriven = 0;
  }

  addTrip(trip) {
    const minutes = Driver.calculateMinutesBetween(trip);
    const speed = Driver.calculateAverageSpeed({
      miles: trip.milesDriven,
      minutes,
    });
    // Discard any trips that average a speed of less than 5 mph or greater than 100 mph
    if (speed < 5 || speed > 100) {
      return;
    }

    this.totalMinutesDriven += minutes;
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
    const averageSpeed = Driver.calculateAverageSpeed({
      miles: this.totalMilesDriven,
      minutes: this.totalMinutesDriven,
    });
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

  static calculateAverageSpeed({ miles, minutes }) {
    return Math.round(miles / (minutes / 60));
  }

  static createFromInstructions(instructions) {
    const name = instructions[1];
    return new Driver(name);
  }
}

module.exports = Driver;
