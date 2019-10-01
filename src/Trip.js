class Trip {
  constructor({ driverName, startTime, endTime, milesDriven }) {
    this.driverName = driverName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.milesDriven = milesDriven;
  }

  static createFromInstructions(instructions) {
    return new Trip({
      driverName: instructions[1],
      endTime: instructions[3],
      milesDriven: +instructions[4],
      startTime: instructions[2],
    });
  }
}

module.exports = Trip;
