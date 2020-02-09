import {
  readProp, getDatesBetween, normalizeToArray, groupBy,
} from '../helpers';

const repoOwner = {
  data: {
    repositoryOwner: {
      login: 'facebook',
      repositories: {
        edges: [
          {
            node: {
              id: 'MDEwOlJlcG9zaXRvcnkxNzI1ODEwNzE=',
              name: 'react',
            },
          },
        ],
      },
    },
  },
};

describe('Helpers', () => {
  it('Validate readProp', () => {
    const useDefaultValue = readProp(repoOwner, 'data.repositoryOwner.pageInfo', { hasNextPage: false });
    const repo = readProp(repoOwner, 'data.repositoryOwner.repositories.edges.0.node.name', '');
    const edges = readProp(repoOwner, 'data.repositoryOwner.repositories.edges', []);
    const login = readProp(repoOwner, 'data.repositoryOwner.login');
    expect(login).toStrictEqual(repoOwner.data.repositoryOwner.login);
    expect(repo).toStrictEqual(repoOwner.data.repositoryOwner.repositories.edges[0].node.name);
    expect(edges).toHaveLength(1);
    expect(useDefaultValue).toStrictEqual({ hasNextPage: false });
  });

  it('Validate DatesBetween', () => {
    const initDate = new Date(2020, 1, 1);
    const endDate = new Date(2020, 1, 29);
    const datesBetween = getDatesBetween(initDate, endDate);
    expect(datesBetween).toHaveLength(29);
    expect(datesBetween[18].getDate()).toStrictEqual(19);
  });

  it('Validate NormalizeArray', () => {
    const data = 'data';
    expect(normalizeToArray(data)).toStrictEqual([data]);
    expect(normalizeToArray([data])).toStrictEqual([data]);
  });

  it('Validate Group', () => {
    const data = [
      { name: 'Merged', value: 1 },
      { name: 'Merged', value: 3 },
      { name: 'Opened', value: 2 },
      { name: 'Closed', value: 3 },
    ];
    const groupedData = groupBy(data, 'name');
    expect(groupedData).toHaveProperty('Merged');
    expect(groupedData).toHaveProperty('Opened');
    expect(groupedData).toHaveProperty('Closed');
    expect(groupedData.Merged).toHaveLength(2);
    expect(groupedData.Opened).toHaveLength(1);
    expect(groupedData.Closed).toHaveLength(1);
  });
});
