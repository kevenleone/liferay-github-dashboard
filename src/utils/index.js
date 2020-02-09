import {
  isWithinInterval, subWeeks, format,
} from 'date-fns';
import constants from './constants';

const lastMonthDate = subWeeks(new Date(), 4);

function getCountDateBetween({
  array = [], start, end, key,
}) {
  return array.filter((d) => {
    const compareDate = d[key];
    const between = isWithinInterval(new Date(compareDate), { end, start });
    return between;
  }).length;
}

function addDays(dateStart, days) {
  const futureDay = new Date(dateStart);
  futureDay.setDate(futureDay.getDate() + days);
  return futureDay.getTime();
}
export function getDatesBetween(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

function normalizeSummary(group, containsMerged) {
  const datesInMonth = getDatesBetween(lastMonthDate, new Date());
  return datesInMonth.map((day) => {
    const end = new Date(new Date(day).setHours(23, 59, 59));
    const start = new Date(new Date(day).setHours(0, 0, 0));
    const params = { start, end };
    const data = {
      Opened: getCountDateBetween({ ...params, array: group.OPEN, key: 'createdAt' }),
      Closed: getCountDateBetween({ ...params, array: group.CLOSED, key: 'closedAt' }),
    };
    if (containsMerged) {
      data.Merged = getCountDateBetween({ ...params, array: group.MERGED, key: 'mergedAt' });
    }
    return { date: format(start, 'dd MMM'), ...data };
  });
}

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

function getAverageTime(nodes = [], type) {
  const average = getAverage(nodes);
  if (average) {
    return { data: timeConverter(average).text };
  }
  return { data: `${type} not found` };
}


function normalizeToArray(variable) {
  return typeof variable === 'string' ? [variable] : variable;
}

function readProp(object, prop, defaultValue) {
  const props = (typeof prop === 'string') ? prop.split('.') : [];
  let ret = typeof object === 'object' && object !== null ? object : { };
  /**/
  if (props.length) {
    props.forEach((p, i) => {
      if (ret[p] === undefined || (i < (props.length - 1) && ret[p] === null)) {
        return defaultValue;
      }
      ret = ret[p];
      return null;
    });
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

const lastMonth = format(lastMonthDate, 'yyyy-MM-dd');

export {
  groupBy,
  constants,
  readProp,
  lastMonth,
  getAverage,
  getAverageTime,
  normalizeSummary,
  normalizeToArray,
  normalizePullRequestsMerge,
};
