const System = require('./System');

describe('System', () => {
  describe('using the example input', () => {
    const exampleInput = `
      Driver Dan
      Driver Lauren
      Driver Kumi
      Trip Dan 07:15 07:45 17.3
      Trip Dan 06:12 06:32 21.8
      Trip Lauren 12:01 13:16 42.0
    `;
    let system;

    beforeEach(() => {
      system = new System();
      const instructions = exampleInput.split('\n');
      // .map(instruction => instruction.trim());
      instructions.forEach(i => system.processInstruction(i));
    });

    it('should generate the correct output', () => {
      expect(system.generateReports()).toEqual([
        'Lauren: 42 miles @ 34 mph',
        'Dan: 39 miles @ 47 mph',
        'Kumi: 0 miles',
      ]);
    });
  });

  describe('using some more edge case input', () => {
    const input = `
      Driver Foo
      Driver Bar
      Trip Foo 01:00 02:00 1000
      Trip Foo 04:00 05:00 10
      Trip Bar 06:00 06:30 1
      Trip Bar 07:00 07:30 10
    `;
    let system;

    beforeEach(() => {
      system = new System();
      const instructions = input
        .split('\n')
        .map(instruction => instruction.trim());
      instructions.forEach(i => system.processInstruction(i));
    });

    it('should generate the correct output', () => {
      expect(system.generateReports()).toEqual([
        'Foo: 10 miles @ 10 mph',
        'Bar: 10 miles @ 20 mph',
      ]);
    });
  });
});
