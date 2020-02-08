const mockLine = [
  {
    date: '10 Feb', Merged: 400, Opened: 240, Closed: 240,
  },
  {
    date: '11 Feb', Merged: 300, Opened: 138, Closed: 220,
  },
  {
    date: '12 Feb', Merged: 200, Opened: 980, Closed: 220,
  },
  {
    date: '13 Feb', Merged: 278, Opened: 398, Closed: 200,
  },
  {
    date: '14 Feb', Merged: 189, Opened: 480, Closed: 211,
  },
  {
    date: '15 Feb', Merged: 239, Opened: 380, Closed: 250,
  },
  {
    date: '16 Feb', Merged: 349, Opened: 430, Closed: 210,
  },
];

const INITIAL_STATE = {
  repository: {
    owner: '',
    repo: '',
  },
  repositories: [],
  dashboard: {
    average_merge: {
      data: [
        { name: 'Small', 'Average Time': 40, 'Pull Requests': 20 },
        { name: 'Medium', 'Average Time': 15, 'Pull Requests': 50 },
        { name: 'Large', 'Average Time': 65, 'Pull Requests': 100 },
      ],
    },
    average_pull: {
      data: '1days 3h25',
    },
    average_issue: {
      data: '3days 3h25',
    },
    month_summary: {
      data: {
        issues: mockLine,
        pull_requests: mockLine.slice(0, 5),
      },
    },
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AVERAGE_PULL':
      return { ...state, dashboard: { ...state.dashboard, average_pull: action.payload } };
    case 'SET_AVERAGE_TIME':
      return { ...state, dashboard: { ...state.dashboard, ...action.payload } };
    case 'SET_AVERAGE_MERGE':
      return { ...state, dashboard: { ...state.dashboard, average_merge: action.payload } };
    case 'SET_MONTH_SUMARY':
      return { ...state, dashboard: { ...state.dashboard, month_summary: action.payload } };
    case 'SET_MONTH_SUMARY_ISSUES':
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          month_summary: {
            data:
            { ...state.dashboard.month_summary.data, pull_requests: action.payload },
          },
        },
      };
    case 'SET_REPOSITORY_OWNER':
      return { ...state, ...action.payload };
    case 'SET_REPOSITORY_OWNER_REPO':
      return { ...state, repository: { ...state.repository, repo: action.payload } };
    default:
      return { ...state };
  }
}
