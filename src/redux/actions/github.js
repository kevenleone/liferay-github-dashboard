import {
  put, call, select, all,
} from 'redux-saga/effects';
import {
  isWithinInterval, addDays, subWeeks, format,
} from 'date-fns';
import GitGraphQL, { queries } from '../../services';
import {
  readProp, getAverageTime, normalizePullRequestsMerge,
} from '../../utils';

const {
  getUser, getRepository, getPullRequestFiles, searchPullRequests, normalizeQuery,
} = queries;

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

function getCountDateBetween(array = [], date, key) {
  return array.filter((d) => {
    const compareDate = d[key];
    const between = isWithinInterval(new Date(compareDate), { start: date, end: addDays(date, 7) });
    return between;
  }).length;
}

function* getPullRequestsSummary({ owner, repository }) {
  const [lastMonth] = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T');
  const query = normalizeQuery(searchPullRequests, { repo: `${owner}/${repository}`, date: lastMonth });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const edges = readProp(graphResponse, 'data.search.edges', []);
    const pullRequests = edges.map((edge) => edge.node);
    const pullRequestGrouped = groupBy(pullRequests, 'state');
    const pullRequestSummary = [0, 1, 2, 3, 4].map((weeks) => {
      const date = subWeeks(new Date(), weeks);
      const data = {
        Merged: getCountDateBetween(pullRequestGrouped.MERGED, date, 'mergedAt'),
        Opened: getCountDateBetween(pullRequestGrouped.OPENED, date, 'createdAt'),
        Closed: getCountDateBetween(pullRequestGrouped.CLOSED, date, 'closedAt'),
      };
      return { date: format(date, 'dd MMM'), ...data };
    }).reverse();
    yield put({
      type: 'SET_MONTH_SUMARY_ISSUES',
      payload: pullRequestSummary,
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

function* getAverages({ owner, repository }) {
  const query = normalizeQuery(getRepository, { owner, repo: repository });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const issues = readProp(graphResponse, 'data.repository.issues.edges', []);
    const pullRequests = readProp(graphResponse, 'data.repository.pullRequests.edges', []);
    const averageIssues = getAverageTime(issues);
    const averagePullRequests = getAverageTime(pullRequests);
    yield put({
      type: 'SET_AVERAGE_TIME',
      payload:
      { average_pull: averagePullRequests, average_issue: averageIssues },
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

function* getAverageMergePR({ owner, repository }) {
  const query = normalizeQuery(getPullRequestFiles, { owner, repo: repository });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const pullRequests = readProp(graphResponse, 'data.repository.pullRequests.edges', []);
    const averageMerge = normalizePullRequestsMerge(pullRequests);

    yield put({
      type: 'SET_AVERAGE_MERGE',
      payload: { data: averageMerge },
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}


export function* getUserRepositories(action) {
  const username = action.payload;
  const query = normalizeQuery(getUser, { username });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const edges = readProp(graphResponse, 'data.repositoryOwner.repositories.edges', []);
    const repositories = edges.map(({ node: { id, name } }) => ({ id, name }));
    yield put({
      type: 'SET_REPOSITORY_OWNER',
      payload: { repositories, repository: { owner: username, repo: '' } },
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

export function* getUserRepository(action) {
  const repository = action.payload;
  const { repository: { owner } } = yield select((state) => state.github);
  yield put({ type: 'SET_REPOSITORY_OWNER_REPO', payload: repository });

  if (repository) {
    const params = { owner, repository };
    try {
      const pipeline = [
        call(getAverages, params),
        call(getAverageMergePR, params),
        call(getPullRequestsSummary, params),
      ];
      yield all(pipeline);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
  }
}
