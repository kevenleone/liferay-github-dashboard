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
  getRepository: ({ owner, repo: name }) => `
  query {
    repository(owner: "${owner}", name: "${name}") {
      id
      name
      issues(first: 100, states: CLOSED) {
        edges {
          node {
            createdAt
            closedAt
          }
        }
      }
      pullRequests(first: 100, states: MERGED) {
        edges {
          node {
            createdAt
            closedAt
            files(first: 100) {
              nodes {
                additions
                deletions
              }
            }
          }
        }
      }
    }
  }
  `,
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
