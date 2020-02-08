import {
  put, call, select,
} from 'redux-saga/effects';
import GitGraphQL, { queries } from '../../services';
import { readProp, getAverageTime } from '../../utils';

const { getUser, getRepository, normalizeQuery } = queries;

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
}
