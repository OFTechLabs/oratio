# Emergent System

Emergent systems can have great benefits over their more centralized counter-parts. For an excellent introduction in emergent systems read Emergence: The Connected Lives of Ants, Brains, Cities, and Software by Steven Johnson. The basic concepts and architecture of Oratio are inspired by Steven Johsons book. It is in some ways also very similar to the Unix philosophy, where small is beatifull, for more on the Unix philosophy read The Unix Philosophy by Mike Gancarz.

## Main benefits

Emergent systems should allow many decentralized parts to work together well, without much hassle. The main idea is to let the decentralized individual parts to do one thing, and one thing really well. The individual parts themselves are practically useless, yet the sum of the whole can capable of very challenging tasks.

Because the centralized part is deliberately kept as small as possible, there is very little overhead. Each individual part need not worry about other parts and can simply focus on doing its one task.

## Oratio

In Oratio these benefits can be identified:

* Creating a Neuron to do one task is incredibly simple, it only needs to implement a single method which will usually require very little code.
* The Neuron knows nothing, and does not need to know, about other neurons or even about the collective (the HiveMind).
* Each individual Neuron is so simple that on its own it becomes useless, most Neurons will probably not be able to interpret 99.9% of all user input it sees. But luckily others will. 
* Every Neuron is a completely decentralized part, completely indepent from other neurons. This means they are very easy to run in parrelel allowing for easy optimization.
* The HiveMind is the only centralized part, which in itself is again practically useless. It deliberatly hardly does anything and without any Neurons would be useless. The benefit of this lack of centralization is less overhead and makes it easier to develop individual Neurons.

## Client-side natural langauge procesing benefits

There are many natural language processing API´s with bot functionality available but Oratio is hardly a worthy competition. It does not need to be, the use case of Oratio is vastly different. Oratio should integrate with applications, allowing each web-application to take advantage of natural language processing. No centralized API, or cloud natural language processor can integrate easily within custom applications. The benefit of Oratio is that it can in fact be used to carry out application specific tasks:

Oratio allows web-applications to create Neurons specifically for their own purposes. It requires highly specialized Neurons to carry out particular tasks within custom applications, the basic idea here is that only the developers of the application can create the specialized Neurons. Oratio allows for this use-case, where developers of a web-application want to create a natural language interface for their own and only their own web-application.
 
At the same time it does not exclude general Neurons to be used and shared between applications. Certain features should as evaluating math will probably be used by many applications and Oratio allows this by giving developers the option to add available generalists Neurons to their application. Oratio even allows using other natural language API´s, create a Neuron which performs a call to the API and register it with Oratio. That´s it.

