
import React from 'react';
import { shallow } from 'enzyme';
import { LineChart, Text } from 'recharts';
import { MainChart } from '../../Charts';
import { LineTooltip } from '../../Charts/Tooltip';
import Tabs from '..';

describe('Tabs', () => {
  test('should render with success', () => {
    const props = {
      options: [
        {
          key: 'pull_requests',
          title: 'Pull Requests',
          Component: MainChart,
          props: {
            Chart: LineChart,
            customTooltip: {
              Component: LineTooltip,
              props: {
                title: 'Pull Requests',
              },
            },
            lines: ['Merged', 'Opened', 'Closed'],
            colors: ['#B20BFF', '#FF3A00', '#13C600'],
            xAxis: {
              data: 'date',
              props: {
                interval: 2.5,
                padding: { right: 20 },
              },
            },
            yAxis: {
              data: '',
            },
          },
        },
        {
          key: 'issues',
          title: 'Issues',
          Component: Text,
          props: {
            data: 'Hey Issues',
          },
        },
      ],
    };
    const wrapper = shallow(<Tabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
