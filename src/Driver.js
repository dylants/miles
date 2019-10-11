const moment = require('moment');

class Driver {
  constructor(name) {
    this.name = name;
    this.totalMinutesDriven = 0;
    this.totalMilesDriven = 0;

    // display values
    this.miles = 0;
    this.speed = 0;
  }

  addTrip(trip) {
    // calculate the trip details
    const tripMinutes = Driver.calculateMinutesBetween(trip);
    const tripSpeed = Driver.calculateAverageSpeed({
      miles: trip.milesDriven,
      minutes: tripMinutes,
    });

    // Discard any trips that average a speed of less than 5 mph or greater than 100 mph
    if (tripSpeed < 5 || tripSpeed > 100) {
      return;
    }

    this.totalMinutesDriven += tripMinutes;
    this.totalMilesDriven += trip.milesDriven;

    // Round miles to the nearest integer for display
    this.miles = Math.round(this.totalMilesDriven);

    // only if we've traveled some distance do we update the display speed
    if (this.miles > 0) {
      this.speed = Driver.calculateAverageSpeed({
        miles: this.totalMilesDriven,
        minutes: this.totalMinutesDriven,
      });
    }
  }

  static calculateMinutesBetween({ startTime, endTime }) {
    const startMoment = moment(startTime, 'kk:mm');
    const endMoment = moment(endTime, 'kk:mm');
    return moment.duration(endMoment.diff(startMoment)).asMinutes();
  }

  static calculateAverageSpeed({ miles, minutes }) {
    // Round miles per hour to the nearest integer
    return Math.round(miles / (minutes / 60));
  }

  static createFromInstructions(instructions) {
    const name = instructions[1];
    return new Driver(name);
  }
}

module.exports = Driver;
