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
      issues(first: 100, states: CLOSED, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            createdAt
            closedAt
          }
        }
      }
      pullRequests(first: 100, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
        edges {
          node {
            createdAt
            closedAt
          }
        }
      }
    }
  }
  `,
  getPullRequestFiles: ({ owner, repo: name }) => `
  query {
    repository(owner: "${owner}", name: "${name}") {
      pullRequests(first: 100, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
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
  search: ({ type = 'pr', repo, date }) => {
    const searchType = {
      pr: {
        type: 'is:pr',
        query: `
          ... on PullRequest {
            state
            createdAt
            mergedAt
            closedAt
        }`,
      },
      issue: {
        type: 'is:issue',
        query: `
          ... on Issue {
            state
            createdAt
            closedAt
        }`,
      },
    };
    const selectedType = searchType[type];
    return `
      query {
        search (
          query: "repo:${repo} ${selectedType.type} created:>${date}", 
          type: ISSUE, 
          last: 100
        ) {
          edges {
            node {
              ${selectedType.query}
            }
          }
        }
      }
  `;
  },
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

// query {
//   repository(owner: "react-hook-form", name: "react-hook-form-website") {
//     id
//     name
//     description
//     pullRequests(
//       first: 100,
//       orderBy: { field: CREATED_AT, direction: DESC }
//     ) {
//       edges {
//         node {
//           state
//           createdAt
//           closedAt
//           mergedAt
//         }
//       }
//     }
//   }
// }
