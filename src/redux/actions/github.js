import {
  put, call, select, all,
} from 'redux-saga/effects';

import GitGraphQL, { queries } from '../../services';
import {
  normalizePullRequestsMerge,
  normalizeSummary,
  getAverageTime,
  lastMonth,
  readProp,
  groupBy,
} from '../../utils';

const {
  getUser, getRepository, getPullRequestFiles, search, normalizeQuery,
} = queries;

function* fetchSummary({ owner, repository }, type) {
  const query = normalizeQuery(search, { repo: `${owner}/${repository}`, date: lastMonth, type });
  try {
    const graphResponse = yield call(GitGraphQL, query);
    const edges = readProp(graphResponse, 'data.search.edges', []);
    const nodes = edges.map((edge) => edge.node);
    const nodesGroup = groupBy(nodes, 'state');
    return { data: normalizeSummary(nodesGroup, type === 'pr'), total: nodes.length };
  } catch (e) {
    console.log(e); //eslint-disable-line
    return { data: [], total: 0 };
  }
}

function* getSummary(repository) {
  const pipeline = [
    call(fetchSummary, repository, 'pr'),
    call(fetchSummary, repository, 'issue'),
  ];
  const [pull_requests, issues] = yield all(pipeline); //eslint-disable-line
  yield put({
    type: 'SET_MONTH_SUMARY',
    payload: { data: { issues, pull_requests } },
  });
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

function* getInsights(params) {
  if (params.repository) {
    try {
      const pipeline = [
        call(getAverages, params),
        call(getAverageMergePR, params),
        call(getSummary, params),
      ];
      yield all(pipeline);
    } catch (e) {
      console.log(e); //eslint-disable-line
    }
  }
}

export function* getUserRepository(action) {
  const { repository: { owner } } = yield select((state) => state.github);
  const repository = action.payload;
  const params = { owner, repository };
  yield put({ type: 'SET_REPOSITORY_OWNER_REPO', payload: repository });
  yield call(getInsights, params);
}
