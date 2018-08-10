import { isDef, isPrimitive, isFunction, isString } from '../shared/util';
import setTextContent from './setTextContent';

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
  return {
    type,
    props,
    dom: null,
  };
}

export function mountVElement(vElement, parentDOMNode) {
  let { children, props } = vElement;
  const domNode = document.createElement(vElement.type);
  vElement.dom = domNode;

  if (children) {
    if (!Array.isArray(children)) {
      mount(children, domNode);
    } else {
      children.forEach(child => mount(child, domNode));
    }
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
 
  const nextElement =  instance.render();

  console.log('COM', nextElement);

  instance._currentElement = nextElement;
  instance._parentNode = parentDOMNode;


  const dom = mount(nextElement, parentDOMNode);

  vComponent._instance = instance;
  vComponent.dom = dom;

  parentDOMNode.appendChild(dom);

  return dom;
}

export function mount(input, parentDOMNode) {
  if (isPrimitive(input)) {
    console.log(input)
    // Text input
    return setTextContent(parentDOMNode, input);
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

function update(prevElement, nextElement) {
  if (prevElement.type === nextElement.type) {
    if (isString(prevElement.type)) {
      updateVElement(prevElement, nextElement);
    } else if (isFunction(prevElement.type)) {
      updateVComponent(prevElement, nextElement);
    }
  } else {
    // ---
  }
}

export function updateVElement(prevElement, nextElement) {
  const dom = prevElement.dom;
  nextElement.dom = dom;
  if (nextElement.children) {
    updateChildren(prevElement.children, nextElement.children, dom);
  }
}

export function updateVComponent (prevComponent, nextComponent) {
  const { _instance } = prevComponent;
  const { _currentElement } = _instance;

  const prevProps = prevComponent.props;
  const nextProps = nextComponent.props;

  nextComponent.dom = prevComponent.dom;
  nextComponent._instance = _instance;
  nextComponent._instance.props = nextProps;

  if (_instance.shouldComponentUpdate()) {
    const prevRenderedElement = _currentElement;
    const nextRenderedElement = _instance.render();
    nextComponent._instance._currentElement = nextRenderedElement;
    update(prevRenderedElement, nextRenderedElement, _instance._parentNode);
  }
}

function updateChildren(prevChildren, nextChildren, parentDOMNode) {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren];
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren];
  }

  for (let i = 0; i < nextChildren.length; i++) {

    const nextChild = nextChildren[i];
    const prevChild = prevChildren[i];

    if (isPrimitive(nextChild) && isPrimitive(prevChild)) {
      updateVText(prevChild, nextChild, parentDOMNode);
    } else {
      update(prevChild, nextChild);
    }
  }
}

export function updateVText(prevVText, nextText, parentDOMNode) {
  if (prevVText !== nextText) {
    parentDOMNode.firstChild.nodeValue = nextText;
  }
}

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};

    this._pendingState = null;
    this._currentElement = null;
    this._parentNode = null;
  }

  shouldComponentUpdate() {
    return true;
  }

  updateComponent() {
    const prevState = this.state;
    const prevElement = this._currentElement;

    if (this._pendingState !== prevState) {
      this.state = this._pendingState;
    }

    this._pendingState = null;
    const nextElement = this.render();
    this._currentElement = nextElement;

    update(prevElement, nextElement, this._parentNode);
  }

  setState(partialNewState) {
    this._pendingState = Object.assign({}, this.state, partialNewState);
    this.updateComponent();
  }

  render() {}
}
