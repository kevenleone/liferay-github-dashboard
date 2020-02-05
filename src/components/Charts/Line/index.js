import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { constants, normalizeToArray } from '../../../utils';

const { chart: { colors } } = constants;
export default function ChartLine({
  data, lines, xAxis, yAxis,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        { normalizeToArray(xAxis).map((x) => <XAxis key={x} dataKey={x} />) }
        { normalizeToArray(yAxis).map((y) => <YAxis key={y} dataKey={y} />) }
        { normalizeToArray(lines).map((line, index) => (
          <Line type="natural" strokeWidth={2} dataKey={line} stroke={colors[index]} activeDot={{ r: 8 }} />
        )) }
        <Tooltip />
        <Legend iconSize={10} iconType="circle" />
      </LineChart>
    </ResponsiveContainer>
  );
}

ChartLine.propTypes = {
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

ChartLine.defaultProps = {
  data: [],
  lines: [],
  xAxis: [],
  yAxis: [],
};
