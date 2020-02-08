import { takeLatest } from 'redux-saga/effects';

import { getUserRepository, getUserRepositories } from './actions/github';

export default function* root() {
  yield takeLatest('FETCH_USER_REPOS_SAGA', getUserRepositories);
  yield takeLatest('FETCH_REPO_SAGA', getUserRepository);
}
