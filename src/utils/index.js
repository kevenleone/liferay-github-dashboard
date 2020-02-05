import constants from './constants';

function normalizeToArray(variable) {
  return typeof variable === 'string' ? [variable] : variable;
}

export { constants, normalizeToArray };
