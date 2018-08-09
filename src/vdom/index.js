import { isDef, isPrimitive, isFunction, isString } from '../shared/util';

export function h(type, props, ...children) {
  props = props || {};

  return {
    type,
    props,
    children,
    dom: null,
  };
};

global.h = h;

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

export function mountvComponent(vComponent, parentDOMNode) {
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
