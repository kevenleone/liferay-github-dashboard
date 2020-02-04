import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card';

export default function Text({ data, title }) {
  return (
    <Card title={title}>
      <div className="time">
        <p>{data}</p>
      </div>
    </Card>
  );
}


Text.propTypes = {
  data: PropTypes.string,
  title: PropTypes.string,
};

Text.defaultProps = {
  data: '',
  title: '',
};
