import { takeLatest } from 'redux-saga/effects';

import { getPullRequests, getUserRepositories } from './actions/github';

export default function* root() {
  yield takeLatest('GET_PULL_REQUESTS_SAGA', getPullRequests);
  yield takeLatest('FETCH_USER_REPOS_SAGA', getUserRepositories);
}
