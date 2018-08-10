import { mount, Component } from './vdom';
var target = null;

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


class NestedComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Nested result ..  {`${this.props.counter}`}</h1>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };

    this.data = {
      price: 5,
      quantity: 2,
      total: 0,
    };

    let deps = new Map();

    Object.keys(this.data).forEach(key => {
      deps.set(key, new Dep());
    });

    let dataWithOutProxy = this.data;

    this.data = new Proxy(dataWithOutProxy, {
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

    this.watcher = this.watcher.bind(this);
    this.onIncrease = this.onIncrease.bind(this);

    this.watcher(() => {
      this.data.total = this.data.price * this.data.quantity;
    });
  }

  watcher(fn) {
    target = fn;
    target();
    target = null;
  }

  onIncrease() {
    this.data.quantity = this.data.quantity + 1;
    this.updateComponent()
  }

  render() {
    return (
      <div>
        <button onClick={this.onIncrease}>Increase</button>
        <h3>{`Price: ${this.data.price}`}</h3>
        <h3>{`Quantity: ${this.data.quantity}`}</h3>
        <h3>{`Total: ${this.data.total}`}</h3>
      </div>
    );
  }
}

const root = document.body;
mount(h(App), root);
