import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
  Switch, Case,
} from 'react-if';
import PropTypes from 'prop-types';

export default function Tabs({ data, options }) {
  const [option, setOption] = useState(options[0].key);
  return (
    <div>
      <Row className="month-summary">
        <Col xs={2}>
          <Row>
            { options.map(({ key, title }, index) => (
              <Col key={key} className={option === key ? 'active' : ''}>
                <button
                  type="button"
                  onClick={() => setOption(key)}
                >
                  {title}
                </button>
                <p>{38 * (index + 1)}</p>
              </Col>
            )) }
          </Row>
        </Col>
        <Switch>
          { options.map(({ key, props, Component }) => (
            <Case key={key} condition={key === option}>
              <Component data={data[key] || []} {...props} />
            </Case>
          )) }
        </Switch>
      </Row>
    </div>
  );
}

Tabs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.objectOf(PropTypes.any),
};

Tabs.defaultProps = {
  options: [],
  data: {},
};
