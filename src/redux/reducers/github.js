const dashboard = {
  average_merge: {
    data: [
      { name: 'Small', 'Average Time': 0, 'Pull Requests': 0 },
      { name: 'Medium', 'Average Time': 0, 'Pull Requests': 0 },
      { name: 'Large', 'Average Time': 0, 'Pull Requests': 0 },
    ],
  },
  average_pull: {
    data: '',
  },
  average_issue: {
    data: '',
  },
  month_summary: {
    data: {
      issues: {
        total: 0,
        data: [],
      },
      pull_requests: {
        total: 0,
        data: [],
      },
    },
  },
};

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
