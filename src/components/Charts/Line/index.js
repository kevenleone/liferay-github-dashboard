import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { constants, normalizeToArray } from '../../../utils';

const { chart: { colors: defaultColors } } = constants;

export default function ChartLine({
  data, colors, lines, xAxis, yAxis, customTooltip,
}) {
  let TooltipComponent;
  if (customTooltip) {
    TooltipComponent = customTooltip.Component;
  }

  return (
    <ResponsiveContainer
      className="LineChart"
      width="100%"
      height={300}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        { normalizeToArray(xAxis).map((x) => <XAxis key={x} dataKey={x} />) }
        { normalizeToArray(yAxis).map((y) => <YAxis key={y} dataKey={y} />) }
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
        <Tooltip
          labelStyle={{ fontSize: 18 }}
          content={TooltipComponent ? <TooltipComponent {...customTooltip.props} /> : null}
        />
        <Legend iconSize={10} iconType="circle" />
      </LineChart>
    </ResponsiveContainer>
  );
}

ChartLine.propTypes = {
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

ChartLine.defaultProps = {
  customTooltip: null,
  colors: [],
  data: [],
  lines: [],
  xAxis: [],
  yAxis: [],
};
