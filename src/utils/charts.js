import { BarChart, Text } from '../components/Charts';

/**
 * File with Charts config, for dynamic rendering
 * key: The name of key inside dashboard (on redux state, check the file redux/reducers/github.js)
 * title: The name of Card Item
 * cols: Bootstrap cols options
 * chart: {
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
    chart: {
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
      xs: 6,
    },
    chart: {
      props: {},
      Component: Text,
    },
  },
  {
    key: 'average_issue',
    title: 'Average Issue Close Time',
    cols: {
      xs: 6,
    },
    chart: {
      props: {},
      Component: Text,
    },
  },
];
