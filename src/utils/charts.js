import { BarChart, LineChart, Text } from '../components/Charts';
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
        bars: ['Average'],
        xAxis: 'name',
        yAxis: 'Average',
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
        options: [{
          key: 'issues',
          title: 'Issues',
          Component: LineChart,
          props: {
            lines: ['Opened', 'Merged', 'Closed'],
            xAxis: 'name',
            yAxis: '',
          },
        },
        {
          key: 'pull_requests',
          title: 'Pull Requests',
          Component: LineChart,
          props: {
            lines: ['Opened', 'Merged', 'Closed'],
            xAxis: 'name',
            yAxis: '',
          },
        }],
      },
    },
  },
];
