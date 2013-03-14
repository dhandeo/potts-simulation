POTTS model simulation running within browser
#############################################

See the
functioning`Here <http://dhandeo.github.com/potts-simulation/index.html>`_

General description
===================

The synaptic rearrangement simulation has the following parameters: 1. number of
axons (2 to 25) 2. number of synaptic contacts per neuromuscular junction (NMJ)
(2x2 up to 10x10) 3. number of NMJs per muscle (1 to 300) The simplest
simulation is every synaptic contact is assigned an axon selected randomly.
With each time step, one synaptic contact is selected at random for loss. An
axon that innervates an adjacent synaptic contact is selected at random to grow
and take over the vacated synaptic contact. An interior contact has 8
neighbors. Contacts at an edge have fewer neighbors (ie, the grid does not wrap
around). The probability any axon is selected depends on the number of
neighboring sites it innervates. The next step up in complication is assigning
each axon a fitness. If the fitnesses are all the same, the simulation is as
above. If one axon has higher fitness than the others, it has a lower
probability of being selected for loss from a synaptic site. The probability of
taking over a vacated site is assumed to be the same for all axons regardless
of fitness. If fitness does not vary over time, it represents a fixed bias.
Another step up in complication is to assume that fitness varies over time due
to payoffs and costs associated with various factors. One factor is
neurotrophic support that an axon receives from a NMJ. This support is a
payoff. It is proportional to the number of contacts that axon makes at the
NMJ. The payoff affects axon fitness at that particular junction (local).
Another factor is the the global amount of resources that an axon has to
support synaptic contacts. Resources are a cost. The more contacts that axon
innervates, the less its fitness. The total fitness of an axon is a combination
of fixed and varying components. The fixed represents random drift. The varying
component is weighted to be a fraction of the fixed:

Fitness = 1 - W +W*payoff (W = weight).

Implementation
==============

- About 100 squares each running a simulation
- Each simulation: 5x5 or 10x10 grid

Container class
===============
- Manages the canvas
- Accepts simulation objects
- Displays play / pause / reset functions
- Outputs information
- In a loop
   - Runs simulation
   - Gathers information


A simulation class
==================
- Accepts parameters for initialization function
- Simulation function

References
==========

- `Game of life <http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/>`_
- `Isling simulation <http://dtjohnson.net/projects/ising>`_