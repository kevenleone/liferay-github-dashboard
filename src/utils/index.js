import constants from './constants';

function getPullRequestSize(total = 0) {
  let a = 'Large';
  if (total <= 100) a = 'Small';
  if (total > 100 && total <= 1000) a = 'Medium';
  return a;
}

function groupBy(groups, by) {
  const dict = {};
  groups.forEach((group) => {
    if (dict[group[by]]) {
      dict[group[by]] = [...dict[group[by]], group];
    } else {
      dict[group[by]] = [group];
    }
  });
  return dict;
}

function timeConverter(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor((daysms) / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor((hoursms) / (60 * 1000));
  return {
    days, hours, hoursms, minutes, text: `${days}days ${hours}h${minutes}`,
  };
}

function getAverage(nodes) {
  if (nodes && nodes.length) {
    const dates = nodes
      .map(({ node: { createdAt, closedAt } }) => (new Date(closedAt) - new Date(createdAt)));
    return dates.reduce((a, b) => a + b) / nodes.length;
  }
  return 0;
}

function getAverageTime(nodes = []) {
  const average = getAverage(nodes);
  if (average) {
    return { data: timeConverter(average).text };
  }
  return { data: 'No content to show' };
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

function normalizePullRequestsMerge(pullRequests) {
  const metrics = { 'Pull Requests': 0, 'Average Time': 0 };
  const averagePR = [
    { name: 'Small', ...metrics },
    { name: 'Medium', ...metrics },
    { name: 'Large', ...metrics },
  ];

  const getFilesCount = (files) => {
    const fileMap = files.map(({ additions, deletions }) => additions + deletions);
    if (fileMap && fileMap.length > 0) {
      return fileMap.reduce((a, b) => a + b);
    }
    return 0;
  };

  const files = pullRequests
    .map(({ node: { createdAt, closedAt, files: { nodes } } }) => {
      const diffMergeTime = new Date(closedAt) - new Date(createdAt);
      const sizePR = getPullRequestSize(getFilesCount(nodes));
      return { diffMergeTime, sizePR };
    });

  files.forEach(({ diffMergeTime, sizePR }) => {
    const options = { Small: 0, Medium: 1, Large: 2 };
    const index = options[sizePR];
    averagePR[index]['Average Time'] += diffMergeTime;
    averagePR[index]['Pull Requests'] += 1;
  });

  const getHours = (ms) => Math.round((ms / (1000 * 60 * 60)));

  const averageMerge = averagePR.map((average) => {
    const content = { ...average };
    if (average['Average Time']) {
      content['Average Time'] = getHours(average['Average Time'] / average['Pull Requests']);
    }
    return content;
  });

  return averageMerge;
}

export {
  groupBy,
  constants,
  readProp,
  getAverage,
  getAverageTime,
  normalizeToArray,
  normalizePullRequestsMerge,
};
