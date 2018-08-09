import { isDef, isPrimitive, isFunction, isString } from '../shared/util';

export function h(type, props, ...children) {
  props = props || {};

  if (isFunction(type)) {
    const vNode = createVComponent(type, props);
    return vNode;
  }

  const vNode = createVElement(type, props, ...children);

  return vNode;
};

global.h = h;

export function createVElement(type, props, ...children) {
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
  const { children, props } = vElement;
  const domNode = document.createElement(vElement.type);
  vElement.dom = domNode;

  if (Array.isArray(children)) {
    children.forEach(child => mount(child, domNode));
  }

  if (isDef(props.className)) {
    domNode.className = props.className;
  }

  if (isDef(props.style)) {
    Object.keys(style).forEach(sKey => domNode.style[sKey] = style[sKey]);
  }

  addEventListeners(domNode, vElement.props);

  parentDOMNode.appendChild(domNode);

  return domNode;
}

export function mountVComponent(vComponent, parentDOMNode) {
  const { props, type } = vComponent;
  const Component = type;
  const instance = new Component(props);

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

export function isEventProp (name) {
  return /^on/.test(name);
}

export function extractEventName (name) {
  return name.slice(2).toLowerCase();
}

export function addEventListeners ($target, props) {
  Object.keys(props).forEach(name => {
    if (isEventProp(name)) {
      $target.addEventListener(
        extractEventName(name),
        props[name]
      );
    }
  });
}

export class Component {
  constructor(props) {
    this.props = props || {};
  }

  render() {}
}
