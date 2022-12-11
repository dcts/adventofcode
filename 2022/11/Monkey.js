class Monkey {
  constructor(id, items, operation, test) {
    this.id = id;
    this.items = items;
    this.operation = operation; // this is a function stored in a varible
    this.test = test; // object with keys: divisibleBy, ifTrue, ifFalse
    this.inspectedItems = 0;
  }

  hasItems() {
    return this.items.length > 0;
  }

  addItem(item) {
    this.items.push(item);
  }

  // 1. inspect item => apply worry level operation
  // 2. (worry level drops => divided by 3, rounded down to the nearest integer
  // 3. test
  // 4. throw item (return monkeyId of monkey to throw item at)
  processItem(commonModulo = undefined) {
    let item = this.items.shift();
    
    // adapt item to make it smaller
    // (only for part2)
    if (commonModulo !== undefined) { // solve part2
      item = item % commonModulo;
    }

    // adapt worry level by operation
    item = this.operation(item);
    this.inspectedItems += 1;

    // drop worry level (only for part1)
    if (commonModulo === undefined) { 
      item = Math.floor(item / 3);
    } 
    // monkey tests item before deciding where to throw 
    const isDivisible = item % this.test.divisibleBy === 0;
    
    // throw item (return target monkeyId)
    const monkeyId = isDivisible ? this.test.ifTrue : this.test.ifFalse;

    return {
      item,
      monkeyId
    }
  }
}

module.exports = {
  Monkey
}