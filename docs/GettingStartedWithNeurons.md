# Getting Started: Neurons

This briefly describes the process of creating a Neuron to be used by Oratio, after working through the steps Oratio will be ready to use the new Neuron.

## Creating the Neuron

Some key points to remember when creating neurons:

* They should fail fast, the speed of the entire network is depended on the speed of the individual neurons. Even though neurons can all be ran in parallel, it is still important to try to think of ways to fail fast.
    * For instance: if the locale is not supported immediately return or if there are too many words in the request to reasonably match a neuron which usually matches on a few words, immediately return.
* They should be pure-functions, they should never modify the request, the context or the locale. Nor should they have state of their own, with a certain input the output should always be the same.
* They should be entirely agnostic, they should not know anything of the network around them.

### Determine inputs 

After figuring out what the neuron should do, it's important to determine what kind of inputs the neuron should match on, certain phrases, certain keywords or even certain operators. Try to determine a natural way for the user to interact with your neuron, the user-friendliness will for a large part be determined by how intuitive the required inputs are.

If the inputs are words or phrases, try to add them to a separate file, like so:

```typescript
export const knownWords: LocalizedWords = {
    main: {
        en: {
            words: ['hello', 'hi', 'i am', 'my name is'],
        },
        nl: {
            words: ['hallo', 'hoi', 'ik ben', 'mijn naam is'],
        },
    },
    params: {
        en: {
            words: ['i am', 'my name is'],
        },
        nl: {
            words: ['ik ben', 'mijn naam is'],
        },
    },
    continuation: {},
};
```

Here we have inputs that determine when the neuron should respond in `"main" ` and we have words or phrases that determine the parameters in `"params"`, where language tags determine what phrases to use. The syntax does not matter, but it is probably wise to store the phrases in a different file than the neuron itself.

### Implement Neuron

The neuron should simple implement the `IHiveMindNeuron` interface:

```typescript
public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    
}
```

It's important to note that any neuron is required to return a promise, this allows every neuron to perform async operations and it allows all neurons to be ran in parallel. The `words` are the input from the user, the `locale` can be used to determine which phrases to use, or if the locale is unknown to return immediately. The `context` can be used to look at the history of previous requests, so if the neuron should be able to handle follow-up questions the context can be used to determine what the previous input was and which neuron handled it. The `context` also includes the model of the application, this can only be used if the neuron is written for a specific applicaiton. Using the clientModel can not be done in generic neurons that should work for several applications.

An example implementation for a neuron which can greet the user:
```typescript
public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    return Promise.resolve(new SimpleResponse(
        "oratio.greeting.hello",
        [],
        1.0
    ));    
}
```
This neuron returns a response with a message key `"oratio.greeting.hello"`, with zero arguments (the empty array) and a certainty of 1.0. This should work just fine,the only problem is that no matter what the user input is oratio will return a response with the greeting message key. We could change this to make sure we only return the greeting response if the user greeted oratio:

```typescript
public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    // the knownWords should be imported, it is the constant from the example above
    const matchingWords: string[] = knownWords.main[locale].words; 
    
    
    for (let matchingWord in matchingWords) {
        if (words[0] === matchingWord) {
            return Promise.resolve(new SimpleResponse(
                    "oratio.greeting.hello",
                    [],
                    1.0
            ));            
        }
    }
    
    return Promise.resolve(new Silence());          
}
```

Here we only greet the user if the first word matches one of the words the neuron knows. If the input does not match we still resolve the promise, but only with a `Silence` response, which just means the neuron did not know how to handle the input and has no response for the user.

This however is not very user-friendly, if the user enters a typo it does not work and it does not work well when it should match on a sequence of words rather than a single word. Fortunately Oratio provides a solution for that in the form of a generic Neuron:

```typescript
public process(words: string[], locale: string, context: RequestContext): Promise<INeuronResponse> {
    return new LocalizedWordsMatcherNeuron(
                       knownWords,
                       'oratio.core.hello',
                   ).process(words, locale, context);
}
```

To find out how it works behind the scenes, take a look at the source code. To use it though all you need to know is that the `LocalizedWords` constant will be used to match to the input, and `'oratio.core.hello'` will be returned if it matches

### Register the neuron

To use a new neuron, it still has to be registered, you can use the `HiveMindBuilder` for that:

```typescript
HiveMindBuilder.createEmpty()
.registerCoreModules()
.registerMathModules()
.register([new YourNeuronHere()])
.build();
```

And that's it, Oratio can now be used with the newly implemented Neuron.

### Further improvements

Even though the neuron works at this point, there are still some advisable improvements:

* It does not handle unknown locales at all.
* It does not greet the user with its name if the user gives the neuron its name, parsing the parameters should still be done. (See the GreetingNeuron source code for an example of how that can be done)
* It has no unit-test, neurons are pure-functions and very easy to unit-test make sure to take advantage of that benefit. 
