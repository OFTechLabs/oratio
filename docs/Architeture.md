#Architecture

Brief description of the architecture of Oratio.

## Neurons

The basic building blocks are the _neurons_ and all knowledge is contained within the _neurons_. A Neuron implements the following interface:

```typescript
process(words: string[], locale: string, context: string): NeuronResponse
```

Where a NeuronResponse contains nothing (a Silence response) or:

```typescript
    response: string;
    params: string[];
```
And optionally:

```typescript
    action: () => void;
    context: any;
```
The response can be used to respond to the user along with some parameters, where the response should allow localization. The action is a piece of code that the user probably intended to execute, where the context is the scope onto which the action should be executed. This allows Neurons to give a response that can change the application, where the context allows the action to be executed on a scope where services are injected into.

## HiveMind

The _HiveMind_ contains all _neurons_ and gives user input to _neurons_ until an appropriate response is found. It implements the following interface:
```typescript
public process(input: string, locale: string, context: string): IHiveResponse
```
Where the IHiveResponse always contains a response and if the _neurons_ in the _HiveMind_ figured out what to do with the user input it contains:
 
 ```typescript
    response: string,
    params: string[],
    action: () => void,
    context: any
 ```
 
 Not all responses contain an action to execute, so usually the action will be a function which does nothing. The response however will always contain a message that can be localized along with parameters if necessary.
 
### Recently fired preference

The _HiveMind_ prefers _neurons_ which recently found a response for user-input, the _HiveMind_ continually adjusts the order of _neurons_ to which it gives the user-input first based on how successful they have been recently. 

## Language

_Neurons_ should still work even if the user makes small spelling mistakes, for this purpose there are several utility functions in the _Language_ module that can be reliable used to match user input. 
