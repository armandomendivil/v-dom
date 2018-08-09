
export function isUndef (v) {
  return v === undefined || v === null;
}

export function isDef (v) {
  return v !== undefined && v !== null;
}

export function isTrue (v) {
  return v === true;
}

export function isFalse (v) {
  return v === false;
}

export function isFunction (v) {
  return typeof v === 'function';
}

export function isString (v) {
  return typeof v === 'string';
}

export function isPrimitive (v) {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'symbol' ||
    typeof v === 'boolean'
  );
}