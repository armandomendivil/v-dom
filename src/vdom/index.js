import { isDef, isPrimitive } from '../shared/util';

export function mount(input, parentDOMNode) {
  if (isPrimitive(input)) {
    mountText(input, parentDOMNode);
  } else {
    mountElement(input, parentDOMNode);
  }
}

export function mountElement(vnode, parentDOMNode) {
  const { tag, className, props, style } = vnode;

  const domNode = document.createElement(tag);

  vnode.dom = domNode;

  if (props.children) {
    props.children.forEach(child => mount(child, domNode));
  }

  if (isDef(className)) {
    domNode.className = className;
  }

  if (isDef(style)) {
    Object.keys(style).forEach(skey => domNode.style[skey] = style[skey]);
  }

  parentDOMNode.appendChild(domNode);

  return domNode;
}

export function mountText (text, parentDOMNode) {
  parentDOMNode.textContent = text;
}
