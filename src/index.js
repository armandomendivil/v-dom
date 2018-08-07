import { mount } from './vdom';
import createElement from './vdom/create-element';

const myApp = createElement('div', { className: 'my-class' }, [
  createElement('h1', { className: 'my-header' }, ['Hello']),
  createElement('hp', { }, ['A container paragraph']),
]);

const root = document.body;
mount(myApp, root);
