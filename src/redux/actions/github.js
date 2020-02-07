import {
  put, call,
} from 'redux-saga/effects';
import GitGraphQL, { queries } from '../../services';
import { readProp } from '../../utils';

const { getUser, normalizeQuery } = queries;

export function* getPullRequests() {
  try {
    // const { repository } = yield select((state) => state.github);
    const response = {};


    // const filesPromise = pullRequest.map(pr => github.pulls.listFiles({
    //   owner: "kevenleone",
    //   repo: "graphscript",
    //   pull_number: pr.number
    // }))

    // const data = await Promise.all(filesPromise);


    // const response = yield call(git.pulls.list, { ...repository });
    // console.log(response);
    // const filesApi = (id) => `/repos/${repo}/pulls/${id}/files`;
    // const filesCall = response.data.map((pr) => call(api.get, filesApi(pr.number)));
    // const responsePullsFiles = yield all(filesCall);
    // const pullRequests = response.data.map((pr, index) => {
    //   const { number, created_at, merged_at } = pr;
    //   const files = responsePullsFiles[index].data;
    //   const totalChanges = files.map((file) => file.changes).reduce((a, b) => a + b);
    //   return {
    //     number,
    //     created_at,
    //     merged_at,
    //     changes: {
    //       total: totalChanges,
    //       size: totalChanges <= 100 ? 'Small' : (totalChanges <= 1000 ? 'Medium' : 'Large'),
    //     },
    //   };
    // });
    yield put({
      type: 'SET_PULL_REQUESTS',
      payload: { response },
    });
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
  yield true;
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

export function* getIssues() {
  yield true;
}
