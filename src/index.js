const fs = require('fs');
const readline = require('readline');

const System = require('./System');

const system = new System();

const inputFilePath = process.argv[2];
if (!inputFilePath) {
  throw new Error('Input file is required');
}

const input = fs.createReadStream(inputFilePath);
const rl = readline.createInterface({
  crlfDelay: Infinity,
  input,
});

rl.on('line', line => system.processInstruction(line));
rl.on('close', () => system.printReport());
