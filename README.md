# Oratio

Emergent natural language processing

## Emergent system

There is no single major intelligence responsible for the system, instead every _neuron_ processes every input and determines whether it can do anything with it. All neurons are collected in the hive, the hive makes sure all neurons receive user input until a response is found. 

### Neurons

A neuron can easily be added to the hive, all it has to do is implement the following function:

<code>process(input: string[], locale: sring, context: string) : NeuronResponse;</code>

then it has to be registered with the hive who manages all neurons.

### Hive

The Hive processes all user input, it favors neurons who succesfully process user-input. The hive is constantly changing the order of the neurons to make sure the hive adjusts to what the user is currently doing.

### Response

The response always contains a _response_, which is a code that can be localized by other applications. The response can also include an _action_ (function: () => void)  which the neuron thought the user intended. The action ca be executed on a certain _context_, allowing the calling-party to use injected services in the action.

Useful commands
---
    npm run prebuild       - install NPM dependancies
    npm run build          - build the library files
    npm run test           - run the tests
    npm run test:watch     - run the tests (watch-mode)
    npm run coverage       - run the tests with coverage
    npm run coverage:watch - run the tests with coverage (watch-mode)
    npm run pack           - build the library, make sure the tests passes, and then pack the library (creates .tgz)
    npm run release        - prepare package for next release
