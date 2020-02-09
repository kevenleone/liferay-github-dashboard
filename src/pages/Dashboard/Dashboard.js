import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { When } from 'react-if';

import Card from '../../components/Card';
import charts from '../../utils/charts';
import './Dashboard.scss';

export default function Dashboard() {
  const { dashboard } = useSelector((state) => state.github);
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
