import { isDef, isPrimitive } from '../shared/util';
import { TEXT_NODE } from '../shared/HTMLNodeTypes';

/**
 * Set textContent to html node.
 * It is faster use nodeValue instead of node.textContent for updates
 * @param {DOMElement} node 
 * @param {string} text 
 */
const setTextContent = function setTextContent(node, text) {
  if (isPrimitive(text)) {
    const firstChild = node.firstChild;

    if (
      isDef(firstChild) &&
      firstChild === node.lastChild &&
      firstChild.nodeType === TEXT_NODE
    ) {
      firstChild.nodeValue = text;
    }
  }

  node.textContent = text;
}

export default setTextContent;
