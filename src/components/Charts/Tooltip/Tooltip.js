import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

export default function Tooltip({ title, active, payload }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <div className="heading">
          <span>{title}</span>
        </div>
        <hr />
        <ul className="line">
          { payload.map(({ name, color, value }) => (
            <table>
              <tr>
                <td width="100px">
                  <span style={{ color, fontSize: 22, marginRight: 10 }}>•</span>
                  <span>{name}</span>
                </td>
                <td style={{ marginRight: 10 }}>{value}</td>
              </tr>
            </table>
          )) }
        </ul>
      </div>
    );
  }
  return null;
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
};

Tooltip.defaultProps = {
  active: false,
  payload: [],
};
