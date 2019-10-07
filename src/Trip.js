class Trip {
  constructor({ driverName, startTime, endTime, milesDriven }) {
    this.driverName = driverName;
    this.startTime = startTime;
    this.endTime = endTime;
    this.milesDriven = milesDriven;
  }

  static createFromInstructions(instructions) {
    // the instructions contain the command first, which we ignore with the slice,
    // and then get the remainder of the instructions as trip input
    const [driverName, startTime, endTime, milesDriven] = instructions.slice(1);

    return new Trip({
      driverName,
      endTime,
      // miles is input as a string, so convert it to a number
      milesDriven: +milesDriven,
      startTime,
    });
  }
}

module.exports = Trip;
