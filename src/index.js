import { mount, Component } from './vdom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };

    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
  }

  onIncrease() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  onDecrease() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onDecrease}>Decrease</button>
        <button onClick={this.onIncrease}>Increase</button>
        <h3>{this.state.counter}</h3>
      </div>
    );
  }
}

const root = document.body;
mount(h(App), root);
