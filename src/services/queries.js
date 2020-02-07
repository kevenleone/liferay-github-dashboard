const queries = {
  getUser: ({ username }) => `
    query {
      repositoryOwner(login:"${username}") {
      login
      repositories(first: 100, orderBy: { field: NAME, direction: ASC }) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }`,
};

export default {
  ...queries,
  normalizeQuery(q, params) {
    const query = typeof q === 'function' ? q(params) : q;
    return {
      data: {
        query,
      },
    };
  },
};
