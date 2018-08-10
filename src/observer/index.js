let data = { price: 5, quantity: 2, total: 0 };
let target = null;
// subscribers -> array of subcribers
// depend -> add target as subscriber
// notify -> run all of subscribers
// watch -> run function to notify all subscribers

class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

let deps = new Map();

Object.keys(data).forEach(key => {
  deps.set(key, new Dep());
});

let dataWithOutProxy = data;

data = new Proxy(dataWithOutProxy, {
  get(obj, key) {
    deps.get(key).depend();
    return obj[key];
  },
  set(obj, key, newVal) {
    obj[key] = newVal;
    deps.get(key).notify();
    return true;
  }
});


function watcher (fn) {
  target = fn;
  target();
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
});

console.log('total:', data.total);
data.price = 10;
console.log('total:', data.total);
data.price = 20;
console.log('total:', data.total);