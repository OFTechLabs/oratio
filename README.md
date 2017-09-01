# Oratio [![Build Status](https://travis-ci.org/OFTechLabs/oratio.svg?branch=master)](https://travis-ci.org/OFTechLabs/oratio)

Emergent natural language processing

## Getting started

Create a new _HiveMind_ with the _HiveMindBuilder_:

```typescript
const mind = HiveMindBuilder.createEmpty()
                  .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
                  .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
                  .build();
```

Give it user input:

```typescript
const response: Promise<IHiveResponse> = mind.process(input, locale, clientModel)
```

Show any applicable output to the user in any desired way, the response has the following fields:

```typescript
{
   responses(): SingleResponse[],
   single(): SingleResponse,
   response(): string
    
}
```

Where a `SingleResponse` contains the following:

```typescript
{
    // message key of the response, the application can translate to any language
    response: string,
    // possible parameters for the output / translation
    params: string[],
    // the certainty, if too low handle accordingly
    certainty: number,
    // a possible action the user wanted to perform, this is especially useful for application specific neurons
    action: () => void,
    // the scope to perform the action on, to allow using injected services in the action
    context: any
}
```

### Adding custom neurons

Create a neuron which implements the following interface:

```typescript
public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse>
```

Add the neuron in the builder:

```typescript
const mind = HiveMindBuilder.createEmpty()
        .registerModule(CoreHiveMindModule.CORE_HIVE_MIND_MODULE)
        .registerModule(MathHiveMindModule.MATH_HIVE_MIND_MODULE)
        .registerNeurons([new YourNeuronHere()])
        .build();
```

The array can obviously contain more neurons, as more custom neurons are created simply add them to the array.

## Emergent system

There is no single major intelligence responsible for the system, instead every _neuron_ processes every input and determines whether it can do anything with it. All neurons are collected in the hive, the hive makes sure all neurons receive user input until a response is found. 

### Neurons

A neuron can easily be added to the hive, all it has to do is implement the following function:

```typescript
export interface IHiveMindNeuron {
    process(userInput: UserInput,
            context: RequestContext): Promise<INeuronResponse>;
}
```

then it has to be registered with the hive that manages all neurons.

### Hive

The Hive processes all user input, it favors neurons who succesfully process user-input. The hive is constantly changing the order of the neurons to make sure the hive adjusts to what the user is currently doing.

### Response

The response always contains a _response_, which is a code that can be localized by other applications. The response can also include an _action_ (function: () => void)  which the neuron thought the user intended. The action can be executed on a certain _context_, allowing the calling-party to use injected services in the action.
