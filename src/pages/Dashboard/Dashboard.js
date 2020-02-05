import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { When } from 'react-if';

import Card from '../../components/Card';
import charts from '../../utils/charts';
import './Dashboard.scss';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state.github);

  useEffect(() => {
    dispatch({ type: 'GET_PULL_REQUESTS_SAGA' });
  }, [dispatch]);

  return (
    <div className="Dashboard">
      <Row>
        { charts.map(({
          key, title, cols, render: { Component, props },
        }) => (
          <Col key={key} {...cols}>
            <Card title={title}>
              <When condition={!!Component}>
                <Component data={dashboard[key] ? dashboard[key].data : null} {...props} />
              </When>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
