const INITIAL_STATE = {
  loading: false,
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
