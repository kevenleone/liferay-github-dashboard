import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { constants, normalizeToArray } from '../../../utils';

const { chart: { colors: defaultColors } } = constants;

export default function MainChart({
  Chart,
  legend,
  data,
  bars,
  colors,
  lines,
  xAxis,
  yAxis,
  height,
  customTooltip,
}) {
  let TooltipComponent;
  if (customTooltip) {
    TooltipComponent = customTooltip.Component;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="1 0" />
        <Tooltip
          labelStyle={{ fontSize: 18 }}
          content={TooltipComponent ? <TooltipComponent {...customTooltip.props} /> : null}
        />
        { normalizeToArray(xAxis).map((x) => <XAxis key={x} dataKey={x} />) }
        { normalizeToArray(yAxis).map((y) => <YAxis key={y} dataKey={y} />) }
        { normalizeToArray(bars).map((bar, index) => (
          <Bar key={bar} dataKey={bar} fill={colors[index] || defaultColors[index]} />
        )) }
        { normalizeToArray(lines).map((line, index) => (
          <Line
            key={line}
            type="natural"
            strokeWidth={2}
            dataKey={line}
            stroke={colors[index] || defaultColors[index]}
            activeDot={{ r: 8 }}
          />
        )) }
        { legend && <Legend iconSize={10} iconType="circle" />}

      </Chart>
    </ResponsiveContainer>
  );
}

MainChart.propTypes = {
  height: PropTypes.number,
  legend: PropTypes.bool,
  Chart: PropTypes.oneOfType([
    PropTypes.any,
  ]),
  bars: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  customTooltip: PropTypes.shape({
    Component: PropTypes.any,
    props: PropTypes.any,
  }),
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  lines: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  xAxis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  yAxis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

MainChart.defaultProps = {
  customTooltip: null,
  legend: true,
  height: 300,
  Chart: null,
  colors: [],
  lines: [],
  xAxis: [],
  yAxis: [],
  bars: [],
  data: [],
};
