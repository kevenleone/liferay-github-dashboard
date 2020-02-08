import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { constants, normalizeToArray } from '../../../utils';

const { chart: { colors } } = constants;

export default function BarComponent({
  data, bars, xAxis, yAxis, customTooltip,
}) {
  let TooltipComponent;
  if (customTooltip) {
    TooltipComponent = customTooltip.Component;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ fontSize: 18 }}
          content={TooltipComponent ? <TooltipComponent {...customTooltip.props} /> : null}
        />
        { normalizeToArray(xAxis).map((x) => <XAxis key={x} dataKey={x} />) }
        { normalizeToArray(yAxis).map((y) => <YAxis key={y} dataKey={y} />) }
        { normalizeToArray(bars).map((bar, index) => (
          <Bar key={bar} dataKey={bar} fill={colors[index]} />
        )) }
      </BarChart>
    </ResponsiveContainer>
  );
}

BarComponent.propTypes = {
  customTooltip: PropTypes.shape({
    Component: PropTypes.any,
    props: PropTypes.any,
  }),
  data: PropTypes.arrayOf(PropTypes.object),
  bars: PropTypes.oneOfType([
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

BarComponent.defaultProps = {
  customTooltip: null,
  data: [],
  bars: [],
  xAxis: [],
  yAxis: [],
};
