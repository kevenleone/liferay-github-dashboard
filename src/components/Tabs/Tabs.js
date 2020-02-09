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
        <Col xl={3} xs={9}>
          <Row>
            { options.map(({ key, title, subTitle }) => (
              <Col key={key} className={option === key ? 'active' : ''}>
                <button
                  type="button"
                  onClick={() => setOption(key)}
                >
                  {title}
                </button>
                <p>{subTitle && typeof subTitle === 'function' ? subTitle(data[key]) : null}</p>
              </Col>
            )) }
          </Row>
        </Col>
        <Switch>
          { options.map(({ key, props, Component }) => (
            <Case key={key} condition={key === option}>
              <Component data={data[key] && data[key].data ? data[key].data : []} {...props} />
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
