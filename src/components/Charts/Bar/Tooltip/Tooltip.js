import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

export default function Tooltip({ transformValue, active, payload }) {
  if (active && payload.length) {
    const payloadBar = payload[0].payload;
    const keys = Object.keys(payloadBar)
      .filter((key) => key !== 'name')
      .sort((a, b) => b - a);
    return (
      <div className="BarTooltip">
        <ul className="line">
          { keys.map((key) => (
            <table key={key}>
              <tbody>
                <tr>
                  <td width="150px">
                    <span>{key}</span>
                  </td>
                  <td style={{ marginRight: 10 }}>{transformValue(key, payloadBar[key])}</td>
                </tr>
              </tbody>
            </table>
          )) }
        </ul>
      </div>
    );
  }
  return null;
}

Tooltip.propTypes = {
  transformValue: PropTypes.func,
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
};

Tooltip.defaultProps = {
  transformValue: (_, v) => v,
  active: false,
  payload: [],
};
