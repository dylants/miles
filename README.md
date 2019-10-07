# miles

A coding exercise around tracking driver's history.

## Getting Started

This project was built using specific versions of Node and yarn, found in the `package.json` file. It is assumed both are installed and available.

Install dependencies:

```
$ yarn
```

Run the example input:

```
$ yarn run:example
```

Run the tests:

```
$ yarn test
```

## Requirements

For more information, see the `exercise.md` file.

## Overview

The requirements of the project state that it should take input from a file, process each line within that file as an instruction, and produce some output to the console. To assist with testing, the file processing was handled outside of the main code paths. The `src/index.js` file handles processing the `input.txt` file, but delegates most of the responsibility to `src/System.js`.

Below is an overview of the major classes within the application:

### System

This class is responsible for containing state on the system as a whole, as it contains a set of `Driver`s along with their associated `Trip` data. It can then generate a report once the list has been fully processed.

The calculation for the report is done at the time of request, and some of that processing is done by the `Driver` class itself. The requirements state that the report should be output to console. Testing console output can be a bit tricky, so this part was isolated and ignored in code coverage. The bulk of the processing for the report is then tested outside of the console logging.

Finally, this class was constructed to support additional commands if needed, by delegating to the command's class to process the instruction.

### Driver

This class contains the state on an individual driver, along with details on the trips made by that driver. When requested, this class can generate detailed data on the driver's history useful in the `System` report.

The `Driver` instance collects the details of the `Trip`, but doesn't store the trip itself. This was done because the driver data needs this high level detail to calculate the report information, after all trips have been processed.

### Trip

This class is a representation of a single trip instruction, useful to grab data about that trip.
