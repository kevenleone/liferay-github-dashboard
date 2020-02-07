import axios from 'axios';

const GitHubGraphQL = 'https://api.github.com/graphql';
const token = process.env.REACT_APP_GITHUB_TOKEN;

const graphQLAPI = axios.create({
  url: GitHubGraphQL,
  method: 'POST',
  headers: {
    Authorization: `bearer ${token}`,
  },
});

graphQLAPI.interceptors.response.use((response) => {
  if (response.status === 200) {
    response.data = response.data.data;
  }
  return response;
});

export default graphQLAPI;
