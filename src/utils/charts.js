import {
  BarChart, LineChart, LineTooltip, BarTooltip, Text,
} from '../components/Charts';
import Tabs from '../components/Tabs';
/**
 * File with Charts config, for dynamic rendering
 * key: The name of key inside dashboard (on redux state, check the file redux/reducers/github.js)
 * title: The name of Card Item
 * cols: Bootstrap cols options
 * render: {
 * props -> data sent throw the component,
 * Component -> The component that will receive the props and render
 * }
 */

export default [
  {
    key: 'average_merge',
    title: 'Average Merge Time by Pull Request Size',
    cols: {
      xs: 12,
    },
    render: {
      props: {
        customTooltip: {
          Component: BarTooltip,
          props: {
            transformValue: (key, value) => (key.includes('Time') ? `${value}h` : value),
          },
        },
        bars: ['Average Time'],
        xAxis: 'name',
        yAxis: 'Average Time',
      },
      Component: BarChart,
    },
  },
  {
    key: 'average_pull',
    title: 'Average Pull Request Merge Time',
    cols: {
      xs: 12,
      xl: 6,
    },
    render: {
      props: {},
      Component: Text,
    },
  },
  {
    key: 'average_issue',
    title: 'Average Issue Close Time',
    cols: {
      xs: 12,
      xl: 6,
    },
    render: {
      props: {},
      Component: Text,
    },
  },
  {
    key: 'month_summary',
    title: 'Month Summary',
    render: {
      Component: Tabs,
      props: {
        options: [
          {
            key: 'pull_requests',
            title: 'Pull Requests',
            Component: LineChart,
            props: {
              customTooltip: {
                Component: LineTooltip,
                props: {
                  title: 'Pull Requests',
                },
              },
              lines: ['Merged', 'Opened', 'Closed'],
              colors: ['#B20BFF', '#FF3A00', '#13C600'],
              xAxis: 'name',
              yAxis: '',
            },
          },
          {
            key: 'issues',
            title: 'Issues',
            Component: LineChart,
            props: {
              customTooltip: {
                Component: LineTooltip,
                props: {
                  title: 'Issues',
                },
              },
              lines: ['Opened', 'Closed'],
              colors: ['#FF3A00', '#13C600'],
              xAxis: 'name',
              yAxis: '',
            },
          },
        ],
      },
    },
  },
];
