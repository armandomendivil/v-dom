import { mount } from './vdom';
const root = document.body;

let App = <div>
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
</div>;  

console.log(App)
mount(App, root);