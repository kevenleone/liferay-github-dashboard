import {
  put, call,
} from 'redux-saga/effects';
import git from '../../services/git';

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
  try {
    const response = yield call(git.repos.listForUser, {
      per_page: 100,
      username: action.payload,
    });
    if (response.status === 200) {
      const repositories = response.data
        .map(({ id, name }) => ({ id, name }))
        .sort((a, b) => a.name - b.name);
      yield put({
        type: 'SET_REPOSITORY_OWNER',
        payload: { repositories, repository: { owner: username } },
      });
    }
  } catch (e) {
    console.log(e); //eslint-disable-line
  }
}

export function* getIssues() {
  yield true;
}
