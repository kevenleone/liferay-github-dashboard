import { constants } from '../../utils';

const { dashboard } = constants;

const INITIAL_STATE = {
  repository: { owner: '', repo: '', formError: false },
  repositories: [],
  dashboard,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AVERAGE_TIME':
      return { ...state, dashboard: { ...state.dashboard, ...action.payload } };
    case 'SET_AVERAGE_MERGE':
      return { ...state, dashboard: { ...state.dashboard, average_merge: action.payload } };
    case 'SET_MONTH_SUMARY':
      return { ...state, dashboard: { ...state.dashboard, month_summary: action.payload } };
    case 'SET_REPOSITORY_OWNER':
      return { ...state, ...action.payload };
    case 'SET_REPOSITORY_OWNER_REPO':
      return { ...state, repository: { ...state.repository, repo: action.payload } };
    case 'SET_DEFAULT_DASHBOARD':
      return { ...state, dashboard };
    default:
      return { ...state };
  }
}
