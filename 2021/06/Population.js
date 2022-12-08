class Population {
  // create states factory function
  static initStates() {
    return {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    }
  }

  // initialize population
  constructor(startinPopulation) {
    this.states = Population.initStates();
    startinPopulation.forEach(fish => this.states[fish] += 1);
  }
  
  // runs 1 generation
  run() {
    const newStates = Population.initStates();
    for (const [stateStr, count] of Object.entries(this.states)) {
      const currentState = Number(stateStr);
      if (currentState === 0) {
        newStates["8"] += count;
        newStates["6"] += count;
      } else {
        newStates[`${currentState-1}`] += count;
      }
    }
    this.states = newStates;
  }

  // runs run() multiple times
  runMultipleTimes(n) {
    for (let i=1; i<=n; i++) {
      this.run();
    }
  }
  
  // get current size of the population
  size() {
    return Object.values(this.states).reduce((a,b) => a+b);
  }
}

module.exports = {
  Population
}