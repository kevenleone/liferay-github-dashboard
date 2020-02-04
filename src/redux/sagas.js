import { takeLatest } from 'redux-saga/effects';

import { getPullRequests } from './actions/github';

export default function* root() {
  yield takeLatest('GET_PULL_REQUESTS_SAGA', getPullRequests);
}
