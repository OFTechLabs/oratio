#Architecture

Brief description of the architecture of Oratio, it all works through an emergent system: the individual neurons know nothing of other neurons, are individually not intelligent at all, but combined they should be able to handle complex requests.

## Neurons

The basic building blocks are the _neurons_ and all knowledge is contained within the _neurons_. A Neuron implements the following interface:

```typescript
export interface IHiveMindNeuron {
    process(userInput: UserInput,
            context: RequestContext,): Promise<INeuronResponse>;
}
```

The _locale_ might be used by the neuron or it might be ignored, it depends entirely on the neuron.

If a neuron does not know how to handle a certain input, an empty response should be returend (a `SilenceResponse`). If a neuron does know how to handle it, the following fields must be returned:

```typescript
    response: string;
    params: string[];
```
And optionally:

```typescript
    action: () => void;
    context: any;
```
The response can be used to respond to the user along with some parameters, where the response should allow localization. The action is a piece of code that the user probably intended to execute, where the context is the scope onto which the action should be executed. This allows Neurons to give a response that can change the application, where the context allows the action to be executed on a scope where dependencies are injected into. 

## HiveMind

The _HiveMind_ contains all _neurons_ and gives user input to _neurons_ until an appropriate response is found. It implements the following interface:
```typescript
 process(input: string,
         locale: Locale,
         clientModel: any,): Promise<IHiveResponse>;
```

The _input_ is from the user, the locale is from the user but it is important to note that it's entirely up to the neurons whether to use it or not. They might not be used by the neuron. 

Where the IHiveResponse always contains a response and if the _neurons_ in the _HiveMind_ figured out what to do with the user input it contains at least one:
 
 ```typescript
    response: string,
    params: string[],
    action: () => void,
    context: any
 ```
 
Not all responses contain an action to execute, so usually the action will be a function which does nothing. The response however will always contain a message that can be localized along with parameters if necessary. If Multiple neurons knew how to handle the input, multiple responses might be returned.
 
### Recently fired preference

The _HiveMind_ prefers _neurons_ which recently found a response for user-input, the _HiveMind_ continually adjusts the order of _neurons_ to which it gives the user-input first based on how successful they have been recently. 

## Language

_Neurons_ should still work even if the user makes small spelling mistakes, for this purpose there are several utility functions in the _Language_ module that can be reliable used to match user input. 

## Locale

Neurons should always return a _message-key_ which the application can translate, instead of returning messages in any particular language. The neuron _might_ use the _locale_ to determine which words to match on and whether it can even handle the input from the user. If  a _neuron_ for instance only works on the English language, it is probably a good idea to immediately return a _silence_ response if the locale is anything else than English.  
