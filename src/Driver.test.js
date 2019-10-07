const moment = require('moment');
const Driver = require('./Driver');

describe('Driver', () => {
  describe('calculateMinutesBetween', () => {
    const formatMomentToString = inputMoment => inputMoment.format('kk:mm');

    it('should work with small duration', () => {
      const duration = 23;
      const startTime = moment('01:30', 'kk:mm');
      const endTime = moment(startTime).add(duration, 'minutes');

      expect(
        Driver.calculateMinutesBetween({
          endTime: formatMomentToString(endTime),
          startTime: formatMomentToString(startTime),
        }),
      ).toEqual(duration);
    });

    it('should work with large duration', () => {
      const duration = 900;
      const startTime = moment('10:30', 'kk:mm');
      const endTime = moment(startTime).add(duration, 'minutes');

      expect(
        Driver.calculateMinutesBetween({
          endTime,
          startTime,
        }),
      ).toEqual(duration);
    });
  });

  describe('calculateAverageSpeed', () => {
    it('should work with basic input', () => {
      expect(
        Driver.calculateAverageSpeed({
          miles: 20,
          minutes: 120,
        }),
      ).toEqual(10);
    });

    it('should work with input that requires rounding', () => {
      expect(
        Driver.calculateAverageSpeed({
          miles: 39,
          minutes: 120,
        }),
      ).toEqual(20);
    });
  });
});
