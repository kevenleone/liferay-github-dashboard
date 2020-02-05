const mockLine = [
  {
    name: '10 Feb', Merged: 400, Opened: 240, Closed: 240,
  },
  {
    name: '11 Feb', Merged: 300, Opened: 138, Closed: 220,
  },
  {
    name: '12 Feb', Merged: 200, Opened: 980, Closed: 220,
  },
  {
    name: '13 Feb', Merged: 278, Opened: 398, Closed: 200,
  },
  {
    name: '14 Feb', Merged: 189, Opened: 480, Closed: 211,
  },
  {
    name: '15 Feb', Merged: 239, Opened: 380, Closed: 250,
  },
  {
    name: '16 Feb', Merged: 349, Opened: 430, Closed: 210,
  },
];

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
    month_summary: {
      data: {
        issues: mockLine,
        pull_requests: mockLine.slice(0, 3),
      },
    },
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_PULL_REQUESTS':
      return { ...state, dashboard: { ...state.dashboard } };
    default:
      return { ...state };
  }
}