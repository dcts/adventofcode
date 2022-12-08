class Tree {
  constructor(value, parent) {
    this.name = value || null;
    this.parent = parent || null;
    this.children = {}; // directories
    this.files = [];
    this.size = 0;
  }
  addElements(elements) {
    this.addFiles(elements.filter(element => element.type === "file"))
    this.addDirectories(elements.filter(element => element.type === "dir"))
  }
  addFiles(files) {
    this.files = files;
    this.size = files.map(obj => obj.size).reduce((a,b) => a+b, 0);
  }
  addDirectories(directories) {
    directories.forEach(directory => {
      this.children[directory.name] = new Tree(directory.name, this);
    })
  }
  fullPath() {
    const path = [this.name];
    let currentNode = this;
    while (currentNode.parent !== null) {
      currentNode = currentNode.parent;
      path.unshift(currentNode.name);
    }
    return path.join("/").replace("//","/"); // fix "//"" issue for root folder
  }
}

module.exports = {
  Tree
}