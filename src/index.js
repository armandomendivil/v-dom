import { mount, Component } from './vdom';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul>
      </div>
    );
  }
}

const root = document.body;
mount(h(App), root);