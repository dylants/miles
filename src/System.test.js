const System = require('./System');

describe('System', () => {
  let system;

  function setup(input) {
    system = new System();
    const instructions = input.split('\n');
    instructions.forEach(i => system.processInstruction(i));
  }

  describe('using the example input', () => {
    beforeEach(() => {
      setup(`
        Driver Dan
        Driver Lauren
        Driver Kumi
        Trip Dan 07:15 07:45 17.3
        Trip Dan 06:12 06:32 21.8
        Trip Lauren 12:01 13:16 42.0
      `);
    });

    it('should generate the correct output', () => {
      expect(system.generateReports()).toEqual([
        'Lauren: 42 miles @ 34 mph',
        'Dan: 39 miles @ 47 mph',
        'Kumi: 0 miles',
      ]);
    });
  });

  describe('using speeds that should be ignored', () => {
    beforeEach(() => {
      setup(`
        Driver Foo
        Driver Bar
        Driver Baz
        Driver Bazzy
        Trip Foo 01:00 02:00 1000
        Trip Foo 04:00 05:00 10
        Trip Bar 06:00 06:30 1
        Trip Bar 07:00 07:30 20
        Trip Baz 14:00 14:01 0.1
        Trip Bazzy 14:00 14:05 0.9
      `);
    });

    it('should generate the correct output', () => {
      expect(system.generateReports()).toEqual([
        'Bar: 20 miles @ 40 mph',
        'Foo: 10 miles @ 10 mph',
        'Bazzy: 1 miles @ 11 mph',
        'Baz: 0 miles',
      ]);
    });
  });
});
