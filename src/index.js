import { mount, Component } from './vdom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
    };

    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
  }

  onIncrease() {
    console.log('Increase');
  }

  onDecrease() {}

  render() {
    return (
      <div>
        <button onClick={this.onIncrease}>click</button>
        <h3>{this.state.count}</h3>
      </div>
    );
  }
}

const root = document.body;
mount(h(App), root);