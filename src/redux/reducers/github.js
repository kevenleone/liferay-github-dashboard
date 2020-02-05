const INITIAL_STATE = {
  repository: {
    owner: 'kevenleone',
    repo: 'graphscript',
  },
  dashboard: {
    average_merge: {
      data: [
        { name: 'Small', Average: 10, pull_request: 10 },
        { name: 'Medium', Average: 28, pull_request: 50 },
        { name: 'Large', Average: 48, pull_request: 100 },
      ],
    },
    average_pull: {
      data: '1days 3h25',
    },
    average_issue: {
      data: '3days 3h25',
    },
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_PULL_REQUESTS':
      // const
      return { ...state, dashboard: { ...state.dashboard } };
    default:
      return { ...state };
  }
}
