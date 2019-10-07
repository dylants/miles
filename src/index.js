const fs = require('fs');
const readline = require('readline');
const System = require('./System');

// create a new system for our process to use
const system = new System();

// validate the input file is provided
const inputFilePath = process.argv[2];
if (!inputFilePath) {
  throw new Error('Input file is required');
}

// open the input file and read it line by line
const input = fs.createReadStream(inputFilePath);
const rl = readline.createInterface({
  crlfDelay: Infinity,
  input,
});

// for each line, process the instruction
rl.on('line', line => system.processInstruction(line));

// when the input file has been fully processed, print the report
rl.on('close', () => system.printReport());
