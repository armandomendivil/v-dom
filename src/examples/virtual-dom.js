import { mount, Component } from '../vdom';

class NestedComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Nested result .. {this.props.counter}</h1>
    )
  }
}

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
       <NestedComponent counter={this.state.counter} />
      </div>
    );
  }
}

const root = document.body;
mount(h(App), root);
