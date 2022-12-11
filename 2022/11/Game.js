/**
 * Keep Away game
 */
class Game {
  constructor(monkeys, commonModulo = undefined) {
    this.monkeys = monkeys;
    this.commonModulo = commonModulo;
    this.round = 0;
  }

  // play n rounds of the game
  playMultipleRounds(n) {
    for (let i=1; i<=n; i++) {
      this.play();
    }
  }

  // play 1 round of the game
  play() {
    this.monkeys.forEach(monkey => {
      while(monkey.hasItems()) {
        const {item, monkeyId} = monkey.processItem(this.commonModulo);
        this.monkeys.find(monkey => monkey.id === monkeyId).addItem(item);
      }
    })
    this.round++;
  }

  // find 2 most active monkeys
  mostActiveMonkeys() {
    return this.monkeys.sort((m1,m2) => m2.inspectedItems - m1.inspectedItems).slice(0, 2)
  }

  // multiply nbr of inspected items of 2 most active monkeys
  monkeyBusiness() {
    const [monkey1, monkey2] = this.mostActiveMonkeys();
    return monkey1.inspectedItems * monkey2.inspectedItems;
  }  

  // prints current game state (which monkey is holding which item)
  print() {
    const itemHoldings = "ITEM HOLDINGS\n" + this.monkeys.map(monkey => `Monkey ${monkey.id}: ${monkey.items}`).join("\n");
    const inspectionCount = "\nINSPECTIONS\n" + this.monkeys.map(monkey => `Monkey ${monkey.id} inspected items ${monkey.inspectedItems} times.`).join("\n");
    console.log(itemHoldings);
    console.log(inspectionCount);
  }
}

module.exports = {
  Game
}