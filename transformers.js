const m = require('mobx');

class Folder {
  constructor(parent, name) {
    this.parent = parent;
    m.extendObservable(this, {
      name: name + '',
      children: m.observable.shallow([]),
    });
  }
}

class DisplayFolder {
  constructor(folder, state) {
    this.state = state;
    this.folder = folder;
    m.extendObservable(this, {
      collapsed: false,
      get name() {
        return this.folder.name;
      },
      get isVisible() {
        return !this.state.filter || this.name.indexOf(this.state.filter) !== -1 || this.children.some(child => child.isVisible);
      },
      get children() {
        if (this.collapsed)
          return [];
        return this.folder.children.map(transformFolder)
          .filter(child => child.isVisible);
      },
      get path() {
        return this.folder.parent === null ? this.name : transformFolder(this.folder.parent).path + "/" + this.name;
      }
    });
  }
}

const state = m.observable({
  root: new Folder(null, "root"),
  filter: null,
  displayRoot: null
});

const transformFolder = m.createTransformer(folder => new DisplayFolder(folder, state));

// returns list of strings per folder
const stringTransformer = m
  .createTransformer(displayFolder => displayFolder.path + "\n" + 
      displayFolder.children.filter(child => child.isVisible).map(stringTransformer).join(''));

function createFolders(parent, recursion) {
  if (recursion === 0)
    return;
  for (let i = 0; i < 3; i++) {
    const folder = new Folder(parent, i);
    parent.children.push(folder);
    createFolders(folder, recursion - 1);
  }
}

createFolders(state.root, 2); // 3^2

m.autorun(() => {
  state.displayRoot = transformFolder(state.root);
  state.text = stringTransformer(state.displayRoot)
  console.log(state.text)
});

state.root.name = 'wow'; // change folder name
state.displayRoot.children[1].collapsed = true; // collapse folder
console.log('filter = 2')
state.filter = "2"; // search
state.filter = null; // unsearch
