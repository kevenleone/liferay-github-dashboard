import constants from './constants';

function timeConverter(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor((daysms) / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor((hoursms) / (60 * 1000));
  return `${days}days ${hours}h${minutes}`;
}

function getAverageTime(nodes = []) {
  let average = { data: 'No content to show' };
  const dates = nodes
    .map(({ node: { createdAt, closedAt } }) => (new Date(closedAt) - new Date(createdAt)));
  if (dates.length) {
    average = { data: timeConverter(dates.reduce((a, b) => a + b) / nodes.length) };
  }
  return average;
}


function normalizeToArray(variable) {
  return typeof variable === 'string' ? [variable] : variable;
}

function readProp(object, prop, defaultValue) {
  const props = (typeof prop === 'string') ? prop.split('.') : [];
  let ret = typeof object === 'object' && object !== null ? object : { };
  /**/
  if (props.length) {
    for (let i = 0; i < props.length; i++) { //eslint-disable-line
      if (ret[props[i]] === undefined || (i < (props.length - 1) && ret[props[i]] === null)) {
        return defaultValue;
      }
      ret = ret[props[i]];
    }
    /**/
    return ret;
  }
  return defaultValue;
}

export {
  constants, normalizeToArray, timeConverter, readProp, getAverageTime,
};
