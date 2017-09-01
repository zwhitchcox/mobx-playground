var handler = {
    get: function(target, name) {
        if (name in target) {
            return target[name]
        }
        return 38;
    },
    set: function(obj, prop, val) {
        console.log('obj', obj, 'prop', prop, 'val', val)
        obj[prop] = val
    }
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = 's';

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37

class Obdb {
  data: IData = {};
  constructor(start: IData = {}) {
    this.data = {}
  }
  set(path: TPath, val: any) {

  }
  get(path: TPath) {
  }
}

const obdb = new Obdb
