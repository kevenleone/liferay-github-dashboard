import {
  call, put, select,
} from 'redux-saga/effects';
import api from '../../services/api';

export function* getPullRequests() {
  try {
    const { repo } = yield select((state) => state.github);
    const response = yield call(api.get, `/repos/${repo}/pulls?state=closed`);
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

export function* getIssues() {
  yield true;
}
