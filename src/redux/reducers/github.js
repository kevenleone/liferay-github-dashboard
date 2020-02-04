const INITIAL_STATE = {
  repo: 'diegonvs/gatsby-boilerplate',
  dashboard: {},
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
