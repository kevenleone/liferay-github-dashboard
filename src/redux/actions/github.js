import {
  put, call, select, all,
} from 'redux-saga/effects';
import {
  isWithinInterval, subDays, subWeeks, format,
} from 'date-fns';
import GitGraphQL, { queries } from '../../services';
import {
  readProp, getAverageTime, groupBy, normalizePullRequestsMerge,
} from '../../utils';

const {
  getUser, getRepository, getPullRequestFiles, search, normalizeQuery,
} = queries;
const lastMonth = format(subWeeks(new Date(), 4), 'yyyy-MM-dd');

function getCountDateBetween({
  array = [], start, end, key,
}) {
  return array.filter((d) => {
    const compareDate = d[key];
    const between = isWithinInterval(new Date(compareDate), { end, start });
    return between;
  }).length;
}

function* getPullRequestsSummary({ owner, repository }) {
  const query = normalizeQuery(search, { repo: `${owner}/${repository}`, date: lastMonth, type: 'pr' });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const edges = readProp(graphResponse, 'data.search.edges', []);
    const pullRequests = edges.map((edge) => edge.node);
    const pullRequestGrouped = groupBy(pullRequests, 'state');
    // console.log(pullRequestGrouped);
    const pullRequestSummary = [4, 3, 2, 1, 0].map((weeks, index) => {
      const end = subWeeks(new Date().setHours(23, 59, 59), weeks);
      const start = index !== 0 ? subDays(new Date(end).setHours(0, 0, 0), 6)
        : new Date(new Date(end).setHours(0, 0, 0));
      const date = subWeeks(new Date().setHours(0, 0, 0, 0), weeks);
      const params = { start, end };
      // const params = { start: subDays(date, 7), end: date };
      // console.log(index, start, end, { start: subDays(date, 7), end: date });
      const data = {
        Merged: getCountDateBetween({ ...params, array: pullRequestGrouped.MERGED, key: 'mergedAt' }),
        Opened: getCountDateBetween({ ...params, array: pullRequestGrouped.OPEN, key: 'createdAt' }),
        Closed: getCountDateBetween({ ...params, array: pullRequestGrouped.CLOSED, key: 'closedAt' }),
      };
      return { date: format(date, 'dd MMM'), ...data };
    });
    yield put({
      type: 'SET_MONTH_SUMARY_PULL_REQUESTS',
      payload: { data: pullRequestSummary, total: pullRequests.length },
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

function* getIssueSummary({ owner, repository }) {
  const query = normalizeQuery(search, { repo: `${owner}/${repository}`, date: lastMonth, type: 'issue' });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const edges = readProp(graphResponse, 'data.search.edges', []);
    const issues = edges.map((edge) => edge.node);
    const issuesGrouped = groupBy(issues, 'state');
    const issuesSummary = [4, 3, 2, 1, 0].map((weeks, index) => {
      const date = subWeeks(new Date().setHours(0, 0, 0, 0), weeks);
      const end = subWeeks(new Date().setHours(23, 59, 59), weeks);
      const start = index !== 0 ? subDays(new Date(end).setHours(0, 0, 0), 6)
        : new Date(new Date(end).setHours(0, 0, 0));
      const params = { start, end };
      const data = {
        Opened: getCountDateBetween({ ...params, array: issuesGrouped.OPEN, key: 'createdAt' }),
        Closed: getCountDateBetween({ ...params, array: issuesGrouped.CLOSED, key: 'closedAt' }),
      };
      return { date: format(date, 'dd MMM'), ...data };
    });
    yield put({
      type: 'SET_MONTH_SUMARY_ISSUES',
      payload: { data: issuesSummary, total: issues.length },
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
        call(getIssueSummary, params),
      ];
      yield all(pipeline);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
  }
}
