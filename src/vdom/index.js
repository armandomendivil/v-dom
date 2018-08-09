import { isDef, isPrimitive, isFunction, isString } from '../shared/util';

export function h(type, props, ...children) {
  props = props || {};
  console.log(type)
  if (isFunction(type)) {
    const vNode = createVComponent(type, props);
    return vNode;
  }

  const vNode = createVElement(type, props, children);

  return vNode;
};

global.h = h;

export function createVElement(type, props, ...children) {
  console.log('Create element')
  return {
    type,
    props,
    children,
    dom: null,
  };
}

export function createVComponent(type, props) {
  console.log('Create component')
  return {
    type,
    props,
    dom: null,
  };
}

export function mountVText(vText, parentDOMNode) {
  parentDOMNode.textContent = vText;
}

export function mountVElement(vElement, parentDOMNode) {
  const domNode = document.createElement(vElement.type);

  vElement.dom = domNode;

  if (vElement.children) {
    if (!Array.isArray(vElement.children)) {
      mount(vElement.children, domNode);
    } else {
      vElement.children.forEach(child => mount(child, domNode));
    }
  }

  parentDOMNode.appendChild(domNode);

  return domNode;
}

export function mountVComponent(vComponent, parentDOMNode) {
  const Component = vComponent.type;
  const instance = new Component(vComponent.props);

  const nextElement = instance.render();
  const dom = mount(nextElement, parentDOMNode);

  parentDOMNode.appendChild(dom);

  return dom;
}

export function mount(input, parentDOMNode) {
  if (isPrimitive(input)) {
    // Text input
    return mountVText(input, parentDOMNode);
  } else if (isFunction(input.type)) {
    // Component input
    return mountVComponent(input, parentDOMNode);
  } else if (isString(input.type)) {
    // Element input
    return mountVElement(input, parentDOMNode);
  }
}

export class Component {
  constructor(props) {
    this.props = props || {};
  }

  render() {}
}
